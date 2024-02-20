"use client";

import d from "dayjs";
import { useMemo } from "react";
import { Group } from "@visx/group";
import { ParentSize } from "@visx/responsive";
import { GridColumns, GridRows } from "@visx/grid";
import { scaleLinear, scaleOrdinal, scalePoint } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { LegendOrdinal } from "@visx/legend";
import { AnimatedAxis } from "@visx/react-spring";
import { animated, useSpring } from "@react-spring/web";

import { COLORS } from "@/lib/theme";
import {
  type Dimensions,
  type Margins,
  type CurrencyChartPoint,
  CHART_DIMENSIONS,
  LINE_CHART_MARGIN,
  TICK_FONT_SIZE,
  calculateRotationAngle,
  getTextWidth,
  getDataSet,
  CurrencyDataSet,
} from "@/lib/charts";
import { useExchangeRatesByDate } from "@/lib/hooks/useExchangeRatesByDate";
import { ExchangeRatesResponse } from "@/lib/types";

const getX = (d: CurrencyChartPoint) => d.x;
const getY = (d: CurrencyChartPoint) => d.value || 0;

type ChartProps = {
  currencyFrom: string;
  currencyTo: string;
  date: string;
  bankId: string;
  dimensions?: Dimensions;
  margin?: Margins;
  legend?: boolean;
  showAxisLabels?: boolean;
};

type TooltipProps = {
  date: string;
  sell: CurrencyChartPoint;
  buy: CurrencyChartPoint;
  middle: CurrencyChartPoint | null;
};

const BASE_LABEL_PROPS = {
  fill: COLORS.slate700,
  fontSize: TICK_FONT_SIZE,
} as const;

const COMMON_AXIS_PROPS = {
  animationTrajectory: "min",
  hideAxisLine: true,
  hideTicks: true,
} as const;

const AnimatedLinePath = animated(LinePath<CurrencyChartPoint>);
const AnimatedGroup = animated(Group);

export const Chart = ({
  currencyTo,
  currencyFrom,
  bankId,
  date,
  dimensions = CHART_DIMENSIONS,
  margin = LINE_CHART_MARGIN,
  legend = true,
  showAxisLabels = true,
}: ChartProps) => {
  const result = useExchangeRatesByDate({ bankId, date, daysBack: 31 });

  const { width, height } = dimensions;
  const yAxisLabel = "Value CZK";
  const xAxisLabel = "Date";

  const data = getDataSet(
    result.map((value) => value.data as ExchangeRatesResponse),
    currencyTo
  );

  // Default yMax to a biggest value in the dataPoints incase it is not defined
  const yMax = useMemo(
    () =>
      data
        ? Math.max(
            ...[
              ...data.sell.data.map(({ value }) => value),
              ...data.buy.data.map(({ value }) => value),
              ...(data && data.middle
                ? data.middle.data
                    .filter(({ value }) => value)
                    .map(({ value }) => value || 0)
                : []),
            ]
          )
        : 0,
    [data]
  );

  // Default the scale to 0 in case yAxisMin is undefined
  const yMin = data
    ? Math.min(
        ...[
          ...data.sell.data.map(({ value }) => value),
          ...data.buy.data.map(({ value }) => value),
          ...(data && data.middle
            ? data.middle.data
                .filter(({ value }) => value)
                .map(({ value }) => value || 0)
            : []),
        ]
      )
    : 0;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xAxisTickLabels = useMemo(
    () =>
      data
        ? data.sell.data
            .map(({ x }) => x)
            .sort((b, a) => parseInt(b, 10) - parseInt(a, 10))
        : [],
    [data]
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [innerHeight, 0],
        domain: [yMin, yMax],
      }),
    [innerHeight, yMin, yMax]
  );

  const xScale = useMemo(
    () =>
      scalePoint({
        range: [0, innerWidth],
        domain: xAxisTickLabels,
      }),
    [innerWidth]
  );

  const xTickLabelAngle = useMemo(() => {
    const tempSizes =
      xAxisTickLabels.map((label) => getTextWidth(label, TICK_FONT_SIZE)) ?? [];
    const maxXTickLabelWidth = Math.max(...tempSizes);

    return calculateRotationAngle(
      xAxisTickLabels.length ?? 0,
      innerWidth,
      maxXTickLabelWidth
    );
  }, [xAxisTickLabels, innerWidth]);

  const { strokeDashoffset } = useSpring({
    from: { strokeDashoffset: 0 },
    to: { strokeDashoffset: 10000 },
    config: { duration: 3000 },
    reverse: true,
  });

  const colors = ["#0284c7", "#4338ca", "#a21caf"] as const;
  const lineLabels = ["Buy", "Sell", "Middle"] as const;

  const colorScale = scaleOrdinal({
    domain: [...lineLabels],
    range: [...colors],
  });

  if (!width || !height) return null;
  if (!data) return null;
  if (typeof window === undefined) return null;

  return (
    <div>
      <svg {...dimensions}>
        <rect {...dimensions} fill="none" />
        <Group left={margin.left} top={margin.top}>
          <GridColumns
            scale={xScale}
            width={innerWidth}
            height={innerHeight}
            left={0}
            stroke={COLORS.neutral600}
            strokeOpacity={0.3}
          />
          <GridRows
            scale={yScale}
            width={innerWidth}
            height={innerHeight}
            strokeDasharray="5"
            stroke={COLORS.neutral600}
            strokeOpacity={0.3}
          />
          <AnimatedAxis
            top={innerHeight}
            orientation="bottom"
            {...COMMON_AXIS_PROPS}
            scale={xScale}
            tickLabelProps={{
              ...BASE_LABEL_PROPS,
              textAnchor: xTickLabelAngle === 0 ? "middle" : "end",
              transform: `rotate(-${xTickLabelAngle})`,
            }}
            label={showAxisLabels ? xAxisLabel : undefined}
            labelProps={{
              ...BASE_LABEL_PROPS,
              textAnchor: "middle",
              baselineShift: 0,
            }}
            hideAxisLine={false}
            stroke={COLORS.slate500}
            tickFormat={(v) => d(v).format("DD/MM/YYYY")}
          />
          <AnimatedAxis
            orientation="left"
            {...COMMON_AXIS_PROPS}
            tickLabelProps={{
              ...BASE_LABEL_PROPS,
              textAnchor: "end",
              baselineShift: 3,
            }}
            label={yAxisLabel}
            labelProps={{
              ...BASE_LABEL_PROPS,
              textAnchor: "middle",
              baselineShift: 18,
            }}
            scale={yScale}
          />
          {data &&
            Object.values(data).map((value, index) =>
              typeof value === "object" ? (
                <AnimatedGroup
                  key={"group" + index}
                  style={{ strokeDashoffset }}
                >
                  <AnimatedLinePath
                    key={"linepath-" + index}
                    stroke={colors[index - 1]}
                    opacity={1}
                    strokeWidth={3}
                    data={value.data}
                    style={{ strokeDasharray: 10000 }}
                    x={(d) => xScale(getX(d)!) ?? 0}
                    y={(d) => yScale(getY(d)) ?? 0}
                  />
                </AnimatedGroup>
              ) : null
            )}
        </Group>
      </svg>
      {legend && (
        <div
          style={{
            position: "absolute",
            top: margin.top,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontSize: "14px",
          }}
        >
          <LegendOrdinal
            scale={colorScale}
            direction="row"
            labelMargin="0 20px 0 0"
          />
        </div>
      )}
    </div>
  );
};

// Wrapper for the chart with responsive container
export const ResponsiveChart = ({ ...props }: ChartProps) => (
  <ParentSize>
    {(dimensions) => <Chart {...props} dimensions={dimensions} />}
  </ParentSize>
);

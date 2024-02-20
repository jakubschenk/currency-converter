"use client";

import { ParentSize } from "@visx/responsive";
import { Chart, ChartProps } from "./Chart";

// Wrapper for the chart with responsive container
export const ResponsiveChart = ({ ...props }: ChartProps) => (
  <ParentSize>
    {({ height, width }) => <Chart {...props} dimensions={{ width, height }} />}
  </ParentSize>
);

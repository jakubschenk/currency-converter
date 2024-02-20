import { CZK_RATE } from "./currency";
import { ExchangeRatesResponse } from "./types";

export type Margins = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type Dimensions = {
  width: number;
  height: number;
};

export const CHART_DIMENSIONS: Dimensions = { width: 1200, height: 600 };

export const LINE_CHART_MARGIN: Margins = {
  top: 40,
  right: 40,
  bottom: 50,
  left: 60,
};

export const TICK_FONT_SIZE = 12;

/**
 * Calculates and returns the rotation angle for x-axis ticks based on the available space.
 * Used eg. in bar charts
 *
 * @param tickCount The number of ticks.
 * @param totalWidth The total available width.
 * @param maxTickWidth The maximum width of a tick.
 * @return The rotation angle for the ticks.
 */
export function calculateRotationAngle(
  tickCount: number,
  totalWidth: number,
  maxTickWidth: number
) {
  const spacePerTick = totalWidth / tickCount;

  // If the space per tick is greater than or equal to the max tick width, place the ticks horizontally
  if (spacePerTick >= maxTickWidth) {
    return 0;
  }

  // Calculate the ratio of the space per tick to the max tick width
  const ratio = spacePerTick / maxTickWidth;

  // Calculate the angle based on the ratio
  // The angle is 0 when the ratio is 1 (i.e., the space per tick is equal to the max tick width)
  // The angle is 90 when the ratio is 0 (i.e., there is no space for the ticks)
  return (1 - ratio) * 90;
}

/**
 * Calculates and returns the dimensions of a text string.
 *
 * @param {string} text - The text string to measure.
 * @returns {Object} An object containing the width and height of the text.
 */
export function getTextDimensions(
  text: string,
  fontSize: number,
  fontFamily = "sans-serif"
) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    return { width: 0, height: 0, actualHeight: 0 };
  }

  context.font = `${fontSize}px ${fontFamily}`;
  const metrics = context.measureText(text);
  return {
    width: metrics.width,
    height:
      (metrics.fontBoundingBoxAscent ?? 0) +
      (metrics.fontBoundingBoxDescent ?? 0),
    actualHeight:
      (metrics.actualBoundingBoxAscent ?? 0) +
      (metrics.actualBoundingBoxDescent ?? 0),
  };
}

/**
 * Calculates and returns the width of a text string.
 *
 * @param text The text string to measure.
 * @return The width of the text.
 */
export const getTextWidth = (text: string, fontSize: number) =>
  getTextDimensions(text, fontSize).width;

export type CurrencyChartPoint = {
  value: number;
  stringValue: string;
  x: string;
};

export type CurrencyDataSetDetail = {
  data: CurrencyChartPoint[];
};

export type CurrencyDataSet = {
  currency: string;
  sell: CurrencyDataSetDetail;
  buy: CurrencyDataSetDetail;
  middle: CurrencyDataSetDetail | undefined;
};

export const getDataSet = (
  rates: ExchangeRatesResponse[],
  currencyTo: string
) => {
  if (rates.some((val) => val === undefined)) return null;

  const newRates: ExchangeRatesResponse[] = rates.map((data) => ({
    ...data,
    kurzy: {
      ...data.kurzy,
      CZK: CZK_RATE,
    },
  }));

  const dataSet: CurrencyDataSet = {
    currency: currencyTo,
    sell: {
      data: newRates.map((rate) => ({
        value: rate.kurzy[currencyTo].dev_prodej,
        stringValue: rate.kurzy[currencyTo].dev_prodej.toString() + currencyTo,
        x: rate.den,
      })),
    },
    buy: {
      data: newRates.map((rate) => ({
        value: rate.kurzy[currencyTo].dev_nakup,
        stringValue: rate.kurzy[currencyTo].dev_nakup.toString() + currencyTo,
        x: rate.den,
      })),
    },
    middle: newRates.every((rate) => rate.kurzy[currencyTo].dev_stred)
      ? {
          data: newRates.map((rate) => ({
            value: rate.kurzy[currencyTo].dev_stred ?? 0,
            stringValue:
              (rate.kurzy[currencyTo].dev_stred ?? 0).toString() + currencyTo,
            x: rate.den,
          })),
        }
      : undefined,
  };

  return dataSet;
};

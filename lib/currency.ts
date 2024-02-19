import { ExchangeRate } from "@/lib/types";

// Conversion from base rate to new rate (Base rate can be interpreted as 1)
export const convertFromBase = (value: number, rate: number) => value / rate;

// Conversion from one rate to another, essentially creating a ratio between them
// These all could be named way better, not gonna lie
export const calculateFromBaseToTarget = (
  value: number,
  from: number | null,
  to: number | null
) => (!from || !to ? null : convertFromBase(from, to) * value);

/**
 * @param value `number`
 * @param from `ExchangeRate | "CZK"`
 * @param to `ExchangeRate | "CZK"`
 * @return Object with keys: `sell`, `buy`, `middle`, each of type `number | null`
 * @summary ExchangeRate object should contain `dev_nakup`, `dev_prodej` and `dev_stred`
 * Converts a value between two exchange rates
 */
export const convertValueWithExchangeRates = (
  value: number,
  from: ExchangeRate | "CZK",
  to: ExchangeRate | "CZK"
) => {
  const fromParsed =
    from === "CZK" ? { dev_nakup: 1, dev_prodej: 1, dev_stred: 1 } : from;
  const toParsed =
    to === "CZK" ? { dev_nakup: 1, dev_prodej: 1, dev_stred: 1 } : to;

  return {
    buy: calculateFromBaseToTarget(
      value,
      fromParsed.dev_nakup,
      toParsed.dev_nakup
    ),
    sell: calculateFromBaseToTarget(
      value,
      fromParsed.dev_prodej,
      toParsed.dev_prodej
    ),
    middle: calculateFromBaseToTarget(
      value,
      fromParsed.dev_stred,
      toParsed.dev_stred
    ),
  };
};

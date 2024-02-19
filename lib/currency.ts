import { ExchangeRate } from "@/lib/types";

// Conversion from base rate to new rate (Base rate can be interpreted as 1)
export const convertFromBase = (value: number, rate: number) => value / rate;

// Conversion from one rate to another, essentially creating a ratio between them
// These all could be named way better, not gonna lie
export const calculateFromBaseToTarget = (
  value: number,
  from: number | null,
  to: number | null,
  unit?: number
) => (!from || !to ? null : (convertFromBase(from, to) * value) / (unit || 1));

/**
 * @param value `number`
 * @param from `ExchangeRate`
 * @param to `ExchangeRate`
 * @return Object with keys: `sell`, `buy`, `middle`, each of type `number | null`
 * @summary ExchangeRate object should contain `dev_nakup`, `dev_prodej` and `dev_stred`
 * Converts a value between two exchange rates
 */
export const convertValueWithExchangeRates = (
  value: number,
  from: ExchangeRate,
  to: ExchangeRate
) => ({
  buy: calculateFromBaseToTarget(
    value,
    from.dev_nakup,
    to.dev_nakup,
    from.jednotka
  ),
  sell: calculateFromBaseToTarget(
    value,
    from.dev_prodej,
    to.dev_prodej,
    from.jednotka
  ),
  middle: calculateFromBaseToTarget(
    value,
    from.dev_stred,
    to.dev_stred,
    from.jednotka
  ),
});

export const CZK_RATE: ExchangeRate = {
  dev_nakup: 1,
  dev_prodej: 1,
  dev_stred: 1,
  val_nakup: 1,
  val_prodej: 1,
  val_stred: 1,
  jednotka: 1,
  nazev: "Česká koruna",
  url: "",
} as const;

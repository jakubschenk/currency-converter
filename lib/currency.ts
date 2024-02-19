import { ExchangeRate } from "@/lib/types";

export const convertFromBase = (value: number, rate: number) => value / rate;

export const calculateFromBaseToTarget = (
  value: number,
  from: number,
  to: number
) => convertFromBase(from, to) * value;

export const convertValueWithExchangeRates = (
  value: number,
  from: ExchangeRate | "CZK",
  to: ExchangeRate | "CZK"
) => ({
  buy: calculateFromBaseToTarget(
    value,
    from === "CZK" ? 1 : from.dev_nakup,
    to === "CZK" ? 1 : to.dev_nakup
  ),
  sell: calculateFromBaseToTarget(
    value,
    from === "CZK" ? 1 : from.dev_prodej,
    to === "CZK" ? 1 : to.dev_prodej
  ),
  middle: calculateFromBaseToTarget(
    value,
    from === "CZK" ? 1 : from.dev_stred,
    to === "CZK" ? 1 : to.dev_stred
  ),
});

import {
  calculateFromBaseToTarget,
  convertValueWithExchangeRates,
} from "@/lib/currency";
import { ExchangeRate, ExchangeRates } from "@/lib/types";
import { Separator } from "@/components/ui/separator";

type StatsPanelProps = {
  rates: ExchangeRates;
  convertedRates: ReturnType<typeof convertValueWithExchangeRates>;
  currencyFrom: string;
  currencyTo: string;
};

type RateLineProps = {
  calculatedRate: string;
  currencyFrom: string;
  currencyTo: string;
  label: string;
  selector: keyof Omit<ExchangeRate, "jednotka" | "nazev" | "url">;
  rates: ExchangeRates;
};

const RateLine = ({
  calculatedRate,
  currencyFrom,
  currencyTo,
  rates,
  label,
  selector,
}: RateLineProps) => {
  const calculated = calculateFromBaseToTarget(
    rates[currencyFrom].jednotka,
    rates[currencyFrom][selector],
    rates[currencyTo][selector]
  );

  return (
    <>
      <div className="self-center">{label} rate: </div>
      <span className="text-xl text-blue-400 font-semibold">
        {calculatedRate}
        <span className="text-base">{currencyTo}</span>{" "}
        {calculated && (
          <span className="text-sm text-blue-400 font-semibold">
            ({rates[currencyFrom].jednotka}
            {currencyFrom} = {calculated.toFixed(2)}
            {currencyTo})
          </span>
        )}
      </span>
    </>
  );
};

const StatsPanel = ({
  rates,
  convertedRates,
  currencyFrom,
  currencyTo,
}: StatsPanelProps) => {
  return (
    <div className="border border-zinc-400 gap-y-4 px-3 py-4 max-w-5xl w-full grid grid-cols-2 mt-6 rounded-md">
      <div className="col-span-2">
        Showing conversion from {currencyFrom} to {currencyTo}
      </div>
      <Separator className="col-span-2 w-full dark:bg-zinc-400" />
      {convertedRates && convertedRates.buy && (
        <RateLine
          label="Buy"
          calculatedRate={convertedRates.buy.toFixed(2)}
          currencyTo={currencyTo}
          currencyFrom={currencyFrom}
          rates={rates}
          selector="dev_nakup"
        />
      )}
      {convertedRates && convertedRates.sell && (
        <RateLine
          label="Sell"
          calculatedRate={convertedRates.sell.toFixed(2)}
          currencyTo={currencyTo}
          currencyFrom={currencyFrom}
          rates={rates}
          selector="dev_prodej"
        />
      )}
      {convertedRates && convertedRates.middle && (
        <RateLine
          label="Middle"
          calculatedRate={convertedRates.middle.toFixed(2)}
          currencyTo={currencyTo}
          currencyFrom={currencyFrom}
          rates={rates}
          selector="dev_stred"
        />
      )}
    </div>
  );
};

export default StatsPanel;

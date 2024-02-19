"use client";

import { parseAsString, useQueryState } from "nuqs";
import d from "dayjs";
import { AnimatePresence, motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import StatsPanel from "@/components/panels/StatsPanel";

import { useExchangeRates } from "@/lib/hooks/useExchangeRates";
import { filterStringToFloatNumberString } from "@/lib/utils";
import { convertValueWithExchangeRates } from "@/lib/currency";
import { useEffect } from "react";
import { CZK_RATE } from "@/lib/currency";
import { ExchangeRatesResponse } from "@/lib/types";

type ConversionPanelProps = {
  bankId: string;
};

const ConversionPanel = ({ bankId }: ConversionPanelProps) => {
  const [date, setDate] = useQueryState(
    "date",
    parseAsString.withDefault(d().format("YYYYMMDD"))
  );
  const [currencyFrom, setCurrencyFrom] = useQueryState<string>(
    "currencyFrom",
    parseAsString.withDefault("CZK")
  );
  const [currencyTo, setCurrencyTo] = useQueryState(
    "currencyTo",
    parseAsString.withDefault("CZK")
  );
  const [input, setInput] = useQueryState(
    "input",
    parseAsString.withDefault("")
  );

  const { data, isError, isLoading } = useExchangeRates({
    bankId,
    date,
  });

  if (isError) return <div>An error has occurred while fetching data.</div>;

  const newData: ExchangeRatesResponse | undefined = data
    ? {
        ...data,
        kurzy: {
          ...data.kurzy,
          CZK: CZK_RATE,
        },
      }
    : undefined;

  useEffect(() => {
    if (!newData) return;

    // Reset to CZK if the current bank does not return the current exchange rate for the current form of currency
    if (!newData.kurzy[currencyTo]) setCurrencyTo("CZK");
    if (!newData.kurzy[currencyFrom]) setCurrencyFrom("CZK");
  }, [newData, currencyTo, currencyFrom]);

  // Since the API does not return CZK object (we could append an object with buy, middle and sell set to 1, to make this a bit cleaner)
  // we just use a fallback built into the function
  const convertedRates = newData
    ? convertValueWithExchangeRates(
        parseFloat(input),
        newData!.kurzy[currencyFrom],
        newData!.kurzy[currencyTo]
      )
    : undefined;

  // Get the middle value or fallback to buy value, else do not show anything
  const outputValue = convertedRates
    ? convertedRates.middle
      ? convertedRates.middle.toFixed(2)
      : convertedRates.buy
      ? convertedRates.buy.toFixed(2)
      : ""
    : "";

  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="100.00"
          value={input}
          disabled={isLoading}
          onChange={(e) => {
            setInput(filterStringToFloatNumberString(e.currentTarget.value), {
              shallow: false,
            });
          }}
        />
        <Select
          value={currencyFrom}
          disabled={isLoading}
          onValueChange={(value) =>
            data && setCurrencyFrom(value, { shallow: false })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Currencies</SelectLabel>
              {newData &&
                Object.keys(newData.kurzy).map((rate) => (
                  <SelectItem value={rate} key={"convert-from" + rate}>
                    {newData.kurzy[rate].nazev}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          placeholder="Converted currency"
          readOnly
          defaultValue={outputValue}
        />
        <Select
          value={currencyTo}
          disabled={isLoading}
          onValueChange={(value) =>
            data && setCurrencyTo(value, { shallow: false })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a currency" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Currencies</SelectLabel>
              {newData &&
                Object.keys(newData.kurzy).map((rate) => (
                  <SelectItem value={rate} key={"covert-to" + rate}>
                    {newData.kurzy[rate].nazev}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <AnimatePresence>
        {convertedRates && newData && (
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <StatsPanel
              currencyFrom={currencyFrom}
              currencyTo={currencyTo}
              rates={newData.kurzy}
              convertedRates={convertedRates}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConversionPanel;
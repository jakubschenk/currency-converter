"use client";

import { UseQueryStateOptions, parseAsString, useQueryState } from "nuqs";
import d from "dayjs";

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
import { useExchangeRates } from "@/lib/hooks/useExchangeRates";
import { filterStringToFloatNumberString } from "@/lib/utils";
import { convertValueWithExchangeRates } from "@/lib/currency";

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

  const convertedRates = data
    ? convertValueWithExchangeRates(
        parseFloat(input),
        currencyFrom === "CZK" ? "CZK" : data!.kurzy[currencyFrom],
        currencyTo === "CZK" ? "CZK" : data!.kurzy[currencyTo]
      )
    : undefined;

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
              <SelectItem value="CZK">Česká koruna</SelectItem>
              {data &&
                Object.keys(data.kurzy).map((rate) => (
                  <SelectItem value={rate} key={"convert-from" + rate}>
                    {data.kurzy[rate].nazev}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          placeholder="Converted currency"
          disabled={isLoading}
          defaultValue={
            convertedRates && convertedRates.middle
              ? convertedRates.middle.toFixed(2)
              : ""
          }
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
              <SelectItem value="CZK">Česká koruna</SelectItem>
              {data &&
                Object.keys(data.kurzy).map((rate) => (
                  <SelectItem value={rate} key={"covert-to" + rate}>
                    {data.kurzy[rate].nazev}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {convertedRates && convertedRates.sell}
      {convertedRates && convertedRates.buy}
    </div>
  );
};

export default ConversionPanel;

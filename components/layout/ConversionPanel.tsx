"use client";

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
import { getExchangeRate } from "@/lib/getExchangeRate";
import { ExchangeRatesResponse } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { create } from "domain";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type ConversionPanelProps = {
  currentBankId: string;
  currentDate: string;
  currentFrom: string;
  currentTo: string;
};

const ConversionPanel = ({
  currentBankId,
  currentDate,
  currentFrom,
  currentTo,
}: ConversionPanelProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, isLoading, isError } = useQuery<ExchangeRatesResponse>({
    queryKey: ["exchangeRate", currentBankId, currentDate],
    queryFn: () =>
      getExchangeRate({ bankId: currentBankId, date: currentDate }),
  });

  if (!data) return null;
  if (isError) return <div>An error has occurred while fetching data.</div>;
  if (isLoading) return <div>Loading...</div>;

  const { kurzy } = data;

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      <Input></Input>
      <Select
        defaultValue="CZK"
        value={currentFrom}
        onValueChange={(value) =>
          router.push(
            pathname + "?" + createQueryString("currencyFrom", value),
            { scroll: false }
          )
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Currencies</SelectLabel>
            <SelectItem value="CZK">Česká koruna</SelectItem>
            {Object.keys(kurzy).map((rate) => (
              <SelectItem value={rate} key={"convert-from-" + rate}>
                {kurzy[rate].nazev}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input></Input>
      <Select
        value={
          currentTo && Object.keys(kurzy).includes(currentTo)
            ? currentTo
            : "CZK"
        }
        onValueChange={(value) =>
          router.push(pathname + "?" + createQueryString("currencyTo", value), {
            scroll: false,
          })
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a currency" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Currencies</SelectLabel>
            <SelectItem value="CZK">Česká koruna</SelectItem>
            {Object.keys(kurzy).map((rate) => (
              <SelectItem
                value={rate}
                key={"covert-to-" + rate}
                onClick={() => console.log(rate)}
              >
                {kurzy[rate].nazev}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ConversionPanel;

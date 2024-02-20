import { useQuery } from "@tanstack/react-query";
import { ExchangeRatesResponse } from "@/lib/types";
import { getExchangeRate } from "../requests/getExchangeRate";

type UseExchangeRatesParams = {
  bankId: string;
  date?: string | null;
};

export const useExchangeRates = ({ bankId, date }: UseExchangeRatesParams) => {
  return useQuery<ExchangeRatesResponse>({
    queryKey: ["exchangeRate", bankId, date],
    queryFn: () => getExchangeRate({ bankId, date }),
  });
};

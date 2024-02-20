import { useQueries } from "@tanstack/react-query";
import d from "dayjs";
import { ExchangeRatesResponse } from "@/lib/types";
import { getExchangeRate } from "@/lib/requests/getExchangeRate";

type UseExchangeRatesParams = {
  bankId: string;
  date?: string | null;
  daysBack?: number;
};

export const useExchangeRatesByDate = ({
  bankId,
  date,
  daysBack = 7,
}: UseExchangeRatesParams) => {
  return useQueries<ExchangeRatesResponse[]>({
    queries: Array.from({ length: daysBack }).map((_, index) => ({
      queryKey: [
        "exchangeRate",
        bankId,
        d(date).subtract(index, "day").format("YYYYMMDD"),
      ],
      queryFn: () =>
        getExchangeRate({
          bankId,
          date: d(date).subtract(index, "day").format("YYYYMMDD"),
        }),
    })),
  });
};

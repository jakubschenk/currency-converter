import ConversionPanel from "@/components/layout/ConversionPanel";
import BankItem from "@/components/ui/bank-item";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { BANKS } from "@/lib/constants";
import { getExchangeRate } from "@/lib/requests/getExchangeRate";
import { ExchangeRatesResponse } from "@/lib/types";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import d from "dayjs";

type Query = {
  bankId: string;
  date: string;
  currencyFrom: string;
  currencyTo: string;
};

type PageProps = {
  searchParams: Query;
};

export default async function Home({ searchParams }: PageProps) {
  const { bankId = BANKS[0].id.toString(), date = d().format("YYYYMMDD") } =
    searchParams;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery<ExchangeRatesResponse>({
    queryKey: ["exchangeRate", bankId, date],
    queryFn: () => getExchangeRate({ bankId, date }),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-start gap-y-6 py-24 px-16 bg-white dark:bg-zinc-900">
      <h1 className="text-left max-w-6xl w-full text-xl lg:text-3xl font-semibold px-3 uppercase leading-tight">
        Currency Converter
      </h1>
      <span className="-mb-2">choose a bank to get conversion rates from:</span>
      <div className="z-10 max-w-6xl w-full flex-col gap-y-12 h-full items-center justify-center font-mono text-sm flex">
        <ToggleGroup
          type="single"
          value={bankId ? bankId.toString() : undefined}
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 w-full flex-wrap gap-6 justify-start"
        >
          {BANKS.map((bank) => (
            <ToggleGroupItem
              value={bank.id.toString()}
              id={bank.id.toString()}
              key={bank.id.toString()}
              asChild
              className="justify-start"
            >
              <BankItem bank={bank} params={searchParams} />
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ConversionPanel bankId={bankId} />
        </HydrationBoundary>
      </div>
    </main>
  );
}

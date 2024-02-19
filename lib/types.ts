// API Response for kurzy.cz

export type ExchangeRate = {
  jednotka: number;
  dev_stred: number | null;
  dev_nakup: number;
  dev_prodej: number;
  val_stred: number | null;
  val_nakup: number | null;
  val_prodej: number | null;
  nazev: string;
  url: string;
};

export type ExchangeRates = {
  [key: string]: ExchangeRate;
};

export type ExchangeRatesResponse = {
  den: string;
  denc: string;
  banka: string;
  url: string;
  kurzy: ExchangeRates;
};

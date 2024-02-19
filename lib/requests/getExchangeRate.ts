import { BASE_URL } from "../constants";

type QueryParams = {
  bankId: string;
  date?: string | null;
};

export const getExchangeRate = async ({ bankId, date }: QueryParams) => {
  const response = await fetch(
    `${BASE_URL}/json/meny/b[${bankId}]${date ? `den[${date}]` : ""}`
  );

  if (!response.ok) {
    throw Error("Could not fetch exchange rates.");
  }

  return response.json();
};

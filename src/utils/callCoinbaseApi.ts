import { Currency } from "../types/currency";

export const callCoinbaseApi = async (url: string, action: any) => {
    const response = await fetch(url + "/products");
    const data = await response.json();
    const pairs = data as Currency[];

    let filtered = pairs.filter((pair) => pair.quote_currency === "USD");
    filtered = filtered.sort((a, b) =>
      a.base_currency.localeCompare(b.base_currency)
    );

    action(filtered);
  };
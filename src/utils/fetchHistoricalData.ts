import { formatData } from "./formatData";

export const fetchHistoricalData = async (url: string) => {
  const response = await fetch(url);
  const dataArr = await response.json();
  return formatData(dataArr);
};
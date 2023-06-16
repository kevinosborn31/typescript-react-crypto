import { useState, useEffect, useRef } from "react";
import { formatData } from "../utils/formatData";
import { Box } from "@mui/material";
import DashboardChart from "./DashboardChart";
import CurrencySelector from "./CurrencySelector";
import { Currency } from "../types/currency";
import { TickerData } from "../types/tickerData";
import { callCoinbaseApi } from "../utils/callCoinbaseApi";
import { fetchHistoricalData } from "../utils/fetchHistoricalData";




const Dashboard: React.FC = () => {
  const [currencies, setCurrencies] = useState<any[]>([]);
  const [pair, setPair] = useState<string>("");
  const [price, setPrice] = useState<string>("0.00");
  const [pastData, setPastData] = useState<any>({});
  const ws = useRef<WebSocket | null>(null);
  const first = useRef<boolean>(false);
  const webSocketURL = "ws-feed.pro.coinbase.com";
  const url = "https://api.pro.coinbase.com";

  useEffect(() => {
    ws.current = new WebSocket(`wss://${webSocketURL}`);

    callCoinbaseApi(url, setCurrencies);
    first.current = true;
  }, []);

  useEffect(() => {
    if (!first.current) {
      return;
    }

    const msg = {
      type: "subscribe",
      product_ids: [pair],
      channels: ["ticker"],
    };

    const jsonMsg = JSON.stringify(msg);

    if (ws.current) {
      ws.current.send(jsonMsg);
    }

    const historicalData = fetchHistoricalData(`${url}/products/${pair}/candles?granularity=86400`);

    setPastData(historicalData);

    if (ws.current) {
      ws.current.onmessage = (e) => {
        const data = JSON.parse(e.data) as TickerData;
        if (data.type !== "ticker") {
          return;
        }

        if (data.product_id === pair) {
          setPrice(data.price);
        }
      };
    }
  }, [pair]);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const unsubMsg = {
      type: "unsubscribe",
      product_ids: [pair],
      channels: ["ticker"],
    };
    const unsub = JSON.stringify(unsubMsg);

    if (ws.current) {
      ws.current.send(unsub);
    }

    setPair(e.target.value);
  };


  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "80vh" }}>
        <CurrencySelector pair={pair} onChange={() => onChange} currencies={currencies}/>
        <DashboardChart price={price} chartData={pastData} />
    </Box>
  );
};

export default Dashboard;

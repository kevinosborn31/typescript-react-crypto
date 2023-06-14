import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Box, Typography } from "@mui/material";
import { chartOptions } from "../constants/chartOptions";
import DashboardChart from "./DashboardChart";
import CurrencySelector from "./CurrencySelector";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const Dashboard: React.FC = () => {

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "80vh" }}>
        <CurrencySelector pair={pair} onChange={onChange} currencies={currencies}/>
        <DashboardChart price={price} data={pastData} />
    </Box>
  );
};

export default Dashboard;

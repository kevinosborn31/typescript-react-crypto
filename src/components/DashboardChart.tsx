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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IDashboardChartProps {
    price: string;
    chartData: ChartData;
}

const DashboardChart: React.FC<IDashboardChartProps> = ({ price, chartData }) => {
    
  if (price === "0.00") {
    return <Typography variant="h2">please select a currency pair</Typography>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", height: "80vh" }}>
      <Typography variant="h2">{`$${price}`}</Typography>

      <Box sx={{ width: "80%", height: "100%" }}>
        {/* TODO: fix */}
        <Line data={chartData as any} options={chartOptions} />
      </Box>
    </Box>
  );
};

export default DashboardChart;

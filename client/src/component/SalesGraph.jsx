import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SalesGraph = ({ salesData }) => {
  const chartData = {
    labels: salesData.map((data) => data.product),
    datasets: [
      {
        label: "Number of Product",
        data: salesData.map((data) => data.sales),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Product by Quantity",
      },
    },
  };

  return (
    <div className="sales-graph">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default SalesGraph;

import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function BarChart({ chartData }) {
  return (
    <div
      style={{
        width: "80rem",
        height: "50rem",
        marginTop: "3.2rem",
      }}
    >
      <Bar data={chartData} />
    </div>
  );
}

export default BarChart;

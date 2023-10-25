import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
function DohnutChart({ chartData, options }) {
  return (
    <div
      style={{
        height: "40rem",
        display: "flex",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default DohnutChart;

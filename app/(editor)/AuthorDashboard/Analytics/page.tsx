"use client";

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PaymentTable from "../_components/PaymentTable";
import Footer from "@/app/components/Footer";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

function SubscriptionChart() {
  // Define the months for the sidebar and x-axis labels
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartData = {
    labels: months, // Use months as x-axis labels
    datasets: [
      {
        label: "Monthly Plan",
        data: [316, 242, 837, 400, 500, 600, 450, 700, 550, 620, 480, 690], // Example data for Monthly plan for each month
        backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue color for Monthly Plan
      },
      {
        label: "Yearly Plan",
        data: [
          3160, 2420, 8370, 4000, 5000, 6000, 4500, 7000, 5500, 6200, 4800,
          6900,
        ], // Example data for Yearly plan for each month
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red color for Yearly Plan
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Subscription Revenue - Monthly and Yearly Plans",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Amount ($)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
  };

  return (
    <div className="flex">
      {/* Sidebar with months */}
      <div className="p-4 mr-4 bg-gray-200 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Months</h3>
        <ul className="space-y-2">
          {months.map((month, index) => (
            <li key={index} className="text-gray-700 font-medium">
              {month}
            </li>
          ))}
        </ul>
      </div>
      {/* Chart */}
      <div className="w-full">
        <Bar data={chartData} options={chartOptions} />

        <PaymentTable />
      </div>
      <Footer />
    </div>
  );
}

export default SubscriptionChart;

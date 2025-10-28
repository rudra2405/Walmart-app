import React from "react";
import { Chart } from "react-google-charts";
import { FaChartBar, FaChartArea } from "react-icons/fa";

// Pie Chart Data
const Piedata = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

const Pieoptions = { title: "My Daily Activities" };

// Area Chart Data
const Areadata = [
  ["Year", "Sales", "Expenses"],
  ["2014", 1000, 400],
  ["2015", 1170, 460],
  ["2016", 660, 1120],
  ["2017", 1030, 540],
];

const Areaoptions = {
  title: "Company Performance",
  hAxis: { title: "Year", titleTextStyle: { color: "#333" } },
  vAxis: { minValue: 0 },
  chartArea: { width: "70%", height: "70%" },
};

// Bar Chart Data
const Bardata = [
  ["Year", "Sales", "Expenses"],
  ["2014", 1000, 400],
  ["2015", 1170, 460],
  ["2016", 660, 1120],
  ["2017", 1030, 540],
];

const Baroptions = {
  chart: {
    title: "Company Performance",
    subtitle: "Sales and Expenses over the Years",
  },
};

export default function Dashboard() {
  return (
    <div className="p-6 mt-2">
      {/* Dashboard Title */}
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 text-center font-bold sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-600 text-white rounded-xl shadow-md p-6">
          <h4 className="text-lg">Total Cust</h4>
          <h3 className="text-center text-2xl font-bold mt-2">
            <span className="bg-red-600 px-3 py-1 rounded-full">10</span>
          </h3>
        </div>

        <div className="bg-green-600 text-white rounded-xl shadow-md p-6">
          <h4 className="text-lg">Total Orders</h4>
          <h3 className="text-center text-2xl font-bold mt-2">
            <span className="bg-yellow-400 text-black px-3 py-1 rounded-full">
              25
            </span>
          </h3>
        </div>

        <div className="bg-cyan-600 text-white rounded-xl shadow-md p-6">
          <h4 className="text-lg">Pending Task</h4>
          <h3 className="text-center text-2xl font-bold mt-2">
            <span className="bg-gray-600 px-3 py-1 rounded-full">7</span>
          </h3>
        </div>

        <div className="bg-gray-800 text-white rounded-xl shadow-md p-6">
          <h4 className="text-lg">Messages</h4>
          <h3 className="text-center text-2xl font-bold mt-2">
            <span className="bg-gray-200 text-black px-3 py-1 rounded-full">
              12
            </span>
          </h3>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="mt-10">
        <Chart
          chartType="PieChart"
          data={Piedata}
          options={Pieoptions}
          width="100%"
          height="400px"
        />
      </div>

      {/* Area + Bar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Area Chart */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="bg-gray-200 px-4 py-2 rounded-t-xl">
            <h4 className="flex items-center text-lg font-semibold text-gray-800">
              <FaChartArea className="mr-2" /> Area Chart
            </h4>
          </div>
          <div className="p-4">
            <Chart
              chartType="AreaChart"
              data={Areadata}
              options={Areaoptions}
              width="100%"
              height="400px"
            />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-md">
          <div className="bg-gray-200 px-4 py-2 rounded-t-xl">
            <h4 className="flex items-center text-lg font-semibold text-gray-800">
              <FaChartBar className="mr-2" /> Bar Chart
            </h4>
          </div>
          <div className="p-4">
            <Chart
              chartType="Bar"
              data={Bardata}
              options={Baroptions}
              width="100%"
              height="400px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

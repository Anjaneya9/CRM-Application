import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 4200 },
  { month: "Feb", sales: 3800 },
  { month: "Mar", sales: 5200 },
  { month: "Apr", sales: 4600 },
  { month: "May", sales: 6100 },
  { month: "Jun", sales: 5800 },
  { month: "Jul", sales: 7200 },
  { month: "Aug", sales: 6800 },
  { month: "Sep", sales: 5900 },
  { month: "Oct", sales: 7100 },
  { month: "Nov", sales: 8200 },
  { month: "Dec", sales: 9100 },
];

const productsData = [
  { month: "Jan", products: 45 },
  { month: "Feb", products: 38 },
  { month: "Mar", products: 52 },
  { month: "Apr", products: 46 },
  { month: "May", products: 61 },
  { month: "Jun", products: 58 },
  { month: "Jul", products: 72 },
  { month: "Aug", products: 68 },
  { month: "Sep", products: 59 },
  { month: "Oct", products: 71 },
  { month: "Nov", products: 82 },
  { month: "Dec", products: 91 },
];

const categoryData = [
  { name: "Electronics", value: 35, color: "#3B82F6" },
  { name: "Clothing", value: 25, color: "#10B981" },
  { name: "Home & Garden", value: 20, color: "#F59E0B" },
  { name: "Sports", value: 12, color: "#EF4444" },
  { name: "Books", value: 8, color: "#8B5CF6" },
];

interface ChartProps {
  type: "bar" | "line" | "pie";
  title: string;
}

const SalesChart: React.FC<ChartProps> = ({ type, title }) => {
  let chartData: any[] = [];
  let dataKey = "";
  let strokeColor = "#3B82F6";

  if (title === "Monthly Sales Revenue") {
    chartData = salesData;
    dataKey = "sales";
    strokeColor = "#3B82F6";
  } else if (title === "Products Sold Over Time") {
    chartData = productsData;
    dataKey = "products";
    strokeColor = "#10B981";
  }

  const renderChart = () => {
    switch (type) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey={dataKey} fill={strokeColor} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke={strokeColor}
                strokeWidth={3}
                dot={{ fill: strokeColor, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
      <h3 className="text-lg font-semibold text-slate-800 mb-4">{title}</h3>
      {renderChart()}
    </div>
  );
};

export default SalesChart;

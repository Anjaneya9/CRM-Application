import React from "react";
import { useSelector } from "react-redux";
import {
  TrendingUp,
  Package,
  Users,
  DollarSign,
  ShoppingCart,
  Star,
} from "lucide-react";
import { RootState } from "../../store";
import Layout from "../../components/common/Layout";
import SalesChart from "../../components/charts/SalesChart";

const Dashboard: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const stats = [
    {
      title: "Total Revenue",
      value: "$124,580",
      change: "+12.5%",
      icon: DollarSign,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Total Products",
      value: "1,247",
      change: "+3.2%",
      icon: Package,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
    },
    {
      title: "Active Users",
      value: "8,942",
      change: "+8.1%",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
    },
    {
      title: "Orders Today",
      value: "156",
      change: "+15.3%",
      icon: ShoppingCart,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p className="text-blue-100 text-lg">
                Here's what's happening with your business today.
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-6">
                <TrendingUp className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-600 text-sm font-medium">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-slate-800 mt-1">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className="text-emerald-600 text-sm font-semibold">
                        {stat.change}
                      </span>
                      <span className="text-slate-500 text-sm ml-1">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-xl`}>
                    <Icon className={`w-6 h-6 ${stat.textColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart type="line" title="Monthly Sales Revenue" />
          <SalesChart type="bar" title="Products Sold Over Time" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SalesChart type="pie" title="Sales by Category" />
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                {
                  action: "New order received",
                  time: "2 minutes ago",
                  icon: ShoppingCart,
                  color: "text-blue-600",
                },
                {
                  action: 'Product "Smart Watch" updated',
                  time: "15 minutes ago",
                  icon: Package,
                  color: "text-emerald-600",
                },
                {
                  action: "Customer review added",
                  time: "1 hour ago",
                  icon: Star,
                  color: "text-yellow-600",
                },
                {
                  action: "New user registered",
                  time: "2 hours ago",
                  icon: Users,
                  color: "text-purple-600",
                },
              ].map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 hover:bg-slate-50 rounded-lg transition-colors duration-200"
                  >
                    <div className="flex-shrink-0">
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-800 font-medium">
                        {activity.action}
                      </p>
                      <p className="text-slate-500 text-sm">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

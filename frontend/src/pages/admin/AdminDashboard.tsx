import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/ui/AdminSidebar";
import API from "../../api/api";
import { Card } from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>({
    products: 0,
    users: 0,
    orders: 0,
    revenue: 0,
    ordersByMonth: [],
    revenueByMonth: [],
  });

  useEffect(() => {
    API.get("/admin/stats").then((res) => {
      setStats(res.data);
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">📊 Admin Dashboard</h2>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-md rounded-xl text-center">
            <h3 className="text-gray-600 text-sm">Produits</h3>
            <p className="text-2xl font-bold text-indigo-600">{stats.products}</p>
          </Card>

          <Card className="shadow-md rounded-xl text-center">
            <h3 className="text-gray-600 text-sm">Utilisateurs</h3>
            <p className="text-2xl font-bold text-indigo-600">{stats.users}</p>
          </Card>

          <Card className="shadow-md rounded-xl text-center">
            <h3 className="text-gray-600 text-sm">Commandes</h3>
            <p className="text-2xl font-bold text-indigo-600">{stats.orders}</p>
          </Card>

          <Card className="shadow-md rounded-xl text-center">
            <h3 className="text-gray-600 text-sm">Revenus</h3>
            <p className="text-2xl font-bold text-green-600">{stats.revenue} DA</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders by Month */}
          <Card className="shadow-md rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">📦 Commandes par mois</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.ordersByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#6366F1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Revenue by Month */}
          <Card className="shadow-md rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">💰 Revenus par mois</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </div>
  );
}

'use client';

import OrdersOverview from '@/components/content/ordersoverview';
import Footer from '@/components/footer/page';
import Header from '@/components/header/page';
import Sidebar from '@/components/sidebar/page';
import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';

// Example of sales report data
const salesData = [
  { month: 'Jan', revenue: 4000, orders: 240, profit: 1200 },
  { month: 'Feb', revenue: 3000, orders: 139, profit: 800 },
  { month: 'Mar', revenue: 5000, orders: 280, profit: 1500 },
  { month: 'Apr', revenue: 4780, orders: 350, profit: 1300 },
  { month: 'May', revenue: 5890, orders: 390, profit: 1700 },
  { month: 'Jun', revenue: 4390, orders: 290, profit: 1100 },
  { month: 'Jul', revenue: 4490, orders: 310, profit: 1250 },
];

export default function SalesReport() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 text-gray-900">
      <div className='flex flex-grow'>
        <Sidebar />
        <div className='flex flex-col flex-grow'>
          {/* Header */}
          <Header />

          {/* Main Content */}
          <div className="container flex-grow mx-auto px-6 py-10">
            {/* Sales Report Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Sales Report</h1>
              <p className="text-lg text-gray-600">An overview of your sales performance and insights.</p>
            </div>

            {/* Sales Overview Section */}
            <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-200 via-green-300 to-green-400 p-4 rounded-2xl shadow-xl text-white">
                <h3 className="text-lg font-bold mb-4">Total Revenue</h3>
                <p className="text-3xl font-extrabold">$32,250</p>
                <span className="block mt-2 text-sm font-medium">+12% since last month</span>
              </div>
              <div className="bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 p-4 rounded-2xl shadow-xl text-white">
                <h3 className="text-lg font-bold mb-4">Total Orders</h3>
                <p className="text-3xl font-extrabold">2,000</p>
                <span className="block mt-2 text-sm font-medium">+8% since last month</span>
              </div>
              <div className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 p-4 rounded-2xl shadow-xl text-white">
                <h3 className="text-lg font-bold mb-4">Total Profit</h3>
                <p className="text-3xl font-extrabold">$15,000</p>
                <span className="block mt-2 text-sm font-medium">+10% since last month</span>
              </div>
            </div>

            {/* Monthly Sales Breakdown Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Line Chart Card */}
              <div className="relative bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 p-6 rounded-3xl shadow-xl text-white">
                <h2 className="text-2xl font-bold mb-6">Monthly Sales Data</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.3)" />
                    <XAxis dataKey="month" tick={{ fill: 'white' }} />
                    <YAxis tick={{ fill: 'white' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none', color: '#000' }} />
                    <Line type="monotone" dataKey="revenue" stroke="#ffffff" strokeWidth={3} dot={{ fill: '#ffcc00', r: 5 }} />
                    <Line type="monotone" dataKey="orders" stroke="#ffe4e6" strokeWidth={3} dot={{ fill: '#f472b6', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart Card */}
              <div className="relative bg-gradient-to-tr from-green-400 via-green-500 to-teal-500 p-6 rounded-3xl shadow-xl text-white">
                <h2 className="text-2xl font-bold mb-6">Sales Profit by Month</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.3)" />
                    <XAxis dataKey="month" tick={{ fill: 'white' }} />
                    <YAxis tick={{ fill: 'white' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none', color: '#000' }} />
                    <Legend />
                    <Bar dataKey="profit" fill="#ffcc00" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sales Insights Section */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Insights Card */}
              <div className="flex flex-col justify-between bg-white p-8 rounded-3xl shadow-2xl">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Insights</h2>
                <ul className="space-y-6">
                  <li className="flex justify-between items-center bg-gradient-to-r from-pink-100 to-pink-200 p-4 rounded-lg shadow-md">
                    <span className="font-semibold text-gray-700">Total Revenue:</span>
                    <span className="text-pink-600 text-lg font-bold">$32,250</span>
                  </li>
                  <li className="flex justify-between items-center bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg shadow-md">
                    <span className="font-semibold text-gray-700">Total Orders:</span>
                    <span className="text-blue-600 text-lg font-bold">2,000</span>
                  </li>
                  <li className="flex justify-between items-center bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 rounded-lg shadow-md">
                    <span className="font-semibold text-gray-700">Highest Month:</span>
                    <span className="text-yellow-600 text-lg font-bold">May</span>
                  </li>
                  <li className="flex justify-between items-center bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg shadow-md">
                    <span className="font-semibold text-gray-700">Avg Orders/Month:</span>
                    <span className="text-green-600 text-lg font-bold">285</span>
                  </li>
                </ul>
              </div>

              {/* Orders Overview Card */}
              <div className="bg-gradient-to-br from-purple-200 via-purple-50 to-blue-50 p-6 rounded-3xl shadow-lg">
                <OrdersOverview />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

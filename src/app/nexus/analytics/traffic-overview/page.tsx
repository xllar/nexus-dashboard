'use client';

import TrafficOverview from '@/components/content/traficsources'; 
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

// Example of traffic data
const trafficData = [
  { month: 'Jan', pageViews: 5000, uniqueVisitors: 1200, bounceRate: 45 },
  { month: 'Feb', pageViews: 4000, uniqueVisitors: 1000, bounceRate: 50 },
  { month: 'Mar', pageViews: 6000, uniqueVisitors: 1500, bounceRate: 42 },
  { month: 'Apr', pageViews: 5500, uniqueVisitors: 1300, bounceRate: 48 },
  { month: 'May', pageViews: 7000, uniqueVisitors: 1700, bounceRate: 44 },
  { month: 'Jun', pageViews: 4500, uniqueVisitors: 1100, bounceRate: 52 },
  { month: 'Jul', pageViews: 4800, uniqueVisitors: 1200, bounceRate: 47 },
];

export default function TrafficReport() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-gray-900">
      <div className='flex flex-grow'>
        <Sidebar />
        <div className='flex flex-col flex-grow'>
          {/* Header */}
          <Header />

          {/* Main Content */}
          <div className="container flex-grow mx-auto px-6 py-10">
            {/* Traffic Report Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Traffic Overview</h1>
              <p className="text-lg text-gray-600">Key insights into your website’s traffic performance.</p>
            </div>

            {/* Traffic Overview Section */}
            <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-r from-teal-200 to-teal-400 p-6 rounded-lg shadow-lg text-white">
                <h3 className="text-lg font-bold mb-4">Total Page Views</h3>
                <p className="text-3xl font-extrabold">35,000</p>
                <span className="block mt-2 text-sm font-medium">+15% since last month</span>
              </div>
              <div className="bg-gradient-to-r from-blue-300 to-blue-500 p-6 rounded-lg shadow-lg text-white">
                <h3 className="text-lg font-bold mb-4">Unique Visitors</h3>
                <p className="text-3xl font-extrabold">2,500</p>
                <span className="block mt-2 text-sm font-medium">+10% since last month</span>
              </div>
              <div className="bg-gradient-to-r from-purple-300 to-purple-500 p-6 rounded-lg shadow-lg text-white">
                <h3 className="text-lg font-bold mb-4">Bounce Rate</h3>
                <p className="text-3xl font-extrabold">45%</p>
                <span className="block mt-2 text-sm font-medium">-5% since last month</span>
              </div>
            </div>

            {/* Monthly Traffic Breakdown Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Line Chart Card */}
              <div className="relative bg-gradient-to-tr from-blue-400 via-purple-500 to-pink-500 p-6 rounded-3xl shadow-xl text-white">
                <h2 className="text-2xl font-bold mb-6">Monthly Traffic Data</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.3)" />
                    <XAxis dataKey="month" tick={{ fill: 'white' }} />
                    <YAxis tick={{ fill: 'white' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none', color: '#000' }} />
                    <Line type="monotone" dataKey="pageViews" stroke="#ffffff" strokeWidth={3} dot={{ fill: '#ffcc00', r: 5 }} />
                    <Line type="monotone" dataKey="uniqueVisitors" stroke="#ffe4e6" strokeWidth={3} dot={{ fill: '#f472b6', r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Bar Chart Card */}
              <div className="relative bg-gradient-to-tr from-green-400 via-green-500 to-teal-500 p-6 rounded-3xl shadow-xl text-white">
                <h2 className="text-2xl font-bold mb-6">Bounce Rate by Month</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.3)" />
                    <XAxis dataKey="month" tick={{ fill: 'white' }} />
                    <YAxis tick={{ fill: 'white' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', border: 'none', color: '#000' }} />
                    <Legend />
                    <Bar dataKey="bounceRate" fill="#ffcc00" barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Traffic Insights Section */}
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Quick Insights Card */}
              <div className="flex flex-col justify-between bg-white p-8 rounded-3xl shadow-2xl">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Insights</h2>
                <ul className="space-y-6">
                  <li className="flex justify-between items-center bg-gradient-to-r from-pink-100 to-pink-200 p-4 rounded-lg shadow-md">
                    <span className="font-semibold text-gray-700">Total Page Views:</span>
                    <span className="text-pink-600 text-lg font-bold">35,000</span>
                  </li>
                  <li className="flex justify-between items-center bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg shadow-md">
                    <span className="font-semibold text-gray-700">Unique Visitors:</span>
                    <span className="text-blue-600 text-lg font-bold">2,500</span>
                  </li>
                  <li className="flex justify-between items-center bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 rounded-lg shadow-md">
                    <span className="font-semibold text-gray-700">Highest Month:</span>
                    <span className="text-yellow-600 text-lg font-bold">May</span>
                  </li>
                  <li className="flex justify-between items-center bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg shadow-md">
                    <span className="font-semibold text-gray-700">Avg Visitors/Month:</span>
                    <span className="text-green-600 text-lg font-bold">1,400</span>
                  </li>
                </ul>
              </div>

              {/* Traffic Overview Card */}
              <div className="bg-gradient-to-br from-purple-200 via-purple-50 to-blue-50 p-6 rounded-3xl shadow-lg">
                <TrafficOverview />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

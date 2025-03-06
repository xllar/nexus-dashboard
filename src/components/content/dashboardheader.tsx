import React, { useState } from 'react';
import { FaChartLine, FaTasks, FaArrowRight, } from "react-icons/fa";

export default function DashboardHeader() {
  const [expanded, setExpanded] = useState(false);
  
  // Sample data that could come from props in a real application
  const userData = {
    name: "Victor",
    totalSales: 12430,
    newOrders: 57,
    percentChange: 8.3,
    notifications: 3
  };

  return (
    <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl rounded-lg p-6 md:p-8 mb-8 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-white opacity-5 rounded-full"></div>
      <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white opacity-5 rounded-full"></div>
      
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative">
        {/* Left Section: Welcome & User Info */}
        <div className="flex items-center gap-6">
          <div className="p-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full shadow-lg">
            <FaChartLine size={36} className="text-white" />
          </div>
          <div>
            <div className="flex items-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-1">Hello, {userData.name}!</h1>
            </div>
            <p className="text-base md:text-lg font-medium text-white text-opacity-90 leading-relaxed max-w-md">
              Stay updated with your latest stats and take control of your e-commerce store.
            </p>
          </div>
        </div>
        
        {/* Right Section: Stats */}
        <div className="grid grid-cols-2 gap-4 md:gap-6 text-center lg:text-left w-full lg:w-auto">
          <div className="bg-white bg-opacity-15 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-lg border border-white border-opacity-10 hover:bg-opacity-20 transition-all">
            <h3 className="text-lg md:text-xl font-semibold mb-1">Total Sales</h3>
            <p className="text-2xl md:text-3xl font-extrabold">${userData.totalSales.toLocaleString()}</p>
            <div className="flex items-center justify-center lg:justify-start mt-2 text-emerald-300">
              <span className="text-sm font-medium">↑ {userData.percentChange}%</span>
              <span className="text-xs ml-1 text-white text-opacity-70">vs last month</span>
            </div>
          </div>
          <div className="bg-white bg-opacity-15 backdrop-blur-sm p-4 md:p-6 rounded-lg shadow-lg border border-white border-opacity-10 hover:bg-opacity-20 transition-all">
            <h3 className="text-lg md:text-xl font-semibold mb-1">New Orders</h3>
            <p className="text-2xl md:text-3xl font-extrabold">{userData.newOrders}</p>
            <button 
              onClick={() => setExpanded(!expanded)}
              className="mt-2 text-sm font-medium inline-flex items-center text-blue-200 hover:text-blue-100"
            >
              View details
              <FaArrowRight size={12} className="ml-1" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-6 md:mt-8 flex flex-wrap justify-center lg:justify-end gap-3 md:gap-4">
        <button className="bg-white text-gray-800 px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg font-semibold flex items-center gap-2 hover:bg-gray-100 transition-all focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none">
          <FaTasks />
          <span>View Reports</span>
        </button>
        <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg font-semibold flex items-center gap-2 hover:from-pink-600 hover:to-purple-700 transition-all focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none">
          <FaTasks />
          <span>Create Task</span>
        </button>
      </div>
      
      {/* Expandable section - only shows when expanded is true */}
      {expanded && (
        <div className="mt-6 p-4 bg-white bg-opacity-10 backdrop-blur-sm rounded-lg animate-fadeIn">
          <h3 className="font-semibold mb-2">Recent Orders</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-white bg-opacity-5 rounded">
              <span>Order #1092</span>
              <span className="text-emerald-300">$230.00</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white bg-opacity-5 rounded">
              <span>Order #1091</span>
              <span className="text-emerald-300">$175.50</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-white bg-opacity-5 rounded">
              <span>Order #1090</span>
              <span className="text-emerald-300">$310.25</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
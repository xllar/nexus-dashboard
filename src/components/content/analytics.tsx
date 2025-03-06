"use client"
import React, { useState } from 'react';
import { FaChartBar, FaChartPie, FaCalendarAlt, FaDownload } from 'react-icons/fa';

export default function Analytics() {
  const [timeRange, setTimeRange] = useState('week');
  
  // Sample data - would come from props or API in a real application
  const stats = {
    visitorCount: 12462,
    conversionRate: 3.2,
    avgSessionTime: '2:45'
  };

  return (
    <div>
      <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
        {/* Header with filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 sm:mb-0">Analytics</h3>
          
          <div className="flex space-x-2">
            <div className="bg-gray-100 rounded-lg p-1">
              <button 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === 'week' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                onClick={() => setTimeRange('week')}
              >
                Week
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === 'month' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                onClick={() => setTimeRange('month')}
              >
                Month
              </button>
              <button 
                className={`px-3 py-1 text-sm rounded-md ${timeRange === 'year' ? 'bg-blue-500 text-white' : 'text-gray-600'}`}
                onClick={() => setTimeRange('year')}
              >
                Year
              </button>
            </div>
            
            <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md text-gray-600">
              <FaCalendarAlt />
            </button>
          </div>
        </div>
        
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-2 mr-3">
                <FaChartBar className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Visitors</p>
                <p className="text-xl font-bold text-gray-800">{stats.visitorCount.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <FaChartPie className="text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Conversion Rate</p>
                <p className="text-xl font-bold text-gray-800">{stats.conversionRate}%</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-2 mr-3">
                <FaChartBar className="text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Session</p>
                <p className="text-xl font-bold text-gray-800">{stats.avgSessionTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="w-full bg-gray-50 rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 p-4 flex justify-between items-center">
              <h4 className="font-medium text-gray-700">Traffic Sources</h4>
              <button className="text-gray-400 hover:text-gray-600">
                <FaDownload size={14} />
              </button>
            </div>
            <div className="h-52 flex items-center justify-center text-gray-400">
              Traffic Source Chart Placeholder
            </div>
          </div>
          
          <div className="w-full bg-gray-50 rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 p-4 flex justify-between items-center">
              <h4 className="font-medium text-gray-700">User Demographics</h4>
              <button className="text-gray-400 hover:text-gray-600">
                <FaDownload size={14} />
              </button>
            </div>
            <div className="h-52 flex items-center justify-center text-gray-400">
              User Demographics Chart Placeholder
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
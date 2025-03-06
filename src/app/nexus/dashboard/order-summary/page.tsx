'use client';

import React, { useState } from 'react';
import Footer from '@/components/footer/page';
import Header from '@/components/header/page';
import Sidebar from '@/components/sidebar/page';

interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Pending' | 'Completed' | 'Cancelled'; // Explicitly define possible statuses
}

export default function OrderSummary() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      customerName: 'John Doe',
      date: new Date().toLocaleDateString(),
      total: 150.0,
      status: 'Pending',
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      date: new Date().toLocaleDateString(),
      total: 200.5,
      status: 'Completed',
    },
    {
      id: '3',
      customerName: 'Michael Brown',
      date: new Date().toLocaleDateString(),
      total: 50.75,
      status: 'Cancelled',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [loading] = useState(false);

  const handleStatusChange = (id: string, newStatus: 'Pending' | 'Completed' | 'Cancelled') => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus ? order.status === filterStatus : true)
  );

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  // Define the type for statusCount
  interface StatusCount {
    Pending: number;
    Completed: number;
    Cancelled: number;
  }

  // Calculate status breakdown dynamically
  const statusCount = orders.reduce<StatusCount>(
    (acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    },
    { Pending: 0, Completed: 0, Cancelled: 0 }
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 text-gray-900">
      <div className='flex flex-grow'>
        <Sidebar/>
        <div className="flex flex-col flex-grow">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="container flex-grow mx-auto px-6 py-10">
            {/* Sales Statistics Section */}
            <div className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-green-200 via-green-300 to-green-400 p-4 rounded-2xl shadow-xl text-white">
                <h3 className="text-lg font-bold mb-4">Total Revenue</h3>
                <p className="text-3xl font-extrabold">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 p-4 rounded-2xl shadow-xl text-white">
                <h3 className="text-lg font-bold mb-4">Total Orders</h3>
                <p className="text-3xl font-extrabold">{orders.length}</p>
              </div>
              <div className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 p-4 rounded-2xl shadow-xl text-white">
                <h3 className="text-lg font-bold mb-4">Status Breakdown</h3>
                <div className="p-4 bg-white/30 rounded-lg">
                  <p>Pending: {statusCount.Pending}</p>
                  <p>Completed: {statusCount.Completed}</p>
                  <p>Cancelled: {statusCount.Cancelled}</p>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 gap-4">
              <input
                type="text"
                placeholder="Search by customer name..."
                className="px-4 py-2 border rounded-lg w-full md:w-1/3"
                value={searchTerm}
                onChange={handleSearch}
              />
              <select
                className="px-4 py-2 border rounded-lg w-full md:w-1/4"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Orders Table */}
            {loading ? (
              <div className="text-center py-4">
                <span className="text-lg font-medium">Loading orders...</span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table-auto w-full bg-white rounded-lg shadow">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left">Order ID</th>
                      <th className="px-4 py-2 text-left">Customer Name</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Total</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="border-b">
                          <td className="px-4 py-2">{order.id}</td>
                          <td className="px-4 py-2">{order.customerName}</td>
                          <td className="px-4 py-2">{order.date}</td>
                          <td className="px-4 py-2">${order.total.toFixed(2)}</td>
                          <td className="px-4 py-2">
                            <span
                              className={`px-2 py-1 rounded-full text-sm ${
                                order.status === 'Completed'
                                  ? 'bg-green-100 text-green-600'
                                  : order.status === 'Pending'
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : 'bg-red-100 text-red-600'
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-4 py-2">
                            <button
                              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                              onClick={() => handleStatusChange(order.id, 'Completed')}
                            >
                              Mark as Completed
                            </button>
                            <button
                              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                              onClick={() => handleStatusChange(order.id, 'Cancelled')}
                            >
                              Cancel
                            </button>
                            <button
                              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                              onClick={() => handleStatusChange(order.id, 'Pending')}
                            >
                              Mark as Pending
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-4">
                          No orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
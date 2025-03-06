import { FaChartLine, FaTasks } from "react-icons/fa";

export default function DashboardHeader() {
  return (
    <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-xl rounded-lg p-8 mb-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Section: Welcome */}
        <div className="flex items-center gap-6">
          <div className="p-5 bg-white bg-opacity-30 rounded-full shadow-lg">
            <FaChartLine size={40} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">Hello, Victor!</h1>
            <p className="text-lg font-medium leading-relaxed">
              Stay updated with your latest stats and take control of your e-commerce store.
            </p>
          </div>
        </div>

        {/* Right Section: Stats */}
        <div className="grid grid-cols-2 gap-6 text-center lg:text-left">
          <div className="bg-white bg-opacity-25 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-1">Total Sales</h3>
            <p className="text-3xl font-extrabold">$12,430</p>
          </div>
          <div className="bg-white bg-opacity-25 p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-1">New Orders</h3>
            <p className="text-3xl font-extrabold">57</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-center lg:justify-end gap-4">
        <button className="bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800 px-6 py-3 rounded-lg shadow-lg font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
          <FaTasks />
          View Reports
        </button>
        <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold flex items-center gap-2 hover:scale-105 transition-transform">
          <FaTasks />
          Create Task
        </button>
      </div>
    </section>
  );
}

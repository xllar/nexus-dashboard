'use client';
import React, { useState } from 'react';
import Header from '@/components/header/page';
import Footer from '@/components/footer/page';
import Sidebar from '@/components/sidebar/page';

// Define a type for the shipping rate
interface ShippingRate {
  method: string;
  region: string;
  fee: string;
}

export default function RatesAndFeesPage() {
  // Explicitly type the `rates` state as an array of `ShippingRate`
  const [rates, setRates] = useState<ShippingRate[]>([]);

  // Explicitly type the `newRate` state as `ShippingRate`
  const [newRate, setNewRate] = useState<ShippingRate>({ method: '', region: '', fee: '' });

  const handleAddRate = () => {
    if (newRate.method.trim() && newRate.fee.trim()) {
      setRates([...rates, newRate]);
      setNewRate({ method: '', region: '', fee: '' });
      alert('Shipping rate added!');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidebar />

        <div className="flex flex-col flex-grow">
          <Header />

          <main className="flex-grow">
            <div className="container mx-auto px-6 mt-6">
              <h3 className="text-2xl font-semibold text-gray-900">Shipping Rates and Fees</h3>

              <div className="space-y-4 mt-6">
                <div>
                  <label className="text-lg font-semibold text-gray-700">Shipping Method</label>
                  <input
                    type="text"
                    value={newRate.method}
                    onChange={(e) => setNewRate({ ...newRate, method: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    placeholder="Enter shipping method"
                  />
                </div>

                <div>
                  <label className="text-lg font-semibold text-gray-700">Region</label>
                  <input
                    type="text"
                    value={newRate.region}
                    onChange={(e) => setNewRate({ ...newRate, region: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    placeholder="Enter region"
                  />
                </div>

                <div>
                  <label className="text-lg font-semibold text-gray-700">Fee</label>
                  <input
                    type="text"
                    value={newRate.fee}
                    onChange={(e) => setNewRate({ ...newRate, fee: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    placeholder="Enter fee amount"
                  />
                </div>

                <button
                  onClick={handleAddRate}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add Rate
                </button>
              </div>

              <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-900">Existing Rates</h4>
                <ul className="space-y-4 mt-4">
                  {rates.map((rate, index) => (
                    <li key={index} className="p-4 border rounded-lg">
                      <h5 className="font-semibold">{rate.method}</h5>
                      <p><strong>Region:</strong> {rate.region}</p>
                      <p><strong>Fee:</strong> {rate.fee}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
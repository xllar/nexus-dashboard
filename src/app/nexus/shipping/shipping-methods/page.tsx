'use client';
import React, { useState } from 'react';
import Header from '@/components/header/page';
import Footer from '@/components/footer/page';
import Sidebar from '@/components/sidebar/page';

// Define a type for the shipping method
interface ShippingMethod {
  name: string;
  description: string;
  rate: string;
  methodType: string;
  zones: string[];
  rules: string;
}

export default function ShippingMethodsPage() {
  // Explicitly type the `shippingMethods` state as an array of `ShippingMethod`
  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([]);

  // Explicitly type the `newMethod` state as `ShippingMethod`
  const [newMethod, setNewMethod] = useState<ShippingMethod>({
    name: '',
    description: '',
    rate: '',
    methodType: 'Standard', // Default method type
    zones: [], // Shipping zones
    rules: '', // Shipping rules
  });

  const handleAddShippingMethod = () => {
    if (newMethod.name.trim() && newMethod.rate.trim()) {
      setShippingMethods([...shippingMethods, newMethod]);
      setNewMethod({
        name: '',
        description: '',
        rate: '',
        methodType: 'Standard',
        zones: [],
        rules: '',
      });
      alert('Shipping method added!');
    }
  };

  const handleAddZone = (zone: string) => {
    if (zone.trim()) {
      setNewMethod({ ...newMethod, zones: [...newMethod.zones, zone] });
    }
  };

  const handleRemoveZone = (zone: string) => {
    setNewMethod({
      ...newMethod,
      zones: newMethod.zones.filter((z) => z !== zone),
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidebar />

        <div className="flex flex-col flex-grow">
          <Header />

          <main className="flex-grow">
            <div className="container mx-auto px-6 mt-6">
              <h3 className="text-2xl font-semibold text-gray-900">Shipping Methods</h3>
              <div className="space-y-4 mt-6">
                <div>
                  <label className="text-lg font-semibold text-gray-700">Shipping Method</label>
                  <input
                    type="text"
                    value={newMethod.name}
                    onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    placeholder="Enter shipping method name"
                  />
                </div>

                <div>
                  <label className="text-lg font-semibold text-gray-700">Description</label>
                  <textarea
                    value={newMethod.description}
                    onChange={(e) => setNewMethod({ ...newMethod, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    placeholder="Enter description"
                  />
                </div>

                <div>
                  <label className="text-lg font-semibold text-gray-700">Shipping Rate</label>
                  <input
                    type="text"
                    value={newMethod.rate}
                    onChange={(e) => setNewMethod({ ...newMethod, rate: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    placeholder="Enter rate"
                  />
                </div>

                <div>
                  <label className="text-lg font-semibold text-gray-700">Method Type</label>
                  <select
                    value={newMethod.methodType}
                    onChange={(e) => setNewMethod({ ...newMethod, methodType: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Express">Express</option>
                  </select>
                </div>

                <div>
                  <label className="text-lg font-semibold text-gray-700">Shipping Zones</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      onChange={(e) => handleAddZone(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                      placeholder="Enter shipping zone"
                    />
                    <button
                      onClick={() => handleAddZone(newMethod.zones[newMethod.zones.length - 1])}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Add Zone
                    </button>
                  </div>
                  <ul className="mt-2">
                    {newMethod.zones.map((zone, index) => (
                      <li key={index} className="p-2 bg-gray-100 rounded-md mb-2">
                        <span>{zone}</span>
                        <button
                          onClick={() => handleRemoveZone(zone)}
                          className="ml-4 text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <label className="text-lg font-semibold text-gray-700">Shipping Rules</label>
                  <textarea
                    value={newMethod.rules}
                    onChange={(e) => setNewMethod({ ...newMethod, rules: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    placeholder="Enter shipping rules"
                  />
                </div>

                <button
                  onClick={handleAddShippingMethod}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Add Shipping Method
                </button>
              </div>

              <div className="mt-6">
                <h4 className="text-xl font-semibold text-gray-900">Existing Shipping Methods</h4>
                <ul className="space-y-4 mt-4">
                  {shippingMethods.map((method, index) => (
                    <li key={index} className="p-4 border rounded-lg">
                      <h5 className="font-semibold">{method.name}</h5>
                      <p>{method.description}</p>
                      <p><strong>Rate:</strong> {method.rate}</p>
                      <p><strong>Method Type:</strong> {method.methodType}</p>
                      <p><strong>Zones:</strong> {method.zones.join(', ')}</p>
                      <p><strong>Rules:</strong> {method.rules}</p>
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
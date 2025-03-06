'use client';
import React, { useState } from 'react';
import Header from '@/components/header/page';
import Footer from '@/components/footer/page';
import Sidebar from '@/components/sidebar/page';

// Define a type for the tracking information
interface TrackingInfo {
  status: string;
  estimatedDelivery: string;
}

export default function TrackingPage() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);

  const handleTrackShipment = () => {
    if (trackingNumber.trim()) {
      // Simulate tracking API call (in reality, use an API like UPS or FedEx to get tracking status)
      setTrackingInfo({ status: 'In Transit', estimatedDelivery: '2025-01-07' });
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
              <h3 className="text-2xl font-semibold text-gray-900">Track Your Shipment</h3>

              <div className="space-y-4 mt-6">
                <div>
                  <label className="text-lg font-semibold text-gray-700">Tracking Number</label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                    placeholder="Enter tracking number"
                  />
                </div>

                <button
                  onClick={handleTrackShipment}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Track Shipment
                </button>

                {trackingInfo && (
                  <div className="mt-4 p-4 bg-gray-100">
                    <p><strong>Status:</strong> {trackingInfo.status}</p>
                    <p><strong>Estimated Delivery:</strong> {trackingInfo.estimatedDelivery}</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
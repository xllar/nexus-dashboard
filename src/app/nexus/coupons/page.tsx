'use client';
import React, { useState, useEffect } from 'react';
import ActiveCoupons from '@/components/coupons/active-coupons/page';
import NewCoupons from '@/components/coupons/new-coupons/page';
import ExpiredCoupons from '@/components/coupons/expired-coupons/page';
import Discounts from '@/components/coupons/discount/page';
import { FaTag, FaPlusCircle, FaTimesCircle } from 'react-icons/fa';

import Header from '@/components/header/page';
import Footer from '@/components/footer/page';
import Sidebar from '@/components/sidebar/page';

const tabs = [
  { id: 'active-coupons', label: 'Active Coupons', icon: <FaTag /> },
  { id: 'new-coupons', label: 'New Coupons', icon: <FaPlusCircle /> },
  { id: 'expired-coupons', label: 'Expired Coupons', icon: <FaTimesCircle /> },
  { id: 'discounts', label: 'Discounts', icon: <FaTag /> },
];

export default function OrderDashboard() {
  const [activeTab, setActiveTab] = useState('active-coupons');

  // Load the last selected tab from localStorage on component mount
  useEffect(() => {
    const lastTab = localStorage.getItem('activeTab');
    if (lastTab) {
      setActiveTab(lastTab);
    }
  }, []);

  // Save the selected tab to localStorage whenever it changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    localStorage.setItem('activeTab', tabId);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'active-coupons':
        return <ActiveCoupons />;
      case 'new-coupons':
        return <NewCoupons />;
      case 'expired-coupons':
        return <ExpiredCoupons />;
      case 'discounts':
        return <Discounts />;
      default:
        return <ActiveCoupons />; // Default tab
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex flex-col flex-grow">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-grow">
            <div className="container mx-auto px-6 mt-6">
              {/* Tab Navigation */}
              <div className="flex flex-wrap justify-center space-x-6 mb-8 gap-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-purple-500 hover:text-white'
                    }`}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    {tab.icon}
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="rounded-lg p-6 sm:p-8 transition-all duration-300">
                {renderTabContent()}
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
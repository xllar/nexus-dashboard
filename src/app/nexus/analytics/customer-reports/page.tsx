'use client';
import { useState } from 'react';
import Sidebar from '@/components/sidebar/page';
import Header from '@/components/header/page';
import Footer from '@/components/footer/page';
import Keymetrics from '@/components/content/keymetrics';
import Realtimeinsights from '@/components/content/realtimeinsight';
import Revenueupdate from '@/components/content/revenueupdate';
import Saleoverview from '@/components/content/saleoverview';
import Ordersoverview from '@/components/content/ordersoverview';
import Customerfeedback from '@/components/content/customerfeedback';
import Usermanagement from '@/components/content/usermanagement';
import Marketingcampaigns from '@/components/content/marketingcampaigns';
import PaginationComponent from '@/components/pagination/page';

const components = [
  { id: 1, component: <Keymetrics /> },         
  { id: 2, component: <Realtimeinsights /> },    
  { id: 3, component: <Revenueupdate /> },      
  { id: 4, component: <Saleoverview /> },       
  { id: 5, component: <Ordersoverview /> },      
  { id: 6, component: <Customerfeedback /> },   
  { id: 7, component: <Usermanagement /> },      
  { id: 8, component: <Marketingcampaigns /> },  
];

export default function CustomerReportPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(components.length / itemsPerPage);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentComponents = components.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900">
      {/* Sidebar and Main Layout */}
      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-grow">
          {/* Header */}
          <Header />

          {/* Page Content */}
          <main className="container flex-grow mx-auto px-6 py-10">
            {/* Page Title */}
            <header className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Customer Report</h1>
              <p className="text-lg text-gray-600">Track and analyze key metrics related to your customers.</p>
            </header>

            {/* Render paginated components */}
            <section className="mb-12">
              {currentComponents.map(({ id, component }) => (
                <div key={id} className="mb-12">
                  {component}
                </div>
              ))}
            </section>

            {/* Pagination */}
            <section className="mt-8">
              <PaginationComponent
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </section>
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

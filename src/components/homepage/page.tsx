import Sidebar from '@/components/sidebar/page';
import Header from '@/components/header/page';
import MainContent from '@/components/maincontent/page';
import AdminDashboardFooter from '@/components/footer/page';
export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full">
      <div className="flex flex-1 w-full">
        <Sidebar />
        <div className="flex flex-col flex-1 w-full">
          <Header />
          <div className="flex-1 w-full">
            <MainContent />
  
          </div>
        </div>
      </div>
      <AdminDashboardFooter />
    </div>
  );
}

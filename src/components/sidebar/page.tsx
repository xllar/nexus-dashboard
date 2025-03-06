"use client";
import { useEffect, useState } from "react";

import {
  Home,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  ChevronDown,
  ShoppingCart,
  Package,
  UserCheck,
  BarChart,
  Tag,
  Truck,
  CreditCard,
  Palette,
  User,
  Bell,
} from "lucide-react";
import BrandLogo from "./brandlogo";


export default function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null);

  // This is to prevent scrolling
useEffect(() => {
  if (isMobileMenuOpen) {
    document.body.style.overflow = "hidden";  
  } else {
    document.body.style.overflow = "auto";
  }
  return () => {
    document.body.style.overflow = "auto"; 
  };
}, [isMobileMenuOpen]);


  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const toggleMobileSubmenu = (menu: string) => {
    setActiveMobileSubmenu(activeMobileSubmenu === menu ? null : menu);
  };

  const menus = [
    { 
      name: "Dashboard", 
      icon: Home, 
      submenu: [
        { name: "Overview", link: "/#" },
        { name: "Sales Stats", link: "/nexus/dashboard/sales-stats" },
        { name: "Order Summary", link: "/nexus/dashboard/order-summary" },
      ] 
    },
    { name: "Orders", icon: ShoppingCart, link: "/nexus/orders" },
    { 
      name: "Products", 
      icon: Package, 
      submenu: [
        { name: "All Products", link: "/nexus/products/all-products" },
        { name: "Add New Product", link: "/nexus/products/add-new-product" },
        { name: "Product Categories", link: "/nexus/products/product-categories" },
        { name: "Inventory Management", link: "/nexus/products/inventory-management" },
      ] 
    },
    { 
      name: "Customers", 
      icon: UserCheck, 
      submenu: [
        { name: "All Customers", link: "/nexus/customers/all-customers" },
        { name: "Add New Customer", link: "/nexus/customers/add-new-customer" },
        { name: "Customer Groups", link: "/nexus/customers/customer-groups" },
        { name: "Customer Activity", link: "/nexus/customers/customer-activity" },
      ] 
    },
    { 
      name: "Analytics/Reports", 
      icon: BarChart, 
      submenu: [
        { name: "Sales Reports", link: "/nexus/analytics/sales-reports" },
        { name: "Traffic Reports", link: "/nexus/analytics/traffic-reports" },
        { name: "Product Performance", link: "/nexus/analytics/product-performance" },
        { name: "Customer Reports", link: "/nexus/analytics/customer-reports" },
      ] 
    },
    { 
      name: "Coupons/Discounts", 
      icon: Tag, 
     link: "nexus/coupons"
    },
    { 
      name: "Shipping", 
      icon: Truck, 
      submenu: [
        { name: "Shipping Methods", link: "/nexus/shipping/shipping-methods" },
        { name: "Rates and Fees", link: "/nexus/shipping/rates-fees" },
        { name: "Shipping Labels", link: "/shipping/shipping-labels" },
        { name: "Tracking", link: "/nexus/shipping/tracking" },
      ] 
    },
    { 
      name: "Payments", 
      icon: CreditCard, link: "/nexus/payments",
    },
    {  
      name: "Settings", 
      icon: Settings, 
      link: "/nexus/settings",
    },
    { 
      name: "Theme Customization", 
      icon: Palette, 
      link: "/nexus/theme-customization"
    
    },
    { name: "User Profile", icon: User, submenu: [], link: "/nexus/user-profile" },
    { name: "Notifications", icon: Bell, submenu: [], link: "/notifications" },
    { name: "Help & Support",  icon: HelpCircle, link: "/nexus/help&support"},
    { name: "Logout", icon: LogOut, submenu: [], link: "/logout" },
  ];
  

  return (
    <div className="relative flex">
      {/* Sidebar for Medium and Larger Screens */}
      <div
        className={`bg-white shadow-lg transform transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-16"
        } hidden md:block`}
      >
        <div className="h-full flex flex-col items-center md:items-start">
          {isSidebarOpen && <div className="mb-4 mt-4"><BrandLogo /></div>}
          <ul className={`space-y-4 w-full ${isSidebarOpen ? "pl-2" : "mt-16"} flex flex-col`}>
            {menus.map((menu) => (
              <li key={menu.name} className="w-full">
                <div
                  className={`flex items-center ${
                    isSidebarOpen ? "space-x-2" : "justify-center"
                  } cursor-pointer`}
                  onClick={() => toggleSubmenu(menu.name)}
                >
                  <menu.icon className="w-5 h-5 text-gray-600" />
                  {isSidebarOpen && (
                    <>
                      <a href={menu.link} className="text-gray-700">{menu.name}</a>
                      {menu.submenu && (
                        <>
                          {activeSubmenu === menu.name ? (
                            <ChevronDown className="w-4 h-4 text-gray-600" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
                {menu.submenu && activeSubmenu === menu.name && isSidebarOpen && (
                  <ul className="pl-8 space-y-2 mt-2 text-sm text-gray-600">
                    {menu.submenu.map((subitem) => (
                      <li key={subitem.name}>
                        <a href={subitem.link} className="block">{subitem.name}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
      >
        <div className="bg-white p-6 space-y-4">
          {/* Close Button */}
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-600 hover:text-gray-900 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div><BrandLogo /></div>
          {/* Menu List */}
          <ul className="space-y-4">
            {menus.map((menu) => (
              <li key={menu.name}>
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleMobileSubmenu(menu.name)}
                >
                  {/* Menu Name */}
                  <span className="text-gray-700 flex items-center">
                    <menu.icon className="w-5 h-5 mr-2 text-gray-600" /> {menu.name}
                  </span>

                  {/* Arrow Icon */}
                  {menu.submenu && (
                    <span>
                      {activeMobileSubmenu === menu.name ? (
                        <ChevronDown className="w-4 h-4 text-gray-600" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                      )}
                    </span>
                  )}
                </div>

                {/* Submenu Items */}
                {menu.submenu && activeMobileSubmenu === menu.name && (
                  <ul className="pl-6 space-y-2 mt-2 text-sm text-gray-600">
                    {menu.submenu.map((subitem) => (
                      <li key={subitem.name}>
                        <a href={subitem.link} className="flex items-center">
                          <ChevronRight className="w-3 h-3 mr-2 text-gray-500" />
                          {subitem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Menu Icon for Small Screens */}
      <button
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        className="absolute top-7 left-4 text-gray-600 hover:text-gray-900 md:hidden z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>

      {/* Large Screen Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        className="hidden md:block text-gray-600 hover:text-gray-900 absolute top-4 right-4 z-10"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </button>
    </div>
  );
}


'use client';
import React, { useState, useEffect } from 'react';
import PaginationComponent from '@/components/pagination/page'; // Import your pagination component
import Sidebar from '@/components/sidebar/page';
import Header from '@/components/header/page';
import Footer from '@/components/footer/page';
import Image from 'next/image'; // Import the Image component from next/image

interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  stock: number;
  status: string;
  image: string;
}

export default function AllProducts() {
  const products: Product[] = [
    { id: 1, name: 'Wireless Earbuds', price: '$99.00', category: 'Electronics', stock: 120, status: 'Available', image: 'https://via.placeholder.com/100x100' },
    { id: 2, name: 'Running Shoes', price: '$75.00', category: 'Footwear', stock: 50, status: 'Out of Stock', image: 'https://via.placeholder.com/100x100' },
    { id: 3, name: 'Smartwatch', price: '$199.00', category: 'Accessories', stock: 30, status: 'Available', image: 'https://via.placeholder.com/100x100' },
    { id: 4, name: 'Laptop Backpack', price: '$49.99', category: 'Accessories', stock: 80, status: 'Available', image: 'https://via.placeholder.com/100x100' },
    { id: 5, name: 'Bluetooth Speaker', price: '$89.00', category: 'Electronics', stock: 200, status: 'Available', image: 'https://via.placeholder.com/100x100' },
    { id: 6, name: 'Gaming Mouse', price: '$55.00', category: 'Accessories', stock: 150, status: 'Available', image: 'https://via.placeholder.com/100x100' },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortField, setSortField] = useState<keyof Product | ''>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(false);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [currentPage, searchQuery, selectedCategory]);

  // Filter and sort products
  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategory === 'All Categories' || product.category === selectedCategory)
    )
    .sort((a, b) => {
      if (!sortField) return 0;
      const valueA = a[sortField];
      const valueB = b[sortField];
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      Available: 'bg-green-100 text-green-700',
      'Out of Stock': 'bg-red-100 text-red-700',
      'Low Stock': 'bg-yellow-100 text-yellow-700',
    };
    return <span className={`px-3 py-1 text-sm font-medium rounded-full ${colors[status]}`}>{status}</span>;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex flex-col flex-grow">
          {/* Header */}
          <Header />
          <section className="p-6 bg-gray-50 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-white bg-indigo-600 p-3 rounded-lg border border-indigo-700 w-64 mb-6">All Products</h2>
            {/* Filters and Search */}
            <div className="flex flex-wrap items-center mb-6 gap-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow max-w-sm px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option>All Categories</option>
                <option>Electronics</option>
                <option>Footwear</option>
                <option>Fitness</option>
              </select>
            </div>
            {/* Table */}
            <div className="hidden md:block">
              {isLoading ? (
                <p className="text-center text-gray-500">Loading...</p>
              ) : currentProducts.length === 0 ? (
                <p className="text-center text-gray-500">No products available.</p>
              ) : (
                <table className="w-full table-auto border-collapse bg-white rounded-lg shadow">
                  <thead className="bg-gray-100">
                    <tr className="text-left text-gray-600 text-sm">
                      <th className="px-6 py-3 font-medium">Image</th>
                      <th className="px-6 py-3 font-medium cursor-pointer" onClick={() => handleSort('id')}>
                        Product ID
                      </th>
                      <th className="px-6 py-3 font-medium cursor-pointer" onClick={() => handleSort('name')}>
                        Name
                      </th>
                      <th className="px-6 py-3 font-medium cursor-pointer" onClick={() => handleSort('price')}>
                        Price
                      </th>
                      <th className="px-6 py-3 font-medium">Category</th>
                      <th className="px-6 py-3 font-medium cursor-pointer" onClick={() => handleSort('stock')}>
                        Stock
                      </th>
                      <th className="px-6 py-3 font-medium">Status</th>
                      <th className="px-6 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentProducts.map((product, index) => (
                      <tr
                        key={product.id}
                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors`}
                      >
                        <td className="px-6 py-4">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={100}
                            height={100}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-700">#{product.id}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{product.name}</td>
                        <td className="px-6 py-4 text-sm font-bold text-gray-800">{product.price}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{product.stock}</td>
                        <td className="px-6 py-4">{getStatusBadge(product.status)}</td>
                        <td className="px-6 py-4">
                          <button className="text-blue-600 hover:underline mr-2">Edit</button>
                          <button className="text-red-600 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            {/* Pagination */}
            <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
}
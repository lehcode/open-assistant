import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex h-[calc(100vh-64px)]">
        <Sidebar />
        <section className="flex-1 overflow-auto p-6">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default AppLayout;

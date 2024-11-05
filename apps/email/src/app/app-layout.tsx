import React from 'react';
import { Menu, LayoutGrid, User, Bell, Settings } from 'lucide-react';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <Menu className="h-6 w-6 text-gray-500" />
            <h1 className="text-xl font-semibold">App Name</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Bell className="h-6 w-6 text-gray-500" />
            <User className="h-6 w-6 text-gray-500" />
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm">
          <nav className="p-4">
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <LayoutGrid className="h-5 w-5 text-gray-500" />
                <span>Dashboard</span>
              </li>
              <li className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                <Settings className="h-5 w-5 text-gray-500" />
                <span>Settings</span>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Content Cards */}
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Card {item}</h2>
                <p className="text-gray-600">
                  This is a sample content card demonstrating the grid layout system.
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

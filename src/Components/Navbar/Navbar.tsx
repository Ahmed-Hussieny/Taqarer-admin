// components/Navbar.tsx
import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-40 dark:bg-gray-800">
      <div className="flex items-center justify-between px-4 h-16 sm:px-6">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
            aria-label="Toggle sidebar"
          >
            <Bars3Icon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Notifications"
          >
            <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <div className="flex items-center">
            <img 
              src="https://via.placeholder.com/40" 
              alt="User avatar" 
              className="w-8 h-8 rounded-full ring-2 ring-gray-300 dark:ring-gray-600"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
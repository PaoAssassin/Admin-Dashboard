// components/layout/Header.tsx
import React from 'react';
import { FaBell } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    // FIX: Set Z-index high (z-30) to ensure it overlaps the sidebar (z-20)
    <header className="w-full h-[58px] bg-gray-50 py-3 px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm border-b border-gray-200">
      
      {/* "Admin" Text (Left side) */}
      <div className="text-xl font-medium text-gray-800 ml-12 sm:ml-0">
        Admin
      </div>

      {/* Notification Bell and Avatar (Right side) */}
      <div className="flex items-center space-x-4">
        
        {/* Notification Bell */}
        <button className="relative p-1">
          <FaBell className="text-xl text-gray-500 hover:text-gray-700" />
        </button>
        
        {/* User Avatar (Matching green/purple border) */}
        <div className="w-9 h-9 relative">
            {/* Subtle border effect */}
            <div className="absolute inset-0 rounded-full border-2 border-purple-300 opacity-60"></div>
            <div className="w-full h-full bg-lime-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
                <span className="text-sm">🐸</span> 
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
// components/layout/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaChartLine, FaUsers, FaThList } from 'react-icons/fa';

// Define the navigation items
const navItems = [
  // Icon based on the images provided (Chart, Users, List/Table)
  { href: '/', label: 'Dashboard', icon: FaChartLine },
  { href: '/students', label: 'Students', icon: FaUsers },
  { href: '/contents', label: 'Contents', icon: FaThList },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();

  // The sidebar needs NO top padding if the header is designed to overlap it.
  return (
    <aside className="w-20 h-screen bg-white shadow-lg flex flex-col items-center py-2 fixed left-0 top-0 z-20"> 
      {/* ⬆️ Z-20 ensures the sidebar is above the content/main area, but not necessarily the header */}
      
      {/* Empty space/placeholder area that is overlapped by the Header */}
      <div className="w-full h-[58px] mb-4 bg-white"> 
         {/* Height matches the height of the Header.tsx component (py-3 + content height) */}
      </div>
      
      {/* Navigation Icons */}
      <nav className="space-y-4 w-full px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const IconComponent = item.icon;
          
          const iconClasses = isActive
            ? "text-purple-600 border-r-4 border-purple-600 bg-gray-100/70" // Active state with border and light bg
            : "text-gray-400 hover:text-purple-600 hover:bg-gray-100";
            
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={`flex flex-col items-center py-4 rounded-lg transition duration-150 group ${iconClasses}`}
            >
              <IconComponent className="text-2xl" />
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
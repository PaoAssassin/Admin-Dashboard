'use client';

import React from 'react';

const AdminContentManagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#E5E7EB] text-gray-900 font-sans">
      {/* Page Container */}
      <div className="p-6">
        {/* Header / Breadcrumb */}
        <div className="mb-6">
          <h2 className="text-sm text-gray-600 font-medium">
            Admin / <span className="text-gray-800">Content Management</span>
          </h2>
        </div>

        {/* Page Title */}
        <div>
          <h1 className="text-2xl font-bold text-[#1E1B4B]">Contents</h1>
        </div>

      </div>
    </div>
  );
};

export default AdminContentManagement;

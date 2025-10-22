// components/views/AdminContentManagement.tsx
import React from 'react';
import { FaSearch, FaFilter, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// ⬅️ NEW IMPORTS
import { MOCK_CONTENT, ContentItem, ContentStatus } from '../../lib/data';

// --- 1. INTERNAL UI COMPONENTS (Types and Data are now external) ---

const StatusPill: React.FC<{ status: ContentStatus }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
  let colorClasses = '';

  switch (status) {
    case 'Published':
      colorClasses = 'bg-green-300/50 text-green-800';
      break;
    case 'Draft':
      colorClasses = 'bg-yellow-300/50 text-yellow-800';
      break;
    case 'Archived':
    default:
      colorClasses = 'bg-gray-300/50 text-gray-800';
      break;
  }

  return (
    <span className={`${baseClasses} ${colorClasses}`}>
      {status}
    </span>
  );
};

const ContentList: React.FC<{ items: ContentItem[] }> = ({ items }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            
            {/* Top Action Bar: Create Button, Search, and Filter */}
            <div className="flex justify-between items-center mb-6">
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition duration-150">
                    <FaPlus className="w-3 h-3" />
                    <span className="font-medium">Create New Content</span>
                </button>

                <div className="flex items-center space-x-3">
                    <div className="relative w-72">
                        <input
                            type="text"
                            placeholder="Search content by title..."
                            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                        />
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                        <FaFilter className="w-3 h-3 text-purple-600" />
                        <span className="text-sm">Filter</span>
                    </button>
                </div>
            </div>

            {/* Content Data Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Category</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Author</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">Date</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {items.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.author}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusPill status={item.status} /></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-3">
                                        <button title="Edit" className="text-purple-600 hover:text-purple-900"><FaEdit className="w-4 h-4" /></button>
                                        <button title="Delete" className="text-red-600 hover:text-red-900"><FaTrash className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// --- 2. MAIN EXPORTED VIEW COMPONENT ---

const AdminContentManagement: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-1">Admin / Content Management</div>
        <h1 className="text-3xl font-semibold text-purple-600">Contents</h1>
      </div>

      {/* ⬅️ NOW USING MOCK_CONTENT from lib/data */}
      <ContentList items={MOCK_CONTENT} />
    </div>
  );
};

export default AdminContentManagement;
// components/views/AdminUserManagement.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { FaSearch, FaFilter, FaTrash, FaPencilAlt, FaPlus, FaAngleDown, FaTimes } from 'react-icons/fa';
import AddCounselorForm from './AddCounselorForm'; 
import EditCounselorForm from './EditCounselorForm'; 
import DeleteCounselorForm from './DeleteCounselorForm'; // Import the new delete modal


// ===================================
// 1. MOCK DATA AND TYPES
// ===================================
type UserStatus = 'Active' | 'Inactive';

interface User {
    id: number;
    email: string;
    college: string; 
    status: UserStatus;
}

interface CounselorData extends User {
    firstName: string;
    lastName: string;
    birthdate: string;
    startingShift: string;
    endingShift: string;
    collegeAssignment: string;
}

type Student = User;

const COLLEGE_ACRONYMS: string[] = [
    'CLAS', 'CHK', 'IOA', 'IIHS', 'IAD', 'CBFS', 'CCSE', 'CCAPS', 'CAL', 'COE', 'COED', 'COL', 'COM', 'CON', 'COP', 'COPA', 'CST', 'COS'
];

// Mock Student Data (Simplified)
const MOCK_STUDENTS: Student[] = [
    { id: 1, email: 'johndelacruz@umake.edu.ph', college: 'COS', status: 'Active' },
    { id: 2, email: 'isabella.cruz@umake.edu.ph', college: 'CLAS', status: 'Active' },
    { id: 3, email: 'ramon.villanueva@umake.edu.ph', college: 'IOA', status: 'Active' },
    { id: 4, email: 'clarisse.delarosa@umake.edu.ph', college: 'CBFS', status: 'Inactive' },
    { id: 5, email: 'miguel.santos@umake.edu.ph', college: 'COE', status: 'Active' },
];

// Mock Counselor Data (Full fields for editing)
const INITIAL_COUNSELORS_DATA: CounselorData[] = [
    { 
        id: 101, email: 'john.doe@umake.edu.ph', college: 'CLAS', status: 'Active',
        firstName: 'John', lastName: 'Doe', birthdate: '1985-05-20',
        startingShift: '08:00', endingShift: '17:00', collegeAssignment: 'CLAS'
    },
    { 
        id: 102, email: 'jane.smith@umake.edu.ph', college: 'CBFS', status: 'Active',
        firstName: 'Jane', lastName: 'Smith', birthdate: '1990-11-15',
        startingShift: '09:00', endingShift: '18:00', collegeAssignment: 'CBFS'
    },
    { 
        id: 103, email: 'albert.lee@umake.edu.ph', college: 'IOA', status: 'Inactive',
        firstName: 'Albert', lastName: 'Lee', birthdate: '1975-01-01',
        startingShift: '07:00', endingShift: '16:00', collegeAssignment: 'IOA'
    },
];


// ===================================
// 2. Sub-components (Filter Dropdowns)
// (Content omitted for brevity, assumed functional)
// ===================================

interface CollegeFilterDropdownProps {
    selectedCollege: string | null;
    onSelect: (college: string | null) => void;
}

const CollegeFilterDropdown: React.FC<CollegeFilterDropdownProps> = ({ selectedCollege, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedCollege || "Select Department"}
                <FaAngleDown className="-mr-1 ml-2 h-4 w-4" />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <button
                            onClick={() => { onSelect(null); setIsOpen(false); }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            All Departments
                        </button>
                        {COLLEGE_ACRONYMS.map(college => (
                            <button
                                key={college}
                                onClick={() => { onSelect(college); setIsOpen(false); }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                {college}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

interface StatusFilterDropdownProps {
    selectedStatus: UserStatus | null;
    onSelect: (status: UserStatus | null) => void;
}

const StatusFilterDropdown: React.FC<StatusFilterDropdownProps> = ({ selectedStatus, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                className="inline-flex justify-center items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaFilter className="h-4 w-4 mr-2" />
                {selectedStatus || "Status"}
                <FaAngleDown className="-mr-1 ml-2 h-4 w-4" />
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <button
                            onClick={() => { onSelect(null); setIsOpen(false); }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                            All Statuses
                        </button>
                        <button
                            onClick={() => { onSelect('Active'); setIsOpen(false); }}
                            className="block w-full text-left px-4 py-2 text-sm text-teal-700 hover:bg-teal-50"
                        >
                            Active
                        </button>
                        <button
                            onClick={() => { onSelect('Inactive'); setIsOpen(false); }}
                            className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                        >
                            Inactive
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};


// ===================================
// 3. UserTable Component (Updated with onDeleteCounselor)
// ===================================

interface UserTableProps {
    data: User[];
    type: 'Students' | 'Counselors';
    selectedCollegeFilter: string | null; 
    setCollegeFilter: (college: string | null) => void;
    selectedStatusFilter: UserStatus | null;
    setStatusFilter: (status: UserStatus | null) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    onAddNewCounselor: () => void;
    onEditCounselor: (counselor: User) => void;
    onDeleteCounselor: (counselorId: number, counselorEmail: string) => void; // New prop
}

const UserTable: React.FC<UserTableProps> = ({ 
    data, 
    type, 
    selectedCollegeFilter, 
    setCollegeFilter,
    selectedStatusFilter, 
    setStatusFilter,
    searchQuery, 
    setSearchQuery,
    onAddNewCounselor,
    onEditCounselor,
    onDeleteCounselor // Destructure new prop
}) => {
    const isStudent = type === 'Students';
    const normalizedQuery = searchQuery.toLowerCase().trim();

    const filteredData = useMemo(() => {
        return data.filter(user => {
            if (isStudent && selectedCollegeFilter && user.college !== selectedCollegeFilter) {
                return false;
            }
            if (selectedStatusFilter && user.status !== selectedStatusFilter) {
                return false;
            }
            if (normalizedQuery.length > 0) {
                const matchesEmail = user.email.toLowerCase().includes(normalizedQuery);
                const matchesCollege = user.college.toLowerCase().includes(normalizedQuery);
                
                if (!matchesEmail && !matchesCollege) {
                    return false;
                }
            }
            return true;
        });
    }, [data, isStudent, selectedCollegeFilter, selectedStatusFilter, normalizedQuery]);
    
    return (
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <div className="flex justify-between items-center mb-6">
                
                {/* Search Bar */}
                <div className="relative w-full max-w-lg mr-4 flex-grow">
                    <input
                        type="text"
                        placeholder="Search by Email or College"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-purple-600"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
                
                <div className="flex space-x-2">
                    {/* Add New Counselor Button */}
                    {!isStudent && (
                        <button 
                            onClick={onAddNewCounselor} 
                            className="flex items-center px-4 py-2 text-sm text-white font-medium bg-purple-800 rounded-lg hover:bg-purple-700 transition duration-150"
                        >
                            <FaPlus className="w-3 h-3 mr-2" /> Add New Counselor
                        </button>
                    )}
                    {/* College Filter (Only visible for Students) */}
                    {isStudent && (
                        <CollegeFilterDropdown 
                            selectedCollege={selectedCollegeFilter}
                            onSelect={setCollegeFilter}
                        />
                    )}
                    {/* Status Filter */}
                    <StatusFilterDropdown 
                        selectedStatus={selectedStatusFilter}
                        onSelect={setStatusFilter}
                    />
                </div>
            </div>

            {/* Table Structure */}
            <div className="overflow-x-auto" style={{ maxHeight: 'calc(100vh - 300px)' }}>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sticky top-0 bg-white">
                            <th className="px-6 py-3">EMAIL</th>
                            <th className="px-6 py-3">COLLEGE</th> 
                            <th className="px-6 py-3">STATUS</th>
                            {!isStudent && <th className="px-6 py-3 text-right">ACTION</th>}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredData.map((user) => (
                            <tr key={user.id} className="text-sm text-gray-700 hover:bg-purple-50">
                                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {user.college} 
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span 
                                        className={`px-3 py-1 rounded-full text-xs font-medium 
                                            ${user.status === 'Active' 
                                                ? 'bg-teal-100 text-teal-800' 
                                                : 'bg-red-100 text-red-800'
                                            }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                {!isStudent && (
                                    <td className="px-6 py-4 whitespace-nowrap text-right space-x-3">
                                        <button 
                                            title="Edit" 
                                            onClick={() => onEditCounselor(user)} 
                                            className="text-purple-600 hover:text-purple-800 transition"
                                        >
                                            <FaPencilAlt className="w-4 h-4" />
                                        </button>
                                        <button 
                                            title="Delete" 
                                            onClick={() => onDeleteCounselor(user.id, user.email)} // Call new handler
                                            className="text-red-600 hover:text-red-800 transition"
                                        >
                                            <FaTrash className="w-4 h-4" />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredData.length === 0 && (
                    <div className="text-center py-10 text-gray-500">
                        No {type.toLowerCase()} found for the current search and filters.
                    </div>
                )}
            </div>
        </div>
    );
};


// ===================================
// 4. Main Exported Component
// ===================================

const AdminUserManagement: React.FC = () => {
    const [counselorsData, setCounselorsData] = useState<CounselorData[]>(INITIAL_COUNSELORS_DATA);
    const [counselorToEdit, setCounselorToEdit] = useState<CounselorData | null>(null);
    const [counselorToDelete, setCounselorToDelete] = useState<{ id: number, email: string } | null>(null); // New state for delete modal
    const [activeView, setActiveView] = useState<'Students' | 'Counselors' | 'AddCounselor'>('Students'); 
    const [selectedCollegeFilter, setSelectedCollegeFilter] = useState<string | null>(null);
    const [selectedStatusFilter, setSelectedStatusFilter] = useState<UserStatus | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>(''); 

    // --- View/State Handlers ---

    const resetView = (view: 'Students' | 'Counselors') => {
        setActiveView(view);
        setCounselorToEdit(null); 
        setCounselorToDelete(null); // Ensure delete modal is closed on view change
        setSelectedCollegeFilter(null); 
        setSelectedStatusFilter(null);
        setSearchQuery('');
    };
    
    const handleSetActiveView = (view: 'Students' | 'Counselors' | 'AddCounselor') => {
        if (view !== 'AddCounselor') {
            resetView(view);
        } else {
            setActiveView(view);
            setCounselorToEdit(null); 
            setCounselorToDelete(null);
        }
    };
    
    const handleEditCounselor = (user: User) => {
        const fullCounselorData = counselorsData.find(c => c.id === user.id);
        if (fullCounselorData) {
            setCounselorToEdit(fullCounselorData);
        }
    };
    
    // Handler to open the Delete Modal
    const handleDeleteCounselorClick = (id: number, email: string) => {
        setCounselorToDelete({ id, email });
    };

    // Handler to confirm and execute deletion
    const handleConfirmDelete = () => {
        if (counselorToDelete) {
            setCounselorsData(prevData => prevData.filter(c => c.id !== counselorToDelete.id));
            console.log(`Counselor ID ${counselorToDelete.id} (${counselorToDelete.email}) Deleted (simulated)!`);
        }
        setCounselorToDelete(null); // Close the modal
    };
    
    const handleUpdateCounselor = (id: number, updatedFields: Partial<CounselorData>) => {
        setCounselorsData(prevData =>
            prevData.map(counselor => 
                counselor.id === id ? { ...counselor, ...updatedFields, college: updatedFields.collegeAssignment || counselor.college } : counselor
            )
        );
        console.log(`Counselor ID ${id} Updated (simulated)!`);
        resetView('Counselors');
    };

    const handleCreateCounselor = (formData: any) => {
        const newId = Math.max(...counselorsData.map(c => c.id), 100) + 1;
        const newCounselor: CounselorData = { 
            id: newId, 
            status: 'Active', 
            email: formData.email, 
            college: formData.collegeAssignment,
            ...formData
        };
        setCounselorsData(prevData => [...prevData, newCounselor]);
        console.log('Counselor Created (simulated)!');
        resetView('Counselors'); 
    };

    // --- Rendering Helpers ---

    const getButtonStyle = (view: 'Students' | 'Counselors') => 
        view === activeView
            ? 'px-4 py-2 text-white font-semibold bg-purple-800 rounded-lg shadow-md transition duration-200'
            : 'px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200';

    const getPageTitle = () => {
        if (counselorToEdit) return "Update Counselor";
        if (activeView === 'AddCounselor') return "New Counselor";
        return activeView;
    };
    
    // isListView is true only when viewing the Students or Counselors table (and not the forms/modals)
    const isListView = activeView !== 'AddCounselor' && !counselorToEdit && !counselorToDelete;

    return (
        <div className="p-6">
            
            {/* Page Header and Breadcrumbs */}
            <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">
                    Admin / User Management 
                    {(activeView === 'AddCounselor' || counselorToEdit) && <span className="text-gray-900"> / {getPageTitle()}</span>}
                </div>
                
                {/* Title and Toggle Buttons */}
                <div className="flex items-center justify-start gap-4">
                    <h1 className="text-4xl font-bold text-purple-800">
                        {getPageTitle()}
                    </h1>
                    
                    {/* Toggle buttons are only shown in the list view */}
                    {isListView && (
                        <div className="flex space-x-2 bg-gray-200 p-1 rounded-lg">
                            <button
                                onClick={() => handleSetActiveView('Students')}
                                className={getButtonStyle('Students')}
                            >
                                Students
                            </button>
                            <button
                                onClick={() => handleSetActiveView('Counselors')}
                                className={getButtonStyle('Counselors')}
                            >
                                Counselors
                            </button>
                        </div>
                    )}
                </div>

                {/* Filter Tags (Only displayed in List View) */}
                {isListView && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {selectedCollegeFilter && activeView === 'Students' && (
                            <div className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                <span>College: {selectedCollegeFilter}</span>
                                <button onClick={() => setSelectedCollegeFilter(null)} title="Clear Filter" className="text-purple-600 hover:text-purple-900">
                                    <FaTimes className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                        {selectedStatusFilter && (
                            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                                selectedStatusFilter === 'Active' ? 'bg-teal-100 text-teal-800' : 'bg-red-100 text-red-800'
                            }`}>
                                <span>Status: {selectedStatusFilter}</span>
                                <button onClick={() => setSelectedStatusFilter(null)} title="Clear Status Filter" className={` ${selectedStatusFilter === 'Active' ? 'text-teal-600' : 'text-red-600'} hover:text-opacity-80`}>
                                <FaTimes className="w-3 h-3" />
                            </button>
                        </div>
                        )}
                    </div>
                )}
            </div>

            {/* Main Content Area: Conditional Rendering */}
            {counselorToEdit ? ( 
                // 1. EDIT COUNSELOR FORM
                <EditCounselorForm
                    initialData={counselorToEdit}
                    onCancel={() => resetView('Counselors')}
                    onUpdate={handleUpdateCounselor}
                />
            ) : activeView === 'AddCounselor' ? ( 
                // 2. ADD COUNSELOR FORM
                <AddCounselorForm 
                    onCancel={() => resetView('Counselors')} 
                    onCreate={handleCreateCounselor} 
                />
            ) : activeView === 'Students' ? ( 
                // 3. STUDENTS LIST
                <UserTable 
                    data={MOCK_STUDENTS} 
                    type="Students" 
                    selectedCollegeFilter={selectedCollegeFilter}
                    setCollegeFilter={setSelectedCollegeFilter}
                    selectedStatusFilter={selectedStatusFilter}
                    setStatusFilter={setSelectedStatusFilter}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onAddNewCounselor={() => {}} 
                    onEditCounselor={() => {}} 
                    onDeleteCounselor={() => {}} // No delete functionality for students in this scope
                />
            ) : ( // activeView === 'Counselors'
                // 4. COUNSELORS LIST
                <UserTable 
                    data={counselorsData} 
                    type="Counselors"
                    selectedCollegeFilter={null}
                    setCollegeFilter={() => {}} 
                    selectedStatusFilter={selectedStatusFilter}
                    setStatusFilter={setSelectedStatusFilter}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onAddNewCounselor={() => handleSetActiveView('AddCounselor')} 
                    onEditCounselor={handleEditCounselor} 
                    onDeleteCounselor={handleDeleteCounselorClick} // Pass the handler
                />
            )}

            {/* 5. DELETE COUNSELOR MODAL (Renders on top if state is set) */}
            {counselorToDelete && (
                <DeleteCounselorForm
                    counselorEmail={counselorToDelete.email}
                    onCancel={() => setCounselorToDelete(null)}
                    onConfirmDelete={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default AdminUserManagement;
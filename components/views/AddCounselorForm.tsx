// components/views/AddCounselorForm.tsx
import React, { useState } from 'react';
import { FaCalendarAlt, FaInfoCircle, FaAngleDown } from 'react-icons/fa';

// List of all college acronyms available for the dropdown filter
const COLLEGE_ACRONYMS: string[] = [
    'CLAS', 'CHK', 'IOA', 'IIHS', 'IAD', 'CBFS', 'CCSE', 'CCAPS', 'CAL', 'COE', 'COED', 'COL', 'COM', 'CON', 'COP', 'COPA', 'CST', 'COS'
];

interface AddCounselorFormProps {
    onCancel: () => void;
    onCreate: (formData: any) => void; 
}

const AddCounselorForm: React.FC<AddCounselorFormProps> = ({ onCancel, onCreate }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthdate: '',
        startingShift: '',
        endingShift: '',
        collegeAssignment: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Creating Counselor with data:', formData);
        onCreate(formData);
    };

    return (
        <div className="p-8 bg-white rounded-xl shadow-md mt-6 w-full"> 
            <form onSubmit={handleSubmit}>
                
                {/* Profile Picture Placeholder */}
                <div className="mb-8"> 
                    <div className="w-40 h-40 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center text-gray-400 text-xs">
                        Profile Picture
                    </div>
                </div>

                {/* All form fields stacked vertically */}
                <div className="flex flex-col gap-4"> 
                    
                    {/* First Name */}
                    <div className='mb-2'> 
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm h-10 px-3 py-2 placeholder-gray-400"
                        />
                    </div>
                    
                    {/* Last Name */}
                    <div className='mb-2'>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm h-10 px-3 py-2 placeholder-gray-400"
                        />
                    </div>
                    
                    {/* Email Address */}
                    <div className='mb-4'> 
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter First Name (e.g. JohnDeleCruz@umake.edu.ph)"
                            value={formData.email}
                            onChange={handleChange}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm h-10 px-3 py-2 placeholder-gray-400"
                        />
                    </div>

                    {/* Birthdate - FIX APPLIED: Uses type="date" directly for better UX */}
                    <div className='mb-4'> 
                        <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700 mb-1">Birthdate</label>
                        <div className="relative">
                            <input
                                type="date" // Using type="date" is the standard and most accessible way
                                id="birthdate"
                                name="birthdate"
                                value={formData.birthdate}
                                onChange={handleChange}
                                // Remove any custom onFocus/onBlur logic to rely on native date picker
                                className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm h-10 text-gray-700"
                            />
                            {/* Keeping FaCalendarAlt as a placeholder icon (note: modern browsers often add their own calendar icon) */}
                            <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" /> 
                        </div>
                    </div>

                    {/* Work Shift (Starts & Ends) */}
                    <div className='mb-4'> 
                        <div className="grid grid-cols-2 gap-4"> 
                            {/* Start Shift */}
                            <div>
                                <label htmlFor="startingShift" className="block text-sm font-medium text-gray-700 mb-1">Work Shift</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        id="startingShift"
                                        name="startingShift"
                                        placeholder="Starting Shift"
                                        value={formData.startingShift}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm h-10 placeholder-gray-400"
                                    />
                                    <FaInfoCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" title="Shift start time" />
                                </div>
                            </div>
                            {/* End Shift */}
                            <div>
                                <label htmlFor="endingShift" className="block text-sm font-medium text-gray-700 mb-1">Ends</label>
                                <div className="relative">
                                    <input
                                        type="time"
                                        id="endingShift"
                                        name="endingShift"
                                        value={formData.endingShift}
                                        onChange={handleChange}
                                        className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 pr-10 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm h-10 placeholder-gray-400"
                                    />
                                    <FaInfoCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" title="Shift end time" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* College Assignment */}
                    <div className='mb-4'>
                        <label htmlFor="collegeAssignment" className="block text-sm font-medium text-gray-700 mb-1">College Assigned</label>
                        <div className="relative">
                            <select
                                id="collegeAssignment"
                                name="collegeAssignment"
                                value={formData.collegeAssignment}
                                onChange={handleChange}
                                className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 pr-10 appearance-none focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm h-10 text-gray-700"
                            >
                                <option value="" disabled className="text-gray-400">Select A College Department</option>
                                <option value="COS, CBFS">COS, CBFS</option> 
                                {COLLEGE_ACRONYMS.filter(c => c !== "COS" && c !== "CBFS").map(college => (
                                    <option key={college} value={college} className="text-gray-900">{college}</option>
                                ))}
                            </select>
                            <FaAngleDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none w-4 h-4" />
                        </div>
                    </div>
                </div>


                {/* Action Buttons */}
                <div className="mt-10 flex gap-4"> 
                    <button 
                        type="button" 
                        onClick={onCancel} 
                        className="flex-1 px-8 py-3 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 transition duration-200 shadow-md"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit" 
                        className="flex-1 px-8 py-3 rounded-xl font-semibold text-white bg-purple-800 hover:bg-purple-700 transition duration-200 shadow-md"
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCounselorForm;
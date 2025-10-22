// components/views/DeleteCounselorForm.tsx
import React from 'react';
import { FaTimesCircle } from 'react-icons/fa'; // Using FaTimesCircle for the 'X' icon in the image

interface DeleteCounselorFormProps {
    counselorEmail: string; // To display which counselor is being deleted
    onCancel: () => void;
    onConfirmDelete: () => void;
}

const DeleteCounselorForm: React.FC<DeleteCounselorFormProps> = ({ counselorEmail, onCancel, onConfirmDelete }) => {
    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-auto transform scale-100 opacity-100 transition-all duration-300 ease-out">
                <div className="flex flex-col items-center justify-center text-center">
                    {/* Red 'X' Icon */}
                    <FaTimesCircle className="text-red-500 text-6xl mb-6" /> 

                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Delete Counselor?</h2>
                    
                    <p className="text-gray-600 mb-6 text-sm">
                        Are you sure you want to delete this counselor's account? Once it's gone, you won't be able to get it
                        back. Please make sure you really want to remove it before continuing.
                    </p>

                    {/* Warning Message */}
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-8 w-full text-left">
                        <span className="block sm:inline">
                            Warning: This counselor's account will be permanently deleted.
                        </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between gap-4 w-full">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="flex-1 px-8 py-3 rounded-xl font-semibold text-white bg-purple-800 hover:bg-purple-700 transition duration-200 shadow-md"
                        >
                            Go Back
                        </button>
                        <button
                            type="button"
                            onClick={onConfirmDelete}
                            className="flex-1 px-8 py-3 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 transition duration-200 shadow-md"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteCounselorForm;
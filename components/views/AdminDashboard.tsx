// components/views/AdminDashboard.tsx
'use client';

import React, { useState } from 'react';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { FaFilter, FaAngleDown } from 'react-icons/fa';
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement,
  LineElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { MOCK_CONSULTATION_STATS, MOCK_DONUT_DATA, MOCK_ENGAGEMENT_DATA, COLLEGE_LIST } from '../../lib/data'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Title, Tooltip, Legend, Filler);

// --- 1. INTERNAL UI COMPONENTS ---

interface DashboardCardProps {
  title?: string;
  children: React.ReactNode;
  headerContent?: React.ReactNode;
  fullWidth?: boolean;
}
const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, headerContent, fullWidth = false }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${fullWidth ? 'lg:col-span-3' : ''}`}>
      {(title || headerContent) && (
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          {title && <h2 className="text-lg font-semibold text-gray-800">{title}</h2>}
          {headerContent}
        </div>
      )}
      {children}
    </div>
  );
};

// College Dropdown Component
const CollegeDropdown: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedCollege, setSelectedCollege] = useState('Select College');

    const handleSelect = (college: string) => {
        setSelectedCollege(college);
        setIsOpen(false);
        // Placeholder for filtering logic
        console.log('Selected College:', college); 
    };

    return (
        <div className="relative">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-1 px-3 py-1 text-sm bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-150"
            >
                <span className="text-sm">{selectedCollege}</span> 
                <FaAngleDown className={`w-3 h-3 ml-1 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-xl z-50">
                    <div className="py-1">
                        {COLLEGE_LIST.map((college) => (
                            <div 
                                key={college}
                                onClick={() => handleSelect(college)}
                                className={`px-4 py-2 text-sm cursor-pointer hover:bg-purple-50 hover:text-purple-700 ${
                                    selectedCollege === college ? 'bg-purple-100 text-purple-800 font-medium' : 'text-gray-700'
                                }`}
                            >
                                {college}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


// Time Filter Dropdown Component
const TimeFilterDropdown: React.FC = () => {
    const timeOptions = ['Daily', 'Weekly', 'Monthly'];
    const [isOpen, setIsOpen] = useState(false);
    // Default filter is 'Daily' as requested
    const [selectedTime, setSelectedTime] = useState('Daily');

    const handleSelect = (time: string) => {
        setSelectedTime(time);
        setIsOpen(false);
        // Placeholder for filter logic
        console.log('Selected Time Filter:', time); 
    };

    return (
        <div className="relative">
            {/* The main Filter button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center px-3 py-1 text-sm bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-150"
            >
                <FaFilter className="w-3 h-3 text-purple-600 mr-1" /> 
                Filter: <span className="font-medium ml-1">{selectedTime}</span>
            </button>
            
            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-lg shadow-xl z-50">
                    <div className="py-1">
                        {timeOptions.map((time) => (
                            <div 
                                key={time}
                                onClick={() => handleSelect(time)}
                                className={`px-4 py-2 text-sm cursor-pointer hover:bg-purple-50 hover:text-purple-700 ${
                                    selectedTime === time ? 'bg-purple-100 text-purple-800 font-medium' : 'text-gray-700'
                                }`}
                            >
                                {time}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};


const BarChartComponent: React.FC = () => {
  const data = {
    labels: MOCK_CONSULTATION_STATS.map(s => s.day),
    datasets: [{
        data: MOCK_CONSULTATION_STATS.map(s => s.count),
        backgroundColor: '#4c1d95', 
        borderRadius: 8,
        barThickness: 30, 
        maxBarThickness: 40,
      },
    ],
  };
  const options = { 
    responsive: true, 
    maintainAspectRatio: false, 
    plugins: { legend: { display: false } }, 
    scales: { 
      y: { 
        beginAtZero: true, 
        grid: { color: '#e5e7eb' },
        ticks: { 
            stepSize: 200, 
            min: 0,
            max: 1200,
        }, 
      }, 
      x: { 
        grid: { display: false } 
      } 
    } 
  };
  return <Bar data={data} options={options} />;
};


const DonutChartComponent: React.FC = () => {
    const data = {
        labels: MOCK_DONUT_DATA.labels,
        datasets: [{
            data: MOCK_DONUT_DATA.data,
            backgroundColor: [
                '#0a0833', 
                '#4c1d95', 
                '#2dd4bf', 
                '#f97316', 
            ], 
            hoverOffset: 4,
            borderWidth: 0, 
        }],
      };
      const options = { responsive: true, maintainAspectRatio: false, cutout: '65%', plugins: { legend: { display: false } } };
    
      return (
        <div className="relative h-64 w-full flex flex-col items-center justify-center">
          <div className="relative w-56 h-56 flex items-center justify-center"> 
            <Doughnut data={data} options={options} />
            <div className="absolute text-4xl font-bold text-gray-800">
              20
            </div>
          </div>
          
          {/* Custom Legend */}
          <div className="mt-4 text-xs flex flex-wrap justify-center gap-x-4 gap-y-2">
            {MOCK_DONUT_DATA.labels.map((label, index) => (
                <span key={index} className="inline-flex items-center">
                    <span className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: data.datasets[0].backgroundColor[index] }}></span>
                    {label === 'Tuning' ? 'Thriving' : label} 
                </span>
            ))}
          </div>
        </div>
      );
}; // Correctly terminated


const LineChartComponent: React.FC = () => {
  const data = {
    labels: MOCK_ENGAGEMENT_DATA.map(d => d.label),
    datasets: [{
        label: 'Students',
        data: MOCK_ENGAGEMENT_DATA.map(d => d.value),
        borderColor: '#4c1d95', 
        backgroundColor: 'rgba(76, 29, 149, 0.2)',
        fill: 'start', 
        tension: 0.4, 
        
        pointRadius: 0, 
        pointHitRadius: 10,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: '#4c1d95', 
        pointHoverBorderColor: 'white',
        pointHoverBorderWidth: 2,
    }],
  };
  
  const options = { 
    responsive: true, 
    maintainAspectRatio: false, 
    plugins: { 
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: '#4c1d95', 
        titleColor: 'white',
        bodyColor: 'white',
        padding: 10,
        cornerRadius: 4,
        displayColors: false, 
        caretSize: 8,
        caretPadding: 10,
        
        callbacks: {
            title: () => '', 
            label: function(context: any) {
                return `${context.parsed.y} Students`;
            }
        },
      }
    }, 
    scales: { 
      y: { 
        beginAtZero: true, 
        grid: { color: '#e5e7eb' },
        ticks: { 
            stepSize: 200, 
            min: 0,
            max: 1200,
        }, 
      }, 
      x: { 
        grid: { display: false } 
      } 
    } 
  };
  return <Line data={data} options={options} />;
};


// --- 2. MAIN EXPORTED VIEW COMPONENT ---

const AdminDashboard: React.FC = () => {
  return (
    <div className="pb-6">
      <div className="mb-8">
        <div className="text-sm text-gray-500 mb-1">Admin / Dashboard</div>
        <h1 className="text-3xl font-bold text-gray-800">Welcome, Sir John Doe!</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CGCS Consultation Statistics (Bar Chart) - WIDER (2/3 width) */}
        <div className="lg:col-span-2"> 
            <DashboardCard title="CGCS Consultation Statistics">
                <div className="h-64">
                    <BarChartComponent />
                </div>
            </DashboardCard>
        </div>

        {/* Students Classification (Donut Chart) - NARROWER (1/3 width) */}
        <div className="lg:col-span-1 relative">
            {/* Filters positioned ABSOLUTELY to sit above the card */}
            <div className="absolute -top-14 right-0 flex space-x-2 z-10">
                <CollegeDropdown /> 
                
                {/* Implemented Time Filter Dropdown */}
                <TimeFilterDropdown />
            </div>
            
            <DashboardCard title="Students Classification">
              <DonutChartComponent />
            </DashboardCard>
        </div>

        {/* Student Engagement (Line Chart) - Takes full width on the next row */}
        <div className="lg:col-span-3">
            <DashboardCard title="Student Engagement" fullWidth>
              <div className="h-64">
                <LineChartComponent />
              </div>
            </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
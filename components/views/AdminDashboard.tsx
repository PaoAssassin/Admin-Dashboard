'use client';

import React, { useState } from 'react';
import { FaFilter, FaAngleDown } from 'react-icons/fa';
import { BarChart, LineChart, PieChart } from '@mui/x-charts';
import { pieArcClasses, ChartsTextStyle } from '@mui/x-charts';
import { COLLEGE_LIST, DASHBOARD_DATASETS } from '../../lib/data';

// --- Dashboard Card Component ---
interface DashboardCardProps {
  title?: string;
  children: React.ReactNode;
  headerContent?: React.ReactNode;
}
const DashboardCard: React.FC<DashboardCardProps> = ({ title, children, headerContent }) => (
  <div className="bg-white rounded-xl shadow-md p-4 h-full">
    {(title || headerContent) && (
      <div className="flex justify-between items-center mb-3 px-2">
        {title && <h2 className="text-lg font-semibold text-gray-800 text-left">{title}</h2>}
        {headerContent && <div className="flex-shrink-0">{headerContent}</div>}
      </div>
    )}
    <div className="px-1">{children}</div>
  </div>
);

// --- College Dropdown ---
interface CollegeDropdownProps {
  selected: string;
  onChange: (college: string) => void;
}
const CollegeDropdown: React.FC<CollegeDropdownProps> = ({ selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-1 text-sm bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
      >
        <span>{selected}</span>
        <FaAngleDown className={`w-3 h-3 ml-1 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-xl">
          <div className="py-1">
            {COLLEGE_LIST.map((college) => (
              <div
                key={college}
                onClick={() => {
                  onChange(college);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-purple-50 hover:text-purple-700 ${
                  selected === college ? 'bg-purple-100 text-purple-800 font-medium' : 'text-gray-700'
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

// --- Time Filter Dropdown (Weekly/Monthly only) ---
interface TimeFilterDropdownProps {
  selected: 'Weekly' | 'Monthly';
  onChange: (time: 'Weekly' | 'Monthly') => void;
}
const TimeFilterDropdown: React.FC<TimeFilterDropdownProps> = ({ selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeOptions: ('Weekly' | 'Monthly')[] = ['Weekly', 'Monthly'];

  return (
    <div className="relative z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-3 py-1 text-sm bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
      >
        <FaFilter className="w-3 h-3 text-gray-400 mr-1" />
        <span className="font-medium ml-1">{selected}</span>
        <FaAngleDown className={`w-3 h-3 ml-1 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-lg shadow-xl">
          <div className="py-1">
            {timeOptions.map((time) => (
              <div
                key={time}
                onClick={() => {
                  onChange(time);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-purple-50 hover:text-purple-700 ${
                  selected === time ? 'bg-purple-100 text-purple-800 font-medium' : 'text-gray-700'
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

// --- Bar Chart Component ---
interface BarChartComponentProps {
  data: { day?: string; month?: string; count: number }[];
}
const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => {
  const chartData = data.map((item) => item.count);
  const labels = data.map((item) => item.day ?? item.month ?? '');

  return (
    <BarChart
      height={340}
      xAxis={[{ scaleType: 'band', data: labels, label: 'Time' }]}
      yAxis={[{ min: 0, max: Math.max(...chartData) + 200, label: 'Count' }]}
      series={[{ data: chartData, label: 'Consultations', color: '#4c1d95' }]}
      slotProps={{
        bar: { rx: 8 },
      }}
    />
  );
};

// --- Donut Chart Component ---
interface DonutChartComponentProps {
  data: { labels: string[]; data: number[] };
}
const DonutChartComponent: React.FC<DonutChartComponentProps> = ({ data }) => {
  const colors = ['#0a0833', '#4c1d95', '#2dd4bf', '#f97316'];
  const chartData = data.labels.map((label, index) => ({
    id: index,
    label,
    value: data.data[index],
    color: colors[index % colors.length],
  }));
  const total = data.data.reduce((acc, val) => acc + val, 0);

  return (
    <div className="flex flex-col items-center justify-center relative group">
      <PieChart
        height={300}
        width={450}
        series={[
          {
            data: chartData,
            innerRadius: 100,
            outerRadius: 120,
            paddingAngle: 4,
            cornerRadius: 1,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 100, additionalRadius: 10 },
          },
        ]}
        slotProps={{
          legend: { hidden: true },
        }}
        sx={{
          [`& .${pieArcClasses.faded}`]: { fill: '#e5e7eb' },
          '& .MuiChartsArcLabel-root': {
            opacity: 0,
            transition: 'opacity 0.18s ease',
            fill: '#fff',
            fontWeight: 600,
          },
          '.MuiChartsArc-root:hover .MuiChartsArcLabel-root': { opacity: 1 },
        }}
      />

      {/* Center label */}
      <div className="absolute left-1/2 top-[45%] -translate-x-1/2 -translate-y-1/2 text-4xl font-bold text-gray-800">
        {total}
      </div>

      {/* Custom legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {chartData.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <span
              aria-hidden
              style={{
                backgroundColor: item.color,
                width: 14,
                height: 14,
                display: 'inline-block',
                borderRadius: 1,
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
              }}
            />
            <span className="text-sm text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Line Chart Component ---
interface LineChartComponentProps {
  data: { label: string; value: number }[];
}
const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => {
  const labels = data.map((d) => d.label);
  const values = data.map((d) => d.value);
  const axisTextStyle: ChartsTextStyle = { fill: '#4b5563', fontSize: 12 };

  return (
    <LineChart
      height={256}
      xAxis={[{ data: labels, scaleType: 'point', tickLabelStyle: axisTextStyle }]}
      yAxis={[{ min: 0, max: Math.max(...values) + 200, tickLabelStyle: axisTextStyle }]}
      series={[
        {
          data: values,
          area: true,
          showMark: false,
          color: '#4c1d95',
          label: 'Engagement',
        },
      ]}
    />
  );
};

// --- AdminDashboard ---
const AdminDashboard: React.FC = () => {
  const [selectedCollege, setSelectedCollege] = useState<string>(COLLEGE_LIST[0]);
  const [selectedTime, setSelectedTime] = useState<'Weekly' | 'Monthly'>('Weekly');

  // Fetch filtered datasets
  const dataset = DASHBOARD_DATASETS[selectedCollege][selectedTime];

  return (
    <div className="pt-1">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="text-sm text-gray-500 mb-1">Admin / Dashboard</p>
          <h1 className="text-3xl font-bold text-purple-700">Welcome, Sir John Doe!</h1>
        </div>
        <div className="flex space-x-3 mt-15">
          <CollegeDropdown selected={selectedCollege} onChange={setSelectedCollege} />
          <TimeFilterDropdown selected={selectedTime} onChange={setSelectedTime} />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 h-[450px]">
          <DashboardCard title="CGCS Consultation Statistics">
            <div className="h-full flex items-center justify-center pt-4">
              <BarChartComponent data={dataset.consultation} />
            </div>
          </DashboardCard>
        </div>

        <div className="lg:col-span-2 h-[450px]">
          <DashboardCard title="Students Classification">
            <div className="h-full flex items-center justify-center">
              <DonutChartComponent data={dataset.donut} />
            </div>
          </DashboardCard>
        </div>

        <div className="lg:col-span-5">
          <DashboardCard title="Student Engagement">
            <div className="h-[256px]">
              <LineChartComponent data={dataset.engagement} />
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

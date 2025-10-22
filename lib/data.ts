// lib/data.ts

// --- 1. TYPE DEFINITIONS ---

// For AdminUserManagement.tsx
export type StudentStatus = 'Active' | 'Inactive';
export interface Student {
  id: number;
  email: string;
  college: string;
  status: StudentStatus;
}

// For AdminContentManagement.tsx
export type ContentStatus = 'Published' | 'Draft' | 'Archived';
export interface ContentItem {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  status: ContentStatus;
}

// For AdminDashboard.tsx
export interface ConsultationStat {
  day: string;
  count: number;
}
export interface DonutData {
    labels: string[];
    data: number[];
    backgroundColors: string[];
}
// ⬅️ NEW: Data type for the Line Chart
export interface EngagementDataPoint {
    label: string;
    value: number;
}


// --- 2. MOCK DATA EXPORTS ---

// Data for AdminDashboard.tsx
export const MOCK_CONSULTATION_STATS: ConsultationStat[] = [
  { day: 'Mon', count: 950 },
  { day: 'Tue', count: 500 },
  { day: 'Wed', count: 680 },
  { day: 'Thu', count: 550 },
  { day: 'Fri', count: 1150 },
];

export const MOCK_DONUT_DATA: DonutData = {
    labels: ['In-Class', 'Struggling', 'Excelling', 'Tuning'],
    data: [30, 15, 25, 30],
    backgroundColors: ['#0a0833', '#4c1d95', '#2dd4bf', '#f97316'],
};

// ⬅️ NEW: Data for the Line Chart (based on the visible shape in the image)
export const MOCK_ENGAGEMENT_DATA: EngagementDataPoint[] = [
    { label: 'Mon', value: 450 },
    { label: 'Tue', value: 720 },
    { label: 'Wed', value: 300 }, // Lowest point, matching the image data structure
    { label: 'Thu', value: 1050 },
    { label: 'Fri', value: 1000 },
];

// Data for AdminUserManagement.tsx
export const MOCK_STUDENTS: Student[] = [
    { id: 1, email: 'johndelacruz@umake.edu.ph', college: 'COS', status: 'Active' },
    { id: 2, email: 'isabella.cruz@umake.edu.ph', college: 'COS', status: 'Active' },
    { id: 3, email: 'ramon.villanueva@umake.edu.ph', college: 'COS', status: 'Active' },
    { id: 4, email: 'clarisse.delarosa@umake.edu.ph', college: 'COS', status: 'Active' },
    { id: 5, email: 'miguel.santos@umake.edu.ph', college: 'COS', status: 'Active' },
    { id: 6, email: 'jasmine.mercado@umake.edu.ph', college: 'COS', status: 'Active' },
    { id: 7, email: 'adrian.bautista@umake.edu.ph', college: 'COS', status: 'Inactive' },
    ...Array(15).fill(0).map((_, i) => ({
        id: 10 + i, 
        email: `adrian.bautista${i}@umake.edu.ph`, 
        college: 'COS', 
        status: (i % 5 === 0 ? 'Inactive' : 'Active') as StudentStatus
    }))
] as Student[];

// Data for AdminContentManagement.tsx
export const MOCK_CONTENT: ContentItem[] = [
  { id: 1, title: 'Tips for a Productive Study Session', category: 'Guidance', author: 'Sir John Doe', date: '2025-10-15', status: 'Published' },
  { id: 2, title: 'Upcoming Student Events Calendar', category: 'Events', author: 'Admin Team', date: '2025-10-10', status: 'Published' },
  { id: 3, title: 'Mental Health Awareness - Part 2', category: 'Wellness', author: 'Dr. Jane Smith', date: '2025-10-01', status: 'Draft' },
  { id: 4, title: 'College Application Deadlines Q&A', category: 'Admissions', author: 'Sir John Doe', date: '2025-09-28', status: 'Published' },
  { id: 5, title: 'Archived Tutorial: Using the Library', category: 'Tutorial', author: 'Librarian', date: '2025-09-15', status: 'Archived' },
];

export const COLLEGE_LIST: string[] = [
    'College of Liberal Arts and Sciences (CLAS)',
    'College of Human Kinetics (CHK)',
    'Institute of Accountancy (IOA)',
    'Institute of Imaging Health Science (IIHS)',
    'Institute of Arts and Design (IAD)',
    'College of Business and Financial Science (CBFS)',
    'College of Construction Sciences and Engineering (CCSE)',
    'College of Continuing, Advanced, and Professional Studies (CCAPS)',
    'College of Arts and Letters (CAL)',
    'College of Engineering (COE)',
    'College of Education (COED)',
    'College of Law (COL)',
    'College of Medicine (COM)',
    'College of Nursing (CON)',
    'College of Pharmacy (COP)',
    'College of Public Administration (COPA)',
    'College of Science and Technology (CST)',
];
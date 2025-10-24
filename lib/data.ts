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
  day?: string;
  month?: string;
  count: number;
}
export interface DonutData {
  labels: string[];
  data: number[];
}
export interface EngagementDataPoint {
  label: string;
  value: number;
}

// --- 2. MOCK DATA EXPORTS ---

// Students
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
];

// Content
export const MOCK_CONTENT: ContentItem[] = [
  { id: 1, title: 'Tips for a Productive Study Session', category: 'Guidance', author: 'Sir John Doe', date: '2025-10-15', status: 'Published' },
  { id: 2, title: 'Upcoming Student Events Calendar', category: 'Events', author: 'Admin Team', date: '2025-10-10', status: 'Published' },
  { id: 3, title: 'Mental Health Awareness - Part 2', category: 'Wellness', author: 'Dr. Jane Smith', date: '2025-10-01', status: 'Draft' },
  { id: 4, title: 'College Application Deadlines Q&A', category: 'Admissions', author: 'Sir John Doe', date: '2025-09-28', status: 'Published' },
  { id: 5, title: 'Archived Tutorial: Using the Library', category: 'Tutorial', author: 'Librarian', date: '2025-09-15', status: 'Archived' },
];

// College list (acronyms only)
export const COLLEGE_LIST: string[] = [
  'CLAS','CHK','IOA','IIHS','IAD','CBFS','CCSE','CCAPS','CAL','COE','COED','COL','COM','CON','COP','COPA','CST'
];

// --- 3. DASHBOARD DATASETS (Weekly & Monthly per College) ---
export const DASHBOARD_DATASETS: Record<string, {
  Weekly: {
    consultation: ConsultationStat[];
    engagement: EngagementDataPoint[];
    donut: DonutData;
  };
  Monthly: {
    consultation: ConsultationStat[];
    engagement: EngagementDataPoint[];
    donut: DonutData;
  };
}> = {};

// Utility function to generate placeholder monthly data
const generateMonthlyCounts = () => Array.from({length: 12}, (_, i) => ({ month: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i], count: 500 + i*50 }));
const generateMonthlyEngagement = () => Array.from({length: 12}, (_, i) => ({ label: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i], value: 400 + i*50 }));

COLLEGE_LIST.forEach(college => {
  DASHBOARD_DATASETS[college] = {
    Weekly: {
      consultation: [
        { day: 'Mon', count: 950 },
        { day: 'Tue', count: 500 },
        { day: 'Wed', count: 680 },
        { day: 'Thu', count: 550 },
        { day: 'Fri', count: 1150 },
      ],
      engagement: [
        { label: 'Mon', value: 450 },
        { label: 'Tue', value: 720 },
        { label: 'Wed', value: 300 },
        { label: 'Thu', value: 1050 },
        { label: 'Fri', value: 1000 },
      ],
      donut: {
        labels: ['In-Class','Struggling','Excelling','Tuning'],
        data: [30,15,25,30],
      }
    },
    Monthly: {
      consultation: generateMonthlyCounts(),
      engagement: generateMonthlyEngagement(),
      donut: {
        labels: ['In-Class','Struggling','Excelling','Tuning'],
        data: [300,150,250,300],
      }
    }
  };
});

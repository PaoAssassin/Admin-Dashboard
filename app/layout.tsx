// app/layout.tsx
import './globals.css';
import Sidebar from '../components/layout/Sidebar';
import Header from '../components/layout/Header';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Admin Dashboard',
  description: 'University Admin Panel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen bg-gray-100">
          
          {/* 1. Sidebar (Fixed) */}
          <Sidebar />
          
          <div className="flex-1 flex flex-col ml-20"> {/* ml-20 matches sidebar width */}
            
            {/* 2. Header (Sticky) */}
            <Header />
            
            {/* 3. Main Content */}
            <main className="flex-1 p-6 overflow-y-auto">
              {children}
            </main>
            
          </div>
        </div>
      </body>
    </html>
  );
}
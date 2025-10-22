// app/students/page.tsx
import React from 'react';
import AdminUserManagement from '@/components/views/AdminUserManagement';

/**
 * Renders the Students User Management page.
 * * In the App Router structure, this file serves as the page component for the /students route.
 * It primarily delegates rendering to the AdminUserManagement view component.
 */
export default function StudentsRoutePage() {
  return (
    <AdminUserManagement />
  );
}
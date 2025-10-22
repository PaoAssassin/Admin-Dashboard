// app/contents/page.tsx
import React from 'react';
// app/contents/page.tsx (Using Alias)
import AdminContentManagement from '@/components/views/AdminContentManagement';
/**
 * Renders the Content Management page.
 * * In the App Router structure, this file serves as the page component for the /contents route.
 * It primarily delegates rendering to the AdminContentManagement view component.
 */
export default function ContentsRoutePage() {
  return (
    <AdminContentManagement />
  );
}
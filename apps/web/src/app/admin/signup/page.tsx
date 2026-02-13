import { Suspense } from 'react';
import { AdminAuthForm } from '@/features/admin/AdminAuthForm';

export default function AdminSignupPage() {
  return (
    <Suspense fallback={null}>
      <AdminAuthForm mode="signup" />
    </Suspense>
  );
}

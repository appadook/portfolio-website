import { Suspense } from 'react';
import { AdminAuthForm } from '@/features/admin/AdminAuthForm';

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <AdminAuthForm mode="login" />
    </Suspense>
  );
}

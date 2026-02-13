import { redirect } from 'next/navigation';
import AdminDashboard from '@/features/admin/AdminDashboard';
import { getValidatedAdminSession } from '@/lib/auth/server';

export default async function AdminPage() {
  const session = await getValidatedAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  return <AdminDashboard user={session.user} />;
}

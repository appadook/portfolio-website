import type { ReactNode } from 'react';
import { AdminProviders } from '@/components/providers/AdminProviders';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="admin-font-scope">
      <AdminProviders>{children}</AdminProviders>
    </div>
  );
}

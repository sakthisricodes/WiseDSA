import { getAuthenticatedUser } from '@/lib/auth';
import { Shell } from '@/components/layout/Shell';

export default async function DashboardGroupLayout({ children }) {
  const user = await getAuthenticatedUser();
  return <Shell user={user}>{children}</Shell>;
}

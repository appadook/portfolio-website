import PortfolioPage from '@/features/public/PortfolioPage';
import { getPortfolioSnapshot } from '@/lib/server/portfolioData';

export const revalidate = 60;

export default async function HomePage() {
  const snapshot = await getPortfolioSnapshot();
  return <PortfolioPage snapshot={snapshot} />;
}

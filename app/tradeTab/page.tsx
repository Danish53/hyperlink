
import Chart from '@/components/Chart/Chart';
import { headers } from 'next/headers';
import { auth } from '../../lib/auth';
import TradeDrawer from '@/components/TradeTabCom';

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <TradeDrawer session={session} />
    </>
  );
}

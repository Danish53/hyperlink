
import Chart from '@/components/Chart/Chart';
import { headers } from 'next/headers';
import { auth } from '../../lib/auth';

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <>
      <Chart session={session} />
    </>
  );
}

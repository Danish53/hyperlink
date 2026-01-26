import Account from '@/components/Account/Account';

import { headers } from 'next/headers';
import { auth } from '../../lib/auth';
export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div>
      <Account session={session} />
    </div>
  );
}

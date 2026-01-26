import Deposit from '@/components/Account/Deposit';
import { headers } from 'next/headers';
import { auth } from '../../../lib/auth';
import AccountPage from '@/components/Account/Deposit';

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div>
      {/*
      <AccountPage session={session} />

      */}

      <Deposit session={session} />
    </div>
  );
}

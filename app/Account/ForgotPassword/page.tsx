import ForgotPassword from '@/components/Account/ForgotPassword';

import { headers } from 'next/headers';
import { auth } from '../../../lib/auth';

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div>
      <ForgotPassword session={session} />
    </div>
  );
}

import Support from '@/components/Support/Support';

import { headers } from 'next/headers';
import { auth } from '../../lib/auth';

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div>
      <Support session={session} />
    </div>
  );
}

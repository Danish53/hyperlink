import Faq from '@/components/Faq/Faq';

import { headers } from 'next/headers';
import { auth } from '../../lib/auth';

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <div>
      <Faq session={session} />
    </div>
  );
}

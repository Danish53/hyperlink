import Home from '@/components/home/home';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="">
      <Home session={session} />
    </div>
  );
}

/*
import Home from '@/components/home/home';

const page = () => {
  return (
    <div className="dark-theme">
      <Home />
    </div>
  );
};

export default page;
*/

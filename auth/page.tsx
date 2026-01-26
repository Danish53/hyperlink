/*


import { auth } from '../lib/auth';
import AuthClientPage from './auth-client';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AuthPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect('/Dashboard');
  }

  return <AuthClientPage />;
}
*/

import React from 'react';

const page = () => {
  return <div>page</div>;
};

export default page;

'use client'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { handleSignOut } from '@/src/server/actions';

function SignOut() {
  const router = useRouter();

  const signOutAndRedirect = async () => {
    await handleSignOut();
    router.push('/');
  };

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      await signOutAndRedirect();
    }}>
      <Button type="submit">Sign out</Button>
    </form>
  )
}

export default SignOut

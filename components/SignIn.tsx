'use client'
import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { handleSignIn } from '@/src/server/actions'

export function SignIn({ title }: { title?: string }) {
  const router = useRouter();

  const signInAndRedirect = async () => {
    await handleSignIn();
  };

  return (
    <form onSubmit={async (e) => {
      e.preventDefault();
      await signInAndRedirect();
      if (title === 'home' ) {
        router.push('/dashboard/all-tasks');
      }
    }}>
      <Button type="submit">Signin with Google</Button>
    </form>
  );
}

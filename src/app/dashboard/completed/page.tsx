'use client'
import { auth } from '@/auth';
import { SignIn } from '@/components/SignIn';
import SignOut from '@/components/SignOut';
import TaskBox from '@/components/TaskBox'
import React, { useState } from 'react'

const page = () => {
  const [refresh, setRefresh] = useState(false);
  const [status, setStatus] = useState('all');

  return (
       <TaskBox title='Complete Task'  status={status} setStatus={setStatus} />
  )
}

export default page
'use client'
import TaskBox from '@/components/TaskBox'
import React, { useState } from 'react'

const page = () => {
  const [status, setStatus] = useState('all');

  return (
       <TaskBox title='Complete Task'  status={status} setStatus={setStatus} />
  )
}

export default page
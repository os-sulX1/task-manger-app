'use client'
import TaskBox from '@/components/TaskBox'
import React, { useState } from 'react'

const AllTask = () => {
  const [status, setStatus] = useState('all');
  return (
   <TaskBox title='All Task'  status={status} setStatus={setStatus}/>
  )
}

export default AllTask
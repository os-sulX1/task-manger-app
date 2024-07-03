'use client'
import TaskBox from '@/components/TaskBox'
import React, { useState } from 'react'

const completedTask = () => {
  const [status, setStatus] = useState('all');

  return (
       <TaskBox title='Complete Task'  status={status} setStatus={setStatus} />
  )
}

export default completedTask
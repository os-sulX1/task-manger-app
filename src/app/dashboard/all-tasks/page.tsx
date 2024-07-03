'use client';
import TaskBox from '@/components/TaskBox';
import React, { useState } from 'react';

const AllTask = () => {
  const [status, setStatus] = useState('all');
  const [refresh, setRefresh] = useState(''); 

  return (
    <TaskBox 
      title='All Task' 
      status={status} 
      setStatus={setStatus} 
      refresh={refresh} 
      setRefresh={setRefresh} 
    />
  );
}

export default AllTask;

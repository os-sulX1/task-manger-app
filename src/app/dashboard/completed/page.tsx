'use client';
import TaskBox from '@/components/TaskBox';
import React, { useState } from 'react';

const CompletedTask = () => {
 // Directly set the status
  const [status, setStatus] = useState('complete');
  const [refresh, setRefresh] = useState(''); 

  return (
    <TaskBox 
      title='Complete Task' 
      status={status} 
      setStatus={setStatus} 
      refresh={''} 
      setRefresh={() => {}} 
    />
  );
}

export default CompletedTask;

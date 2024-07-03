'use client';
import TaskBox from '@/components/TaskBox';
import React from 'react';

const CompletedTask = () => {
  const status = 'complete'; // Directly set the status

  return (
    <TaskBox 
      title='Complete Task' 
      status={status} 
      setStatus={() => {}} // Pass a dummy function if setStatus is required
      refresh={''} // Provide necessary default or dummy value
      setRefresh={() => {}} // Pass a dummy function if setRefresh is required
    />
  );
}

export default CompletedTask;

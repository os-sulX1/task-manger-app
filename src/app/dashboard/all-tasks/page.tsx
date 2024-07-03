'use client';
import TaskBox from '@/components/TaskBox';
import React, { useState } from 'react';

const AllTask = () => {
 
  const status = 'complete'; // Directly set the status

  return (
    <TaskBox 
      title='All Task' 
      status={status} 
      setStatus={() => {}} // Pass a dummy function if setStatus is required
      refresh={''} // Provide necessary default or dummy value
      setRefresh={() => {}} // Pass a dummy function if setRefresh is required
    />
  );
}

export default AllTask;

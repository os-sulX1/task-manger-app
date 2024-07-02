'use client';
import React, { useState, useEffect } from 'react';

import EmptyState from './EmptyState';
import { getAllTasks, getTaskBySearch } from '@/src/server/actions';
import TaskCard from './TaskCard';

const GridCard = ({ refresh, status, title  }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (title === 'Complete Task') {
          // If title is 'Complete Task', set items to an empty array
         // setItems([]);
         data = await getTaskBySearch({ title: 'complete' });

        } else if (status === 'all' || status === '') {
          data = await getAllTasks();
        } else if (status === 'complete') {
          data = await getTaskBySearch({ title: 'complete' });
        } else if (status === 'incomplete') {
          data = await getTaskBySearch({ title: 'incomplete' });
        } else {
          throw new Error('Invalid status');
        }
        // Only set items if data is fetched successfully
        if (data) {
          setItems(data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [refresh, status, title]); // Re-fetch data when refresh, status, or title changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      {items.length === 0 && <EmptyState />} {/* Display EmptyState when no items */}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mx-11">
        {items.map((item) => (
          <TaskCard
            key={item.id}
            title={item.title as string}
            description={item.description}
            headerTitle={title}
            taskId={item.id}
            status={item.status}
            updateAt={item.updated_at}
          />
        ))}
      </div>
    </>
  );
};

export default GridCard;

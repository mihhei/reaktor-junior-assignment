import React, { useState, useEffect, useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';

export const GetUpdate = ({ lastDate }) => {
  const { request } = useHttp();
  const [update, setUpdate] = useState('');

  const checkHandler = useCallback(async () => {
    try {
      const fetched = await request('/update', 'GET', null);
      if (fetched !== lastDate) {
        setUpdate('update available');
      }
    } catch (e) {
      setUpdate('server no answer');
    }
  }, [request, setUpdate, lastDate]);

  useEffect(() => {
    const timer = setInterval(checkHandler, 30000);
    return () => {
      clearInterval(timer);
    };
  }, [checkHandler]);

  if (update) {
    return <div style={{ opacity: '0.6' }}>{update}</div>;
  }

  return <div style={{ visibility: 'hidden' }}>update available</div>;
};

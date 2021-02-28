import React, { useState, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/loader';
import { OutputList } from './outputlist';
import { Error } from '../components/error';

export const DataOutput = ({ item }) => {
  const [actualItem, setActualItem] = useState();
  const [data, setData] = useState();
  const [serverError, setServerError] = useState('');
  const { request } = useHttp();

  const fetch = useCallback(async () => {
    try {
      const fetched = await request('/data', 'GET', null);
      const fetchedParse = JSON.parse(fetched);
      if (
        !Object.keys(fetchedParse).length ||
        !Object.keys(fetchedParse.items).length ||
        !Object.keys(fetchedParse.manufacturers).length
      ) {
        setServerError(
          'incorrect data from server, probably server not running yet'
        );
      } else {
        setData(fetchedParse);
      }
    } catch (e) {
      setServerError('server no answer');
    }
  }, [request]);

  useEffect(() => {
    setData('');
    fetch();
    setActualItem(item);
    return () => {
      setData('');
      setServerError('');
    };
  }, [fetch, item]);

  const getNewData = () => {
    setData('');
    setServerError('');
    fetch();
  };

  if (serverError) {
    return <Error error={serverError} reload={getNewData} />;
  }

  if (!data) {
    return <Loader />;
  }

  return <OutputList data={data} item={actualItem} reload={getNewData} />;
};

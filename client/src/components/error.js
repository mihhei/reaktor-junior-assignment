import React from 'react';
import { GetUpdate } from './getupdate';

export const Error = ({ error, reload }) => {
  return (
    <div className="center">
      <div style={{ padding: '1rem' }}>{error}</div>
      <button
        className="btn grey lighten-1 black-text"
        onClick={reload.bind(null)}
      >
        Reload
      </button>
      <GetUpdate lastDate={''} />
    </div>
  );
};

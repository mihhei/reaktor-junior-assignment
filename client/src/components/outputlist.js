import React from 'react';
import { GetUpdate } from '../components/getupdate';

export const OutputList = ({ data, item, reload }) => {
  if (!data.items[item].length) {
    return (
      <div className="center" style={{ padding: '1rem' }}>
        No data for {item} from server, try later
      </div>
    );
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>{item.toUpperCase()}</th>
            <th>Last update {data.update}</th>
            <th>
              <GetUpdate lastDate={data.update} />
            </th>
            <th>
              <button
                className="btn grey lighten-1 black-text"
                onClick={reload.bind(null)}
              >
                Reload
              </button>
            </th>
          </tr>
        </thead>
      </table>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Manufacturer</th>
            <th>Info</th>
          </tr>
        </thead>

        <tbody>
          {data.items[item].map((item, index) => {
            if (!data.manufacturers[item.manufacturer]) {
              console.log(item.manufacturer, data);
            }
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>{item.manufacturer}</td>
                <td>{data.manufacturers[item.manufacturer][item.id]}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

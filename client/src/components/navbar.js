import React from 'react';
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="navbar-fixed">
      <nav>
        <div
          className="nav-wrapper blue darken-1"
          style={{ padding: '0 2rem' }}
        >
          <span className="brand-logo">Your Clothes Inc</span>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <NavLink to="/beanies">Beanies</NavLink>
            </li>
            <li>
              <NavLink to="/gloves">Gloves</NavLink>
            </li>
            <li>
              <NavLink to="/facemasks">Facemasks</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

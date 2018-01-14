import React from 'react';
import { NavLink } from 'react-router-dom';

import './PrimaryNavigation.css'

export default () => (
  <nav className="PrimaryNavigation">
    <h1 className="PrimaryNavigation-logo">Car Catalog</h1>
    <div className="PrimaryNavigation-links">
      <NavLink exact className="PrimaryNavigation-link"
        activeClassName="active"
        to="/">Home</NavLink>
      <NavLink className="PrimaryNavigation-link"
        activeClassName="active"
        to="/search">Search</NavLink>
    </div>
  </nav>
)

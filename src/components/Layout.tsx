import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Layout
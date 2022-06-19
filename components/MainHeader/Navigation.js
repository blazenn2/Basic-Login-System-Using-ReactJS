import React from 'react';
import { useNoteContext } from '../../context/nodes/NodeContext';

import classes from './Navigation.module.css';

const Navigation = () => {
  const ctx = useNoteContext();

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.ctx.isLoggedIn && (
          <li>
            <button onClick={ctx.logout.logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;

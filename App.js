import React, { useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import { useNoteContext } from './context/nodes/NodeContext';

function App() {
  const ctx = useNoteContext();

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('ctx.ctx.isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      ctx.func.setIsLoggedIn(true);
    }
  });

  return (
    <React.Fragment>
      <MainHeader onLogout={ctx.logout.logoutHandler} />
      <main>
        {!ctx.ctx.isLoggedIn && <Login />}
        {ctx.ctx.isLoggedIn && <Home />}
      </main>
    </React.Fragment>
  );
}

export default App;

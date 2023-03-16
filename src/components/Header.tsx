import React, { memo } from 'react';
import logo from '../styles/images/logo.svg';

export const Header = memo(() => {
  return (
    <header className="header">
      <div className="header__content">
        <a className="header__logo" href="/#">
          <img src={logo} alt="logo of the cat" />
        </a>

        <nav className="nav">
          <button type="button" className="btn">Users</button>

          <button type="button" className="btn">Sign up</button>
        </nav>
      </div>
    </header>
  );
});

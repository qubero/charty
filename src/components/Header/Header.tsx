import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';

const Header = React.memo(() => {
  return (
    <header>
      <Link to={ROUTES.VIEW}>View</Link>
      <Link to={ROUTES.SETTINGS}>Settings</Link>
    </header>
  );
});

export default Header;

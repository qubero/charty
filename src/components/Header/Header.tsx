import { memo } from 'react';
import { ROUTES } from '../../routes';
import { NavLink } from '../ui';

const Header = () => {
  return (
    <header>
      <nav>
        <ul className="flex justify-center my-4 font-medium md:space-x-8 text-center">
          <li className="w-28 p-2 md:p-4">
            <NavLink to={ROUTES.VIEW} className="p-2 md:p-4">
              View
            </NavLink>
          </li>
          <li className="w-28 p-2 md:p-4">
            <NavLink to={ROUTES.SETTINGS} className="p-2 md:p-4">
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const MemoizedHeader = memo(Header);

export default MemoizedHeader;

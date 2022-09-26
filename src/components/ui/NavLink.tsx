import { Link, useMatch, LinkProps } from 'react-router-dom';

type NavLinkProps = LinkProps & React.RefAttributes<HTMLAnchorElement>;

const NavLink = (props: NavLinkProps) => {
  const { to, children, className, ...rest } = props;
  const isMatch = useMatch(String(to));

  return (
    <Link
      to={to}
      className={`${isMatch ? 'text-blue-600' : 'text-gray-700'} ${className}`}
      {...(isMatch ? { 'aria-current': 'page' } : {})}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default NavLink;

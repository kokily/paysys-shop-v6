import type { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import './NavItem.scss';

interface Props extends PropsWithChildren {
  href?: string;
  onClick?: () => void;
}

function NavItem({ href, onClick, children }: Props) {
  const jsx = (
    <div className="nav-item-box" onClick={onClick}>
      {children}
    </div>
  );

  return href ? (
    <Link to={href} className="nav-item-container" onClick={onClick}>
      {jsx}
    </Link>
  ) : (
    jsx
  );
}

export default NavItem;

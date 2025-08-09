import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import './NavItem.scss';

interface Props extends PropsWithChildren {
  href?: string;
  onClick?: () => void;
}

function NavItem({ href, onClick, children }: Props) {
  const jsx = <div className="item-box" onClick={onClick}>{children}</div>

  return href ? (
    <Link to={href} className="item-container">
      {jsx}
    </Link>
  ) : (
    jsx
  );
};

export default NavItem;
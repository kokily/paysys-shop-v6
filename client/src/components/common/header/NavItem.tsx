import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { clearItems, clearScrollY, setDivide, setNative, setSearch } from "@/store/slices/itemSlice";
import { clearUsers, clearScrollY as clearScrollYuser, setSearch as setSearchUser  } from "@/store/slices/userSlice";
import './NavItem.scss';

interface Props extends PropsWithChildren {
  href?: string;
  onClick?: () => void;
}

function NavItem({ href, onClick, children }: Props) {
  const dispatch = useAppDispatch();
  const jsx = <div className="item-box" onClick={onClick}>{children}</div>

  const handleClick = () => {
    if (href === '/items') {
      dispatch(clearItems());
      dispatch(clearScrollY());
      dispatch(setSearch(''));
      dispatch(setDivide(''));
      dispatch(setNative(''));
    } else if (href === '/users') {
      dispatch(clearUsers());
      dispatch(clearScrollYuser());
      dispatch(setSearchUser(''));
    }
  }

  return href ? (
    <Link to={href} className="item-container" onClick={handleClick}>
      {jsx}
    </Link>
  ) : (
    jsx
  );
};

export default NavItem;
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeMenu, toggleMenu } from "@/store/slices/headerSlice";
import Logo from "./Logo";
import Apeach from "./Apeach";
import './Header.scss';
import NavList from "./NavList";

function Header() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { menuOpen } = useAppSelector((state) => state.header);
  const location = useLocation();
  const link = location.pathname.substring(1);

  const menuRef = useOutsideClick<HTMLDivElement>(() => {
    dispatch(closeMenu());
  });

  const handleToggleMenu = useCallback(() => {
    dispatch(toggleMenu());
  }, [dispatch]);

  return (
    <div className="header-container">
      <div className="header-layout">
        <div className="header-content">
          <Logo link={link} />

          <div className="header-spacer" />

          {user && (
            <>
              <div ref={menuRef}>
                <Apeach onClick={handleToggleMenu} />
                <NavList />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header;
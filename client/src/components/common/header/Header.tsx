import { useHeader } from '../../../libs/hooks/useHeader';
import Apeach from './Apeach';
import './Header.scss';
import Logo from './Logo';
import NavList from './NavList';

function Header() {
  const { link, user, menuRef, onToggleMenu } = useHeader();

  return (
    <header className="header-container">
      <div className="header-layout">
        <div className="header-contents">
          <Logo link={link} />

          <div className="header-spacer" />

          {user && (
            <>
              <div ref={menuRef}>
                <Apeach onClick={onToggleMenu} />
                <NavList />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

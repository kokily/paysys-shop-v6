import { useNavigation } from '../../../libs/hooks/useNavigation';
import NavItem from './NavItem';
import './NavList.scss';

function NavList() {
  const { menuOpen, user, onCloseMenu, onLogout } = useNavigation();

  return (
    <div className={`nav-list-container ${menuOpen && 'open'}`} onClick={onCloseMenu}>
      <div className="nav-list-wrapper">
        {menuOpen && (
          <>
            <NavItem href="/password">비밀번호 변경</NavItem>

            {user?.admin && (
              <>
                <div className="nav-list-split" />

                <NavItem href="/weddings">웨딩빌지</NavItem>
                <NavItem href="/items">품목 리스트</NavItem>

                <div className="nav-list-split" />

                <NavItem href="/users">사용자 리스트</NavItem>

                <div className="nav-list-split" />
              </>
            )}

            <NavItem onClick={onLogout}>로그아웃</NavItem>
          </>
        )}
      </div>
    </div>
  );
}

export default NavList;

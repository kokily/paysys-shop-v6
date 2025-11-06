import { showToast } from '../../../libs/data/showToast';
import { useNavigation } from '../../../libs/hooks/useNavigation';
import { useAppDispatch } from '../../../store/hooks';
import { clearItemForm, clearItems, clearScrollY as clearItemScrollY } from '../../../store/slices/itemSlice';
import {
  clearCurrentUser,
  clearScrollY as clearUserScrollY,
  clearUsers,
} from '../../../store/slices/userSlice';
import {
  clearCurrentWedding,
  clearScrollY as clearWeddingScrollY,
  clearWeddingForm,
  clearWeddings,
} from '../../../store/slices/weddingSlice';
import NavItem from './NavItem';
import './NavList.scss';

function NavList() {
  const dispatch = useAppDispatch();
  const { menuOpen, user, onCloseMenu, onLogout } = useNavigation();

  const onWeddingClick = () => {
    dispatch(clearWeddingForm());
    dispatch(clearWeddings());
    dispatch(clearCurrentWedding());
    dispatch(clearWeddingScrollY());
  };

  const onItemClick = () => {
    dispatch(clearItemForm());
    dispatch(clearItems());
    dispatch(clearItemScrollY());
  };

  const onUserClick = () => {
    dispatch(clearUsers());
    dispatch(clearCurrentUser());
    dispatch(clearUserScrollY());
  };

  const onForceHardReload = async () => {
    showToast.warning('1초 후 새로고침 됩니다.');
    
    // Release registered service workers
    if ('serviceWorker' in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();

      for (const registration of registrations) {
        registration.unregister();
      }
    }

    // Clear browser cache storage
    const cacheKeys = await caches.keys();

    for (const key of cacheKeys) {
      await caches.delete(key);
    }

    // Stability secured through delay effect
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className={`nav-list-container ${menuOpen && 'open'}`} onClick={onCloseMenu}>
      <div className="nav-list-wrapper">
        {menuOpen && (
          <>
            <NavItem href="/password">비밀번호 변경</NavItem>

            {user?.admin && (
              <>
                <div className="nav-list-split" />

                <NavItem href="/weddings" onClick={onWeddingClick}>
                  웨딩빌지
                </NavItem>
                <NavItem href="/items" onClick={onItemClick}>
                  품목 리스트
                </NavItem>

                <div className="nav-list-split" />

                <NavItem href="/users" onClick={onUserClick}>
                  사용자 리스트
                </NavItem>

                <div className="nav-list-split" />
              </>
            )}

            <NavItem onClick={onForceHardReload}>강려크 새로고침</NavItem>

            <NavItem onClick={onLogout}>로그아웃</NavItem>
          </>
        )}
      </div>
    </div>
  );
}

export default NavList;

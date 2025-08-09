import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logoutAsync } from '@/store/slices/authSlice';
import { showToast } from '@/utils/toast';
import { closeMenu } from '@/store/slices/headerSlice';
import NavItem from './NavItem';
import './NavList.scss';

function NavList() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { menuOpen } = useAppSelector((state) => state.header);

  const handleClose = useCallback(() => {
    dispatch(closeMenu());
  }, [dispatch]);

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutAsync()).unwrap();
      showToast.success('로그아웃');
    } catch (error) {
      showToast.error('로그아웃 실패');
    }
  }, [dispatch]);

  return (
    <div className={`nav-list ${menuOpen && 'open'}`} onClick={handleClose}>
      <div className='nav-wrapper'>
        {menuOpen && (
          <>
            <NavItem href='/password'>비밀번호 변경</NavItem>

            {user?.admin && (
              <>
                <div className='nav-split' />

                <NavItem href="/weddings">웨딩빌지</NavItem>
                <NavItem href="/items">품목 리스트</NavItem>

                <div className='nav-split' />

                <NavItem href='/users'>사용자 리스트</NavItem>

                <div className='nav-split' />
              </>
            )}
            <NavItem onClick={handleLogout}>로그아웃</NavItem>
          </>
        )}
      </div>
    </div>
  )
}

export default NavList;
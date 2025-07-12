import { useAuthStore } from '../store/authStore';
import '../styles/pages/MainPage.scss';

const MainPage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  return (
    <div className="main-page">
      <div className="main-page__header">
        <div>
          <h1 className="main-page__title">행사전표시스템</h1>
          <p className="main-page__welcome">환영합니다, {user?.username}님!</p>
        </div>
        <button 
          onClick={handleLogout}
          className="main-page__logout-btn"
        >
          로그아웃
        </button>
      </div>
      
      <div className="main-page__content">
        <p>메인 콘텐츠가 여기에 표시됩니다.</p>
      </div>
    </div>
  );
};

export default MainPage; 
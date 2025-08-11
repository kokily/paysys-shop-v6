import { useListMenu } from '@/hooks/useMenu';
import './ListMenu.scss';
import Button from '@/components/common/Button';
import MenuItem from './MenuItem';

function ListMenu() {
  const { menu, loading, error, onBack, onReadMenu } = useListMenu();

  if (error) {
    return (
      <div className="menu-error">
        <p>에러 발생: {error}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="menu-loading">
        <p>로딩 중...</p>
      </div>
    );
  };

  return (
    <div className='menu-container'>
      {menu && (
        <>
          <div className='menu-title'>
            <h2>{menu[0] && menu[0].divide}</h2>
            <Button variant='cancel' onClick={onBack}>뒤 로</Button>
          </div>

          <div className='menu-list'>
            {menu.map(item => (
              <MenuItem key={item.id} item={item} onReadItem={onReadMenu} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListMenu;
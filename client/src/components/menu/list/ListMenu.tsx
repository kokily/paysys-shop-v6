import { useListMenu } from '@/hooks/useMenu';
import './ListMenu.scss';
import Button from '@/components/common/Button';
import MenuItem from './MenuItem';

function ListMenu() {
  const { menu, onBack, onReadMenu } = useListMenu();

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
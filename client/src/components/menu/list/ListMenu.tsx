import { useListMenu } from '../../../libs/hooks/useListMenu';
import Button from '../../common/button/Button';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import './ListMenu.scss';
import MenuItem from './MenuItem';

function ListMenu() {
  const { menu, loading, error, onBack, onReadMenu } = useListMenu();

  if (error) {
    return <Error error={error} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="list-menu-container">
      {menu && (
        <>
          <div className="list-menu-title">
            <h2>{menu[0] && menu[0].divide}</h2>
            <Button variant="cancel" size="small" onClick={onBack}>
              뒤로
            </Button>
          </div>
          <div className="list-menu-list">
            {menu.map((item) => (
              <MenuItem key={item.id} item={item} onReadMenu={onReadMenu} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ListMenu;

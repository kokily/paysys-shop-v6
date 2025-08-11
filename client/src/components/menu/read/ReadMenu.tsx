import { useReadMenu } from '@/hooks/useMenu';
import './ReadMenu.scss';
import { unitOfAccount } from '@/utils/menuUtils';
import ReadMenuButton from './ReadMenuButtons';
import ReadMenuTable from './ReadMenuTable';

function ReadMenu() {
  const { menu, count, price, loading, error, onBack, onChange, onAddCart, onKeyPress } = useReadMenu();

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
    <>
      {menu && (
        <div className='read-menu-container'>
          <div className={`read-menu-logo ${menu.native}`}>
            {menu.divide} | {menu.native}
          </div>

          <div className='read-menu-content'>
            <ReadMenuTable menu={menu} price={price} onChange={onChange} />

            <hr />

            <div>
              <label htmlFor='count'>수 량</label>
              <input
                className='content-input'
                type="number"
                name="count"
                value={count}
                onChange={onChange}
                onKeyDown={onKeyPress}
                autoFocus
              />
            </div>

            <div className='content-total'>
              <h3>합계 금액:{' '}</h3>
              {menu.price === 0 ? (
                <>
                  {unitOfAccount(parseInt(price) * parseInt(count), "원")}
                </>
              ):(
                <>
                  {unitOfAccount(menu.price * parseInt(count), "원")}
                </>
              )}
            </div>

            <ReadMenuButton onAddCart={onAddCart} onBack={onBack} />
          </div>
        </div>
      )}
    </>
  );
};

export default ReadMenu;
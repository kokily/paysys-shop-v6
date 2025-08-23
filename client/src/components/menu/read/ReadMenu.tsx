import { unitOfAccount } from '../../../libs/data/utils';
import { useReadMenu } from '../../../libs/hooks/useReadMenu';
import Error from '../../common/Error';
import Loading from '../../common/Loading';
import './ReadMenu.scss';
import ReadMenuButtons from './ReadMenuButtons';
import ReadMenuTable from './ReadMenuTable';

function ReadMenu() {
  const { menu, count, price, loading, error, onBack, onChange, onAddMenu, onKeyPress } =
    useReadMenu();

  if (error) {
    return <Error code="500" message="알 수 없는 에러 발생" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {menu && (
        <div className="read-menu-container">
          <div className={`read-menu-logo ${menu.native}`}>
            {menu.divide} | {menu.native}
          </div>

          <div className="read-menu-contents">
            <ReadMenuTable menu={menu} price={price} onChange={onChange} />

            <hr />

            <div>
              <label htmlFor="count">수 량</label>
              <input
                className="read-menu-contents-input"
                type="number"
                name="count"
                value={count}
                onChange={onChange}
                onKeyDown={onKeyPress}
                autoFocus
              />
            </div>

            <div className="read-menu-contents-total">
              <h3>합계 금액: </h3>
              {menu.price === 0 ? (
                <>{unitOfAccount(parseInt(price) * parseInt(count), '원')}</>
              ) : (
                <>{unitOfAccount(menu.price * parseInt(count), '원')}</>
              )}
            </div>

            <ReadMenuButtons onBack={onBack} onAddMenu={onAddMenu} />
          </div>
        </div>
      )}
    </>
  );
}

export default ReadMenu;

import type { NativeType } from '../../types/item.types';
import { memo } from 'react';
import { useNativeMenu } from '../../libs/hooks/useNativeMenu';
import Loading from '../common/Loading';
import Error from '../common/Error';
import HomeItem from './HomeItem';
import './Home.scss';

const Home = memo(() => {
  const { menu, native, onListMenu, loading, error } = useNativeMenu();

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const renderNativeItem = (nativeType: NativeType) => {
    return menu.map((item) => (
      <HomeItem
        key={item.id}
        member={nativeType === 'member'}
        associate={nativeType === 'associate'}
        general={nativeType === 'general'}
        divide={item.divide}
        onListMenu={() => onListMenu(item.divide)}
      />
    ));
  };

  return (
    <div className="home-container">
      <div className="home-contents">
        {native === 'member' && renderNativeItem('member')}
        {native === 'associate' && renderNativeItem('associate')}
        {native === 'general' && renderNativeItem('general')}
      </div>
    </div>
  );
});

Home.displayName = 'Home';

export default Home;

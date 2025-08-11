import { useNative } from "@/hooks/useNative";
import { memo } from "react";
import NativeItem from "./NativeItem";
import './Native.scss';

const Native = memo(() => {
  const { menu, native, onMenu, loading, error } = useNative();

  if (error) {
    return (
      <div className="native-error">
        <p>에러 발생: {error}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="native-loading">
        <p>로딩 중...</p>
      </div>
    );
  }  ;

  const renderNativeItems = (nativeType: 'member' | 'associate' | 'general') => {
    return menu.map(item => (
      <NativeItem
        key={item.id}
        divide={item.divide}
        onMenu={() => onMenu(item.divide)}
        member={nativeType === 'member'}
        associate={nativeType === 'associate'}
        general={nativeType === 'general'}
      />
    ));
  };

  return (
    <div className="native-container">
      <div className="native-contents">
        {native === 'member' && renderNativeItems('member')}
        {native === 'associate' && renderNativeItems('associate')}
        {native === 'general' && renderNativeItems('general')}
      </div>
    </div>
  )
});

Native.displayName = 'Native';

export default Native;
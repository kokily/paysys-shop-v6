import { memo } from 'react';
import './HomeItem.scss';

interface Props {
  member?: boolean;
  associate?: boolean;
  general?: boolean;
  divide?: string;
  onListMenu?: () => void;
}

const HomeItem = memo(({ member, associate, general, divide, onListMenu }: Props) => {
  const getClassName = (): string => {
    const baseClass = 'home-item';

    if (member) return `${baseClass} member`;
    if (associate) return `${baseClass} associate`;
    if (general) return `${baseClass} general`;

    return baseClass;
  };

  return (
    <div className={getClassName()} onClick={onListMenu} role="button" tabIndex={0}>
      {divide}
    </div>
  );
});

HomeItem.displayName = 'HomeItem';

export default HomeItem;

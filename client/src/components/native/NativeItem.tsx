import { memo } from "react";
import './NativeItem.scss';

interface Props {
  member?: boolean;
  associate?: boolean;
  general?: boolean;
  divide?: string;
  onMenu?: () => void;
}

const NativeItem = memo(({ member, associate, general, divide, onMenu }: Props) => {
  const getClassName = (): string => {
    const baseClass = 'native-item';

    if (member) return `${baseClass} member`;
    if (associate) return `${baseClass} associate`;
    if (general) return `${baseClass} general`;

    return baseClass;
  }

  return (
    <div
      className={getClassName()}
      onClick={onMenu}
      role="button"
      tabIndex={0}
    >
      {divide}
    </div>
  );
});

NativeItem.displayName = 'NativeItem';

export default NativeItem;
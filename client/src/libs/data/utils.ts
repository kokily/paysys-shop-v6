import type { NativeLabel, NativeType } from '../../types/item.types';

export const getNativeLabel = (nativeType: NativeType): NativeLabel => {
  const nativeLabelMap: Record<NativeType, NativeLabel> = {
    member: '회원',
    associate: '준회원',
    general: '일반',
  };

  return nativeLabelMap[nativeType];
};

export const isValidNativeType = (type: string): type is NativeType => {
  return ['member', 'associate', 'general'].includes(type);
};

export function unitOfAccount(target: number, unit?: string) {
  return `${target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}${unit ?? ''}`;
}

export function unitOfDate(target: Date) {
  return new Date(target).toLocaleDateString();
}

export function unitOfTime(target: Date) {
  return new Date(target).toLocaleTimeString();
}

export function unitOfShortDate(target: Date) {
  return `'${new Date(target).toLocaleDateString().substring(2)}`;
}

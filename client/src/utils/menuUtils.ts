import type { NativeLabel, NativeType } from "@/types/menu.types";

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
}
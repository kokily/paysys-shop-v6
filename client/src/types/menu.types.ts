export type NativeType = 'member' | 'associate' | 'general';
export type NativeLabel = '회원' | '준회원' | '일반';

export interface MenuType {
  id: number;
  divide: string;
  category?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuType[];
}

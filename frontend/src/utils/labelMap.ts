export function getMemberLabel(type: string) {
  if (type === '현역') return '회원';
  if (type === '예비역') return '준회원';
  return type; // '일반' 등
} 
import type { AddWeddingRequest } from "@/types/wedding.types";

export const validateWeddingForm = (form: AddWeddingRequest): boolean => {
  const excludeFields = [
    'husband_image',
    'bride_image',
    'wedding_at',
    'meal_method',
    'present_method',
    'reserve_method',
  ];
  const inputFields = Object.entries(form).filter(
    ([key]) => !excludeFields.includes(key)
  );

  console.log('=== 폼 검증 시작 ===');
  console.log('전체 form: ', form);
  console.log('제외된 필드들: ', excludeFields);
  console.log('검사할 input 필드들: ', inputFields);

  const emptyFields = inputFields.filter(([key, value]) => {
    const isEmpty = !value || value === '';

    if (isEmpty) {
      console.log(`빈 필드 발견: ${key} = "${value}"`);
    }

    return isEmpty;
  });

  console.log('빈 필드들: ', emptyFields);
  console.log('검증 결과: ', emptyFields.length === 0);

  return emptyFields.length === 0;
}
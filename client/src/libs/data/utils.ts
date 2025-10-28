import type { NativeLabel, NativeType } from '../../types/item.types';
import type { AddWeddingPayload, ConvertedAddWedding, WeddingType } from '../../types/wedding.types';

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

const convertNumberToString = (value: any): string => {
  return typeof value === 'number' ? value.toString() : value;
};

export const convertWeddingNumberToString = (wedding: any) => {
  const converted: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(wedding)) {
    converted[key] = convertNumberToString(value);
  }
  return converted;
};

export const convertWeddingFormToAPI = (form: AddWeddingPayload): ConvertedAddWedding => {
  let husband_reserve = 0;
  let bride_reserve = 0;

  switch (form.reserve_method) {
    case 'half':
      husband_reserve = parseInt(form.reserve_price) / 2;
      bride_reserve = parseInt(form.reserve_price) / 2;
      break;
    case 'husband':
      husband_reserve = parseInt(form.reserve_price);
      bride_reserve = 0;
      break;
    case 'bride':
      husband_reserve = 0;
      bride_reserve = parseInt(form.reserve_price);
      break;
    default:
      break;
  }

  return {
    ...form,
    husband_meal: parseInt(form.husband_meal),
    husband_present: parseInt(form.husband_present),
    husband_reserve,
    husband_hall: parseInt(form.husband_hall),
    husband_sword: parseInt(form.husband_sword),
    husband_bouquet: parseInt(form.husband_bouquet),
    husband_company: parseInt(form.husband_company),
    husband_owner_woman: parseInt(form.husband_owner_woman),
    husband_owner_man: parseInt(form.husband_owner_man),
    husband_frame: parseInt(form.husband_frame),
    husband_file: parseInt(form.husband_file),
    husband_dvd: parseInt(form.husband_dvd),
    husband_etc: parseInt(form.husband_etc),
    bride_meal: parseInt(form.bride_meal),
    bride_present: parseInt(form.bride_present),
    bride_reserve,
    bride_hall: parseInt(form.bride_hall),
    bride_sword: parseInt(form.bride_sword),
    bride_bouquet: parseInt(form.bride_bouquet),
    bride_company: parseInt(form.bride_company),
    bride_owner_woman: parseInt(form.bride_owner_woman),
    bride_owner_man: parseInt(form.bride_owner_man),
    bride_frame: parseInt(form.bride_frame),
    bride_file: parseInt(form.bride_file),
    bride_dvd: parseInt(form.bride_dvd),
    bride_etc: parseInt(form.bride_etc),
    meal_price: parseInt(form.meal_price),
    present_price: parseInt(form.present_price),
    reserve_price: parseInt(form.reserve_price),
    husband_pre_deposit: parseInt(form.husband_pre_deposit),
    bride_pre_deposit: parseInt(form.bride_pre_deposit),
    wedding_at:
      typeof form.wedding_at === 'string'
        ? new Date(form.wedding_at)
        : new Date(form.wedding_at.getTime() + 9 * 60 * 60 * 1000),
  };
};

export const convertWeddingToResult = (wedding: WeddingType) => {
  const husband_cost =
    wedding.husband_hall +
    wedding.husband_sword +
    wedding.husband_bouquet +
    wedding.husband_company +
    wedding.husband_owner_woman +
    wedding.husband_owner_man +
    wedding.husband_frame +
    wedding.husband_file +
    wedding.husband_dvd +
    wedding.husband_etc;

  const bride_cost =
    wedding.bride_hall +
    wedding.bride_sword +
    wedding.bride_bouquet +
    wedding.bride_company +
    wedding.bride_owner_woman +
    wedding.bride_owner_man +
    wedding.bride_frame +
    wedding.bride_file +
    wedding.bride_dvd +
    wedding.bride_etc;

  return {
    husband_cost,
    bride_cost,
  };
};

export const convertWeddingToReserve = (wedding: WeddingType) => {
  let husband_reserve = 0;
  let bride_reserve = 0;

  switch (wedding.reserve_method) {
    case 'half':
      husband_reserve = wedding.reserve_price / 2;
      bride_reserve = wedding.reserve_price / 2;
      break;
    case 'husband':
      husband_reserve = wedding.reserve_price;
      bride_reserve = 0;
      break;
    case 'bride':
      husband_reserve = 0;
      bride_reserve = wedding.reserve_price;
      break;
    default:
      break;
  }

  return {
    husband_reserve,
    bride_reserve,
  };
};

export const convertWeddingToText = (wedding: WeddingType) => {
  let meal_method = '';
  let present_method = '';
  let reserve_method = '';

  switch (wedding.meal_method) {
    case 'privacy':
      meal_method = '각각 결제';
      break;
    case 'husband':
      meal_method = '신랑 결제';
      break;
    case 'bride':
      meal_method = '신부 결제';
      break;
    default:
      meal_method = '반반 결제';
      break;
  }

  switch (wedding.present_method) {
    case 'privacy':
      present_method = '각각 결제';
      break;
    case 'husband':
      present_method = '신랑 결제';
      break;
    case 'bride':
      present_method = '신부 결제';
      break;
    default:
      present_method = '반반 결제';
      break;
  }

  switch (wedding.reserve_method) {
    case 'half':
      reserve_method = '예약금 반반';
      break;
    case 'husband':
      reserve_method = '예약금 신랑';
      break;
    case 'bride':
      reserve_method = '예약금 신부';
      break;
    default:
      break;
  }

  return {
    meal_method,
    present_method,
    reserve_method,
  };
};

export const convertWeddingToAllCost = (wedding: WeddingType) => {
  const all_cost =
    wedding.husband_hall +
    wedding.husband_sword +
    wedding.husband_bouquet +
    wedding.husband_company +
    wedding.husband_owner_woman +
    wedding.husband_owner_man +
    wedding.husband_frame +
    wedding.husband_file +
    wedding.husband_dvd +
    wedding.husband_etc +
    wedding.bride_hall +
    wedding.bride_sword +
    wedding.bride_bouquet +
    wedding.bride_company +
    wedding.bride_owner_woman +
    wedding.bride_owner_man +
    wedding.bride_frame +
    wedding.bride_file +
    wedding.bride_dvd +
    wedding.bride_etc +
    wedding.meal_price * (wedding.husband_meal + wedding.bride_meal) +
    wedding.present_price * (wedding.husband_present + wedding.bride_present);

  const all_payment =
    all_cost - wedding.reserve_price - wedding.husband_pre_deposit - wedding.bride_pre_deposit;

  const all_meal_cost = wedding.meal_price * (wedding.husband_meal + wedding.bride_meal);
  const all_present_cost = wedding.present_price * (wedding.husband_present + wedding.bride_present);
  let husband_meal = 0;
  let bride_meal = 0;
  let husband_present = 0;
  let bride_present = 0;

  switch (wedding.meal_method) {
    case 'privacy':
      husband_meal = wedding.meal_price * wedding.husband_meal;
      bride_meal = wedding.meal_price * wedding.bride_meal;
      break;
    case 'husband':
      husband_meal = all_meal_cost;
      bride_meal = 0;
      break;
    case 'bride':
      husband_meal = 0;
      bride_meal = all_meal_cost;
      break;
    default:
      husband_meal = all_meal_cost / 2;
      bride_meal = all_meal_cost / 2;
      break;
  }

  switch (wedding.present_method) {
    case 'privacy':
      husband_present = wedding.present_price * wedding.husband_present;
      bride_present = wedding.present_price * wedding.bride_present;
      break;
    case 'husband':
      husband_present = all_present_cost;
      bride_present = 0;
      break;
    case 'bride':
      husband_present = 0;
      bride_present = all_present_cost;
      break;
    default:
      husband_present = all_present_cost / 2;
      bride_present = all_present_cost / 2;
      break;
  }

  const husband_payment =
    wedding.husband_hall +
    wedding.husband_sword +
    wedding.husband_bouquet +
    wedding.husband_company +
    wedding.husband_owner_woman +
    wedding.husband_owner_man +
    wedding.husband_frame +
    wedding.husband_file +
    wedding.husband_dvd +
    wedding.husband_etc +
    husband_meal +
    husband_present -
    wedding.husband_reserve -
    wedding.husband_pre_deposit;

  const bride_payment =
    wedding.bride_hall +
    wedding.bride_sword +
    wedding.bride_bouquet +
    wedding.bride_company +
    wedding.bride_owner_woman +
    wedding.bride_owner_man +
    wedding.bride_frame +
    wedding.bride_file +
    wedding.bride_dvd +
    wedding.bride_etc +
    bride_meal +
    bride_present -
    wedding.bride_reserve -
    wedding.bride_pre_deposit;

  return {
    all_cost,
    all_payment,
    husband_payment,
    bride_payment,
  };
};

export const validateWeddingForm = (form: AddWeddingPayload): boolean => {
  const excludeFields = ['husband_image', 'bride_image', 'husband_reserve', 'bride_reserve'];
  const inputFields = Object.entries(form).filter(([key]) => !excludeFields.includes(key));

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
};

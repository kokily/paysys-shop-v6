import type { AddWeddingRequest, ConvertedAddWedding, WeddingType } from "@/types/wedding.types";

const convertNumberToString = (value: any): string => {
  return typeof value === 'number' ? value.toString() : value;
};

export const convertWeddingNumberToString = (wedding: any) => {
  const converted: { [key: string]: any } = {};

  for (const [key, value] of Object.entries(wedding)) {
    converted[key] = convertNumberToString(value);
  }
  return converted;
}

export const convertWeddingFormToAPI = (form: AddWeddingRequest): ConvertedAddWedding => {
  return {
    ...form,
    husband_meal: parseInt(form.husband_meal),
    husband_present: parseInt(form.husband_present),
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
    wedding_at: new Date(form.wedding_at),
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
    wedding.husband_etc

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
    wedding.bride_etc

  return {
    husband_cost,
    bride_cost,
  }  
}

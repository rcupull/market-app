import { Address } from 'types/general';

const VALID_PHONE_REGEXP = /^\d{10}$/i;

export const getIsValidAddress = (address: Address | undefined): boolean => {
  const { street, number, apartment, municipality, city } = address || {};

  return Boolean(street && (number || apartment) && municipality && city);
};

export const getIsValidPhone = (phone: string | undefined): boolean => {
  if (!phone) return false;

  return VALID_PHONE_REGEXP.test(phone);
};

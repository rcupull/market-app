import { Address } from 'types/general';

const VALID_PHONE_REGEXP = /^\d{10}$/i;

export const getIsValidAddress = (address: Address | undefined): boolean => {
  const { street, number, apartment, municipality, city } = address || {};

  return Boolean(street && (number || apartment) && municipality && city);
};

/**
 * Validate if a phone is valid. Not tha the phone is require.
 * it is important keep "if (!phone) return true;"
 */
export const getIsValidPhone = (phone: string | undefined): boolean => {
  if (!phone) return true;

  return VALID_PHONE_REGEXP.test(phone);
};

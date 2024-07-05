import { Address } from 'types/general';

const VALID_PHONE_REGEXP = /^\d{10}$/i;

export const getIsValidAddress = (address: Address): boolean => {
  const { street, number, apartment, municipality, city, lat, lon, placeId } = address;

  return Boolean(street && (number || apartment) && municipality && city && lat && lon && placeId);
};

export const getIsValidPhone = (phone: string): boolean => {
  return VALID_PHONE_REGEXP.test(phone);
};

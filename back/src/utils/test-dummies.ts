import mongose from 'mongoose';
import { Address } from '../types/general';

//Business
export const objectIds = {
  obj0: new mongose.Types.ObjectId('62a23958e5a9e9b88f853a10'),
  obj1: new mongose.Types.ObjectId('62a23958e5a9e9b88f853a11'),
  obj2: new mongose.Types.ObjectId('62a23958e5a9e9b88f853a12'),
};

export const addressDummy: Address = {
  apartment: 45,
  city: 'Habana',
  municipality: 'La Lisa',
  neighborhood: 'Los Pinos',
  number: 60,
  street: 'Marrero',
  streetBetweenFrom: '56',
  streetBetweenTo: '89',
  country: 'Cuba',
  countryCode: 'asdads',
  lat: -7,
  lon: 7,
  placeId: 'asdasd',
  postCode: 'asdasda',
};

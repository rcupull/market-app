import { Business } from "../../../../types/business";
import { businessServicesGetAll } from "../../../business/services";

export const handleBusinessTag = async(tag: string, search: string): Promise<Array<Business>> => {
  if(tag.startsWith('name')){
    // search in business name
    const prefix = "name.";
    const tagWithoutPrefix = tag.substring(prefix.length);
    return handleBusinessName(tagWithoutPrefix, search);
  } 
  else if(tag.startsWith('category')){
    // search in business category
    const prefix = "category.";
    const tagWithoutPrefix = tag.substring(prefix.length);
    return handleBusinessCategory(tagWithoutPrefix, search);  
  }   
  return Promise.resolve([]);
}

const handleBusinessName = async(tag: string, search: string): Promise<Array<Business>> => {
  // search in business name
  const name = tag.split('.')[0];
  const businesses = await businessServicesGetAll({ query: { name: { $regex: name, $options: 'i' } } });
  return businesses;
}

const handleBusinessCategory = async(tag: string, search: string): Promise<Array<Business>> => {
  // search in business category
  const name = tag.split('.')[0];
  const businesses = await businessServicesGetAll({ query: { category: { $regex: name, $options: 'i' } } });
  return businesses;
}
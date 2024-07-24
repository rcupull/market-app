import { Post } from "../../../../types/post";
import { postServicesGetAll } from "../../../post/services";

export const handlePriceTag = async (tag: string, search: string): Promise<Array<Post>> => {
  if(tag.startsWith('max')){
    // search in max
    const prefix = "max.";
    const tagWithoutPrefix = tag.substring(prefix.length);
    return await handleMaxTag(tagWithoutPrefix, search);
  }
  else if(tag.startsWith('min')){
    // search in min
    const prefix = "min.";
    const tagWithoutPrefix = tag.substring(prefix.length);
    return await handleMinTag(tagWithoutPrefix, search);
  }
  else if(tag.startsWith('min.max')){
    // search in min.max
    const prefix = "min.max.";
    const tagWithoutPrefix = tag.substring(prefix.length);
    return await handleMinMaxTag(tagWithoutPrefix, search);
  }
  return [];
}

const handleMaxTag = async (tag: string, search: string): Promise<Array<Post>> => {
  const match = search.match(/\d+/); // Encuentra la primera secuencia de dígitos
  const maxPrice = match? parseInt(match[0], 10) : 0;
  const posts = await postServicesGetAll({query: { price: { $lt: maxPrice } }});

  return posts;
}

const handleMinTag = async (tag: string, search: string): Promise<Array<Post>> => {
  const match = search.match(/\d+/); // Encuentra la primera secuencia de dígitos
  const minPrice = match ? parseInt(match[0], 10) : 999999999999;
  const posts = await postServicesGetAll({query: { price: { $gte: minPrice } }});

  return posts;
}

const handleMinMaxTag = async (tag: string, search: string): Promise<Array<Post>> => {
  const matches = search.match(/\d+/g); // Encuentra todas las secuencias de dígitos
  let minPrice = 0, maxPrice = 999999999999;
  if (matches && matches.length >= 2) {
    minPrice = parseInt(matches[0], 10);
    maxPrice = parseInt(matches[1], 10);
    if(minPrice > maxPrice){
      [minPrice, maxPrice] = [maxPrice, minPrice];
    }
  } else if (matches && matches.length === 1) {
    // Si solo hay un número, se asume como minPrice por defecto
    minPrice = parseInt(matches[0], 10);
  }
  const posts = await postServicesGetAll({query: { price: { $gte: minPrice, $lt: maxPrice } }});

  return posts;
}
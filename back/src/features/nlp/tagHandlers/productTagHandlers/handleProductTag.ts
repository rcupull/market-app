import { Post } from "../../../../types/post";
import { handleNameTag } from "./handleNameTag";
import { handlePriceTag } from "./handlePriceTag";

export const handleProductTag = async(tag: string, search: string): Promise<Array<Post>> => {
  if(tag.startsWith('price')){
    // search in price
    const prefix = "price.";
    const tagWithoutPrefix = tag.substring(prefix.length);
    return await handlePriceTag(tagWithoutPrefix, search);
  }
  else if(tag.startsWith('name')){
    // search in name
    const prefix = "name.";
    const tagWithoutPrefix = tag.substring(prefix.length);
    return await handleNameTag(tagWithoutPrefix, search);
  }
  return [];
}
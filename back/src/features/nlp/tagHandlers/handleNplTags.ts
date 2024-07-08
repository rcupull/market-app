import { Business } from "../../../types/business"
import { Post } from "../../../types/post"
import { handleBusinessTag } from "./bussinesTagHandlers/handleBusinessTag";
import { handleProductTag } from "./productTagHandlers/handleProductTag";

const handleNplTags = async(tag: string, search: string): Promise<Array<Post> | Array<Business>> => {
  if(tag.startsWith('products')){
    // search in products
    const prefix = "products.";
    const tagWithoutPrefix = tag.substring(prefix.length);
    return await handleProductTag(tagWithoutPrefix, search);
  } 
  else if(tag.startsWith('business')){
    // search in business
    const prefix = "products.";
    const tagWithoutPrefix = tag.substring(prefix.length);
    return await handleBusinessTag(tagWithoutPrefix, search);
  }   
  return [];
}

export default handleNplTags;
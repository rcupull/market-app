
import { BusinessSearchDto, BusinessSearchDtoBusiness, BusinessSearchDtoPost } from "../../../types/business";
import { handleBusinessTag } from "./bussinesTagHandlers/handleBusinessTag";
import { handleProductTag } from "./productTagHandlers/handleProductTag";

const handleNplTags = async(tag: string, search: string): Promise<BusinessSearchDto[]> => {
  if(tag.startsWith('products')){
    // search in products
    const prefix = "products.";
    const tagWithoutPrefix = tag.substring(prefix.length);
    const data = await handleProductTag(tagWithoutPrefix, search);
    return data.map((product) : BusinessSearchDtoPost => ({type: 'post', data: product}));
  } 
  else if(tag.startsWith('business')){
    // search in business
    const prefix = "products.";
    const tagWithoutPrefix = tag.substring(prefix.length);
    const data =  await handleBusinessTag(tagWithoutPrefix, search);
    return data.map((business) : BusinessSearchDtoBusiness=> ({type: 'business', data: business}));
  }   
  return [];
}

export default handleNplTags;
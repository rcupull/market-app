import { Post } from "../../../../types/post";
import { postServicesGetAll } from "../../../post/services";
import { GetAllPostArgs } from "../../../post/utils";

export const handleNameTag = async (tag: string, search: string): Promise<Array<Post>> => {
  const parts = tag.split('.');
  const name = parts[0];
  const query : GetAllPostArgs  = { name: { $regex: name, $options: 'i' } };

  const numbers = search.match(/\d+/g)?.map(Number);
  numbers?.sort();
  if (tag.includes('min') || tag.includes('max')) {
    query.price = {};

    if (tag.includes('min') && numbers?.[0]) {
      query.price.$gte = numbers[0];
    }

    if (tag.includes('max')) {
      // Si hay 'min' y 'max', el segundo número es para 'max', de lo contrario, el primero.
      const maxIndex = tag.includes('min') && numbers?.length && numbers?.length > 1 ? 1 : 0;
      if (numbers?.[maxIndex]) {
        query.price.$lte = numbers[maxIndex];
      }
    }
  }

  const posts = await postServicesGetAll({ query });

  return posts;
}
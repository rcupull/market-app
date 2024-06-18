import { postToShoppingPostDataReshaper } from '../features/shopping/utils';
import { BusinessModel } from '../schemas/business';
import { PostModel } from '../schemas/post';
import { ShoppingModel } from '../schemas/shopping';
import { UserModel } from '../schemas/user';
import { Business } from '../types/business';
import { Post } from '../types/post';
import { Shopping } from '../types/shopping';
import { User } from '../types/user';

export interface TestBDContent {
  user1: User;
  user2: User;
  user3: User;
  //
  business1User1: Business;
  business2User1: Business;
  hiddenBusinessUser1: Business;
  //
  productPost1Business1User1: Post;
  productPost2Business1User1: Post;
  productPost1Business1User2: Post;
  productPost2Business1User2: Post;
  productPost3Business1User2: Post;

  //
  business1User2: Business;
  business2User2: Business;
  hiddenBusinessUser2: Business;
  //
  shopping1Business1User1?: Shopping;
  //
  admin: User;
}

export const fillBD = async (args?: {
  user1?: Partial<User>;
  user2?: Partial<User>;
  user3?: Partial<User>;
  business1User1?: Partial<Business>;
  business2User1?: Partial<Business>;
  hiddenBusinessUser1?: Partial<Business>;
  productPost1Business1User1?: Partial<Post>;
  productPost2Business1User1?: Partial<Post>;
  productPost1Business1User2?: Partial<Post>;
  productPost2Business1User2?: Partial<Post>;
  productPost3Business1User2?: Partial<Post>;
  business1User2?: Partial<Business>;
  business2User2?: Partial<Business>;
  hiddenBusinessUser2?: Partial<Business>;
  shopping1Business1User1?: Partial<Shopping>;
  admin?: Partial<User>;
  //
  noCreateInitialShopping?: boolean;
}): Promise<TestBDContent> => {
  const { noCreateInitialShopping } = args || {};

  const admin = new UserModel({
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'password_123_admin',
    passwordVerbose: 'password_123_admin',
    role: 'admin',
    ...(args?.admin || {}),
  });
  await admin.save();

  //////////////////////////////////////////////////////////////////////////////////
  const user1 = new UserModel({
    name: 'user1',
    email: 'user1@gmail.com',
    password: 'password_123_user1',
    passwordVerbose: 'password_123_user1',
    validated: true,
    canCreateBusiness: true,
    ...(args?.user1 || {}),
  });
  await user1.save();
  //
  const business1User1 = new BusinessModel({
    name: 'business1User1',
    routeName: 'business1User1',
    createdBy: user1._id,
    validated: true,
    ...(args?.business1User1 || {}),
  });
  await business1User1.save();

  const business2User1 = new BusinessModel({
    name: 'business2User1',
    routeName: 'business2User1',
    createdBy: user1.id,
    validated: true,
    ...(args?.business2User1 || {}),
  });
  await business2User1.save();

  const hiddenBusinessUser1 = new BusinessModel({
    name: 'hiddenBusinessUser1',
    routeName: 'hiddenBusinessUser1',
    createdBy: user1.id,
    validated: true,
    hidden: true,
    ...(args?.hiddenBusinessUser1 || {}),
  });

  await hiddenBusinessUser1.save();

  const productPost1Business1User1 = new PostModel({
    name: 'chancletas',
    routeName: business1User1.routeName,
    createdBy: user1.id,
    price: '10',
    currency: 'CUP',
    postCategoriesTags: ['cat1', 'cat2', 'cat3'],
    ...(args?.productPost1Business1User1 || {}),
  });
  await productPost1Business1User1.save();

  const productPost2Business1User1 = new PostModel({
    name: 'zapatos',
    routeName: business1User1.routeName,
    createdBy: user1.id,
    price: '20',
    currency: 'CUP',
    postCategoriesTags: ['cat1', 'cat2', 'cat3', 'cat4'],
    ...(args?.productPost2Business1User1 || {}),
  });
  await productPost2Business1User1.save();

  let shopping1Business1User1 = undefined;
  if (!noCreateInitialShopping) {
    shopping1Business1User1 = new ShoppingModel({
      state: 'CONSTRUCTION',
      purchaserId: user1._id,
      purchaserName: user1.name,
      routeName: business1User1.routeName,
      posts: [
        {
          postData: postToShoppingPostDataReshaper(productPost1Business1User1),
          purshaseNotes: {},
          count: 5,
          lastUpdatedDate: new Date(),
        },
      ],
      ...(args?.shopping1Business1User1 || {}),
    });

    await shopping1Business1User1.save();
  }

  //////////////////////////////////////////////////////////////////////////////////

  const user2 = new UserModel({
    name: 'user2',
    email: 'user2@gmail.com',
    password: 'password_123_user2',
    passwordVerbose: 'password_123_user2',
    ...(args?.user2 || {}),
  });
  await user2.save();
  //
  const business1User2 = new BusinessModel({
    name: 'business1User2',
    routeName: 'business1User2',
    createdBy: user2.id,
    ...(args?.business1User2 || {}),
  });
  await business1User2.save();
  //
  const business2User2 = new BusinessModel({
    name: 'business2User2',
    routeName: 'business2User2',
    createdBy: user2.id,
    ...(args?.business2User2 || {}),
  });
  await business2User2.save();

  const hiddenBusinessUser2 = new BusinessModel({
    name: 'hiddenBusinessUser2',
    routeName: 'hiddenBusinessUser2',
    createdBy: user2.id,
    validated: true,
    hidden: true,
    ...(args?.hiddenBusinessUser2 || {}),
  });
  await hiddenBusinessUser2.save();

  const productPost1Business1User2 = new PostModel({
    name: 'productPost1Business1User2 name',
    routeName: business1User2.routeName,
    createdBy: user2.id,
    price: '10',
    currency: 'CUP',
    postCategoriesTags: ['cat1', 'cat2', 'cat3'],
    ...(args?.productPost1Business1User2 || {}),
  });
  await productPost1Business1User2.save();

  const productPost2Business1User2 = new PostModel({
    name: 'productPost2Business1User2 name',
    routeName: business1User2.routeName,
    createdBy: user2.id,
    price: '10',
    currency: 'CUP',
    postCategoriesTags: ['cat1', 'cat2', 'cat3'],
    ...(args?.productPost2Business1User2 || {}),
  });
  await productPost2Business1User2.save();

  const productPost3Business1User2 = new PostModel({
    name: 'productPost3Business1User2 name',
    routeName: business1User2.routeName,
    createdBy: user2.id,
    price: '10',
    currency: 'CUP',
    postCategoriesTags: ['cat1', 'cat2', 'cat3'],
    ...(args?.productPost3Business1User2 || {}),
  });
  await productPost3Business1User2.save();

  //////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////
  const user3 = new UserModel({
    name: 'user3',
    email: 'user3@gmail.com',
    password: 'password_123_user3',
    passwordVerbose: 'password_123_user3',
    validated: true,
    ...(args?.user3 || {}),
  });

  await user3.save();

  //////////////////////////////////////////////////////////////////////////////////

  return {
    user1,
    user2,
    user3,
    business1User1,
    business2User1,
    hiddenBusinessUser1,
    productPost1Business1User1,
    productPost2Business1User1,
    //
    productPost1Business1User2,
    productPost2Business1User2,
    productPost3Business1User2,
    //
    shopping1Business1User1,
    //
    business1User2,
    business2User2,
    hiddenBusinessUser2,
    //
    admin,
  };
};

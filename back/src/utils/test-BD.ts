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
  //
  productPost1Business1User1: Post;
  productPost2Business1User1: Post;
  //
  business1User2: Business;
  business2User2: Business;
  //
  shopping1Business1User1?: Shopping;
  //
  admin: User;
}

export const fillBD = async (args?: {
  overrideUser1?: Partial<User>;
  overrideAdmin?: Partial<User>;
  overrideBusiness1User1?: Partial<Business>;
  overrideProductPost1Business1User1?: Partial<Post>;
  overrideProductPost2Business1User1?: Partial<Post>;
  overrideShopping1Business1User1?: Partial<Shopping>;
  noCreateInitialShopping?: boolean;
}): Promise<TestBDContent> => {
  const {
    overrideUser1 = {},
    overrideBusiness1User1 = {},
    overrideProductPost1Business1User1 = {},
    overrideProductPost2Business1User1 = {},
    overrideAdmin = {},
    overrideShopping1Business1User1 = {},
    noCreateInitialShopping,
  } = args || {};

  const admin = new UserModel({
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'password_123_admin',
    passwordVerbose: 'password_123_admin',
    role: 'admin',
    ...overrideAdmin,
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
    ...overrideUser1,
  });
  await user1.save();
  //
  const business1User1 = new BusinessModel({
    name: 'business1User1',
    routeName: 'business1User1',
    createdBy: user1._id,
    validated: true,
    ...overrideBusiness1User1,
  });
  await business1User1.save();

  const business2User1 = new BusinessModel({
    name: 'business2User1',
    routeName: 'business2User1',
    createdBy: user1.id,
    validated: true,
  });
  await business2User1.save();

  const hiddenBusinessUser1 = new BusinessModel({
    name: 'hiddenBusinessUser1',
    routeName: 'hiddenBusinessUser1',
    createdBy: user1.id,
    validated: true,
    hidden: true,
  });

  await hiddenBusinessUser1.save();

  const productPost1Business1User1 = new PostModel({
    name: 'chancletas',
    routeName: business1User1.routeName,
    createdBy: user1.id,
    price: '10',
    currency: 'CUP',
    postCategoriesTags: ['cat1', 'cat2', 'cat3'],
    ...overrideProductPost1Business1User1,
  });
  await productPost1Business1User1.save();

  const productPost2Business1User1 = new PostModel({
    name: 'zapatos',
    routeName: business1User1.routeName,
    createdBy: user1.id,
    price: '20',
    currency: 'CUP',
    postCategoriesTags: ['cat1', 'cat2', 'cat3', 'cat4'],
    ...overrideProductPost2Business1User1,
  });
  await productPost2Business1User1.save();

  const shopping1Business1User1 = undefined;
  if (!noCreateInitialShopping) {
    const shopping1Business1User1 = new ShoppingModel({
      state: 'CONSTRUCTION',
      purchaserId: user1._id,
      purchaserName: user1.name,
      routeName: business1User1.routeName,
      posts: [
        {
          post: productPost1Business1User1,
          purshaseNotes: {},
          count: 5,
          lastUpdatedDate: new Date(),
        },
      ],
      ...overrideShopping1Business1User1,
    });

    await shopping1Business1User1.save();
  }

  //////////////////////////////////////////////////////////////////////////////////

  const user2 = new UserModel({
    name: 'user2',
    email: 'user2@gmail.com',
    password: 'password_123_user2',
    passwordVerbose: 'password_123_user2',
  });
  await user2.save();
  //
  const business1User2 = new BusinessModel({
    name: 'business1User2',
    routeName: 'business1User2',
    createdBy: user2.id,
  });
  await business1User2.save();
  //
  const business2User2 = new BusinessModel({
    name: 'business2User2',
    routeName: 'business2User2',
    createdBy: user2.id,
  });
  await business2User2.save();

  const hiddenBusinessUser2 = new BusinessModel({
    name: 'hiddenBusinessUser2',
    routeName: 'hiddenBusinessUser2',
    createdBy: user2.id,
    validated: true,
    hidden: true,
  });
  await hiddenBusinessUser2.save();

  //////////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////////
  const user3 = new UserModel({
    name: 'user3',
    email: 'user3@gmail.com',
    password: 'password_123_user3',
    passwordVerbose: 'password_123_user3',
    validated: true,
  });

  await user3.save();

  //////////////////////////////////////////////////////////////////////////////////

  return {
    user1,
    user2,
    user3,
    business1User1,
    business2User1,
    productPost1Business1User1,
    productPost2Business1User1,
    shopping1Business1User1,
    //
    business1User2,
    business2User2,
    admin,
  };
};

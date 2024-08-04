import { postToShoppingPostDataReshaper } from '../features/shopping/utils';
import { AuthSessionModel } from '../schemas/auth';
import { BusinessModel } from '../schemas/business';
import { PostModel } from '../schemas/post';
import { ShoppingModel } from '../schemas/shopping';
import { UserModel } from '../schemas/user';
import { TYPE_DEVICE } from '../types/auth';
import { Business } from '../types/business';
import { Post } from '../types/post';
import { Shopping, ShoppingState } from '../types/shopping';
import { User } from '../types/user';
import { generateRefreshJWT } from './auth';

export interface TestBDContent {
  user1: User;
  business1User1: Business;
  business2User1: Business;
  business3User1: Business;
  productPost1Business1User1: Post;
  productPost2Business1User1: Post;
  productPost3Business1User1: Post;
  productPost4Business1User1: Post;
  productPost5Business1User1: Post;
  shopping1Business1User1: Shopping;
  //
  user2: User;
  business1User2: Business;
  business2User2: Business;
  business3User2: Business;
  productPost1Business1User2: Post;
  productPost2Business1User2: Post;
  productPost3Business1User2: Post;
  productPost4Business1User2: Post;
  productPost5Business1User2: Post;
  //
  user3: User;
  //
  admin: User;
}

const createProductPost = async ({
  name,
  business,
  user,
  override
}: {
  name: string;
  business: Business;
  user: User;
  override: Partial<Post> | undefined;
}): Promise<Post> => {
  const product = new PostModel({
    name,
    routeName: business.routeName,
    createdBy: user._id,
    price: 10,
    currency: 'CUP',
    postCategoriesTags: ['cat1', 'cat2', 'cat3'],
    ...(override || {})
  });
  await product.save();

  return product;
};

const createBusiness = async ({
  name,
  user,
  override
}: {
  name: string;
  user: User;
  override: Partial<Business> | undefined;
}): Promise<Business> => {
  const business = new BusinessModel({
    name,
    routeName: name,
    createdBy: user._id,
    currency: 'CUP',
    ...(override || {})
  });
  await business.save();

  return business;
};

export const fillBD = async (args?: {
  user1?: Partial<User>;
  business1User1?: Partial<Business>;
  business2User1?: Partial<Business>;
  business3User1?: Partial<Business>;
  productPost1Business1User1?: Partial<Post>;
  productPost2Business1User1?: Partial<Post>;
  productPost3Business1User1?: Partial<Post>;
  productPost4Business1User1?: Partial<Post>;
  productPost5Business1User1?: Partial<Post>;
  shopping1Business1User1?: Partial<Shopping>;
  //
  user2?: Partial<User>;
  business1User2?: Partial<Business>;
  business2User2?: Partial<Business>;
  business3User2?: Partial<Business>;
  productPost1Business1User2?: Partial<Post>;
  productPost2Business1User2?: Partial<Post>;
  productPost3Business1User2?: Partial<Post>;
  productPost4Business1User2?: Partial<Post>;
  productPost5Business1User2?: Partial<Post>;
  //
  user3?: Partial<User>;
  admin?: Partial<User>;
}): Promise<TestBDContent> => {
  const admin = new UserModel({
    name: 'admin',
    email: 'admin@gmail.com',
    password: 'password_123_admin',
    passwordVerbose: 'password_123_admin',
    role: 'admin',
    ...(args?.admin || {})
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
    ...(args?.user1 || {})
  });
  await user1.save();

  const business1User1 = await createBusiness({
    name: 'business1User1',
    user: user1,
    override: args?.business1User1
  });

  const business2User1 = await createBusiness({
    name: 'business2User1',
    user: user1,
    override: args?.business2User1
  });

  const business3User1 = await createBusiness({
    name: 'business3User1',
    user: user1,
    override: args?.business3User1
  });

  const productPost1Business1User1 = await createProductPost({
    name: 'productPost1Business1User1',
    business: business1User1,
    user: user1,
    override: args?.productPost1Business1User1
  });

  const productPost2Business1User1 = await createProductPost({
    name: 'productPost2Business1User1',
    business: business1User1,
    user: user1,
    override: args?.productPost2Business1User1
  });

  const productPost3Business1User1 = await createProductPost({
    name: 'productPost3Business1User1',
    business: business1User1,
    user: user1,
    override: args?.productPost3Business1User1
  });

  const productPost4Business1User1 = await createProductPost({
    name: 'productPost4Business1User1',
    business: business1User1,
    user: user1,
    override: args?.productPost4Business1User1
  });

  const productPost5Business1User1 = await createProductPost({
    name: 'productPost5Business1User1',
    business: business1User1,
    user: user1,
    override: args?.productPost5Business1User1
  });

  const shopping1Business1User1 = new ShoppingModel({
    state: ShoppingState.CONSTRUCTION,
    purchaserId: user1._id,
    routeName: business1User1.routeName,
    currency: business1User1.currency,
    posts: [
      {
        postData: postToShoppingPostDataReshaper(productPost1Business1User1),
        purshaseNotes: {},
        count: 5,
        lastUpdatedDate: new Date()
      }
    ],
    ...(args?.shopping1Business1User1 || {})
  });

  await shopping1Business1User1.save();

  //////////////////////////////////////////////////////////////////////////////////

  const user2 = new UserModel({
    name: 'user2',
    email: 'user2@gmail.com',
    password: 'password_123_user2',
    passwordVerbose: 'password_123_user2',
    ...(args?.user2 || {})
  });
  await user2.save();

  //
  const business1User2 = await createBusiness({
    name: 'business1User2',
    user: user2,
    override: args?.business1User2
  });

  const business2User2 = await createBusiness({
    name: 'business2User2',
    user: user2,
    override: args?.business2User2
  });

  const business3User2 = await createBusiness({
    name: 'business3User2',
    user: user2,
    override: args?.business3User2
  });

  const productPost1Business1User2 = await createProductPost({
    name: 'productPost1Business1User2',
    business: business1User2,
    user: user2,
    override: args?.productPost1Business1User2
  });

  const productPost2Business1User2 = await createProductPost({
    name: 'productPost2Business1User2',
    business: business1User2,
    user: user2,
    override: args?.productPost2Business1User2
  });

  const productPost3Business1User2 = await createProductPost({
    name: 'productPost3Business1User2',
    business: business1User2,
    user: user2,
    override: args?.productPost3Business1User2
  });

  const productPost4Business1User2 = await createProductPost({
    name: 'productPost4Business1User2',
    business: business1User2,
    user: user2,
    override: args?.productPost4Business1User2
  });

  const productPost5Business1User2 = await createProductPost({
    name: 'productPost5Business1User2',
    business: business1User2,
    user: user2,
    override: args?.productPost5Business1User2
  });

  //////////////////////////////////////////////////////////////////////////////////
  const user3 = new UserModel({
    name: 'user3',
    email: 'user3@gmail.com',
    password: 'password_123_user3',
    passwordVerbose: 'password_123_user3',
    validated: true,
    ...(args?.user3 || {})
  });

  await user3.save();

  //////////////////////////////////////////////////////////////////////////////////

  const createSession = async (user: User) => {
    await AuthSessionModel.create({
      userId: user._id,
      descriptionDevice: 'descriptionDevice',
      typeDevice: TYPE_DEVICE.WEB,
      refreshToken: generateRefreshJWT({ id: user._id.toString() })
    });
  };

  await createSession(user1);
  await createSession(user2);
  await createSession(user3);

  return {
    user1,
    business1User1,
    business2User1,
    business3User1,
    productPost1Business1User1,
    productPost2Business1User1,
    productPost3Business1User1,
    productPost4Business1User1,
    productPost5Business1User1,
    shopping1Business1User1,
    //
    user2,
    business1User2,
    business2User2,
    business3User2,
    productPost1Business1User2,
    productPost2Business1User2,
    productPost3Business1User2,
    productPost4Business1User2,
    productPost5Business1User2,
    //
    user3,
    //
    admin
  };
};

export const removeAllShoppings = async () => {
  await ShoppingModel.deleteMany({});
};

import { Address, ModelDocument, QueryHandle } from '../../types/general';
import { User } from '../../types/user';
import { UserModel } from '../../schemas/user';
import { FilterQuery, PaginateOptions, ProjectionType, UpdateQuery } from 'mongoose';
import { UpdateOptions } from 'mongodb';
import { Shopping } from '../../types/shopping';
import { isEqualIds } from '../../utils/general';
import { PaginateResult } from '../../middlewares/middlewarePagination';
import { getSortQuery } from '../../utils/schemas';
import { PushNotificationUserData } from '../../types/notifications';

export const userServicesAddOne: QueryHandle<
  {
    email: string;
    password: string;
    name: string;
  },
  User | null
> = async ({ email, password, name }) => {
  // Check if the email is already registered
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return null;
  }

  // Create a new user
  const newUser = new UserModel({
    email,
    password,
    passwordVerbose: password,
    name
  });

  await newUser.save();

  return newUser;
};

export const userServicesGetOne: QueryHandle<
  {
    query: FilterQuery<User>;
    projection?: ProjectionType<User>;
  },
  User | null
> = async ({ query, projection }) => {
  const user = await UserModel.findOne(query, projection);

  return user;
};

export const userServicesGetUsersDataForPushNotifications: QueryHandle<
  {
    query: FilterQuery<User>;
  },
  Array<PushNotificationUserData>
> = async ({ query }) => {
  const usersData = await userServicesGetAll({
    query,
    projection: {
      firebaseToken: 1,
      _id: 1
    }
  });

  return usersData.map((userData) => ({
    firebaseToken: userData.firebaseToken,
    userId: userData._id
  }));
};

export const userServicesGetAllWithPagination: QueryHandle<
  {
    paginateOptions?: PaginateOptions;
    query: FilterQuery<User>;
    sort?: string;
  },
  PaginateResult<User>
> = async ({ query, sort, paginateOptions = {} }) => {
  const out = await UserModel.paginate(query, {
    ...paginateOptions,
    sort: getSortQuery(sort)
  });

  return out as unknown as PaginateResult<User>;
};

export const userServicesGetAll: QueryHandle<
  {
    query: FilterQuery<User>;
    projection?: ProjectionType<User>;
  },
  Array<ModelDocument<User>>
> = async ({ query, projection }) => {
  const out = await UserModel.find(query, projection);

  return out;
};

export const userServicesUpdateOne: QueryHandle<
  {
    query: FilterQuery<User>;
    update: UpdateQuery<User>;
    options?: UpdateOptions;
  },
  void
> = async ({ query, update, options }) => {
  await UserModel.updateOne(query, update, options);
};

export const userServicesUpdateAll: QueryHandle<
  {
    query: FilterQuery<User>;
    update: UpdateQuery<User>;
    options?: UpdateOptions;
  },
  void
> = async ({ query, update, options }) => {
  await UserModel.updateMany(query, update, options);
};

export const userServicesFindOneAndUpdate: QueryHandle<
  {
    query: FilterQuery<User>;
    update: UpdateQuery<User>;
  },
  User | null
> = async ({ query, update }) => {
  return await UserModel.findOneAndUpdate(query, update);
};

export const userServicesGetUserDataFromShopping: QueryHandle<
  {
    query: FilterQuery<User>;
  },
  {
    getOneShoppingUserData: (shopping: Shopping) => {
      purchaserName: string;
      purchaserAddress?: Address;
      purchaserPhone?: string;
    } | null;
  }
> = async ({ query }) => {
  const usersData: Array<Pick<User, '_id' | 'name' | 'addresses' | 'phone'>> =
    await userServicesGetAll({
      query,
      projection: { name: 1, addresses: 1, _id: 1, phone: 1 }
    });

  return {
    getOneShoppingUserData: (shopping) => {
      const userData = usersData.find((user) => isEqualIds(user._id, shopping.purchaserId));
      if (userData) {
        return {
          purchaserName: userData.name,
          purchaserAddress: userData.addresses?.[0],
          purchaserPhone: userData.phone
        };
      }
      return null;
    }
  };
};

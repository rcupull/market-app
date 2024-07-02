import { Address, ModelDocument, QueryHandle } from '../../types/general';
import { User } from '../../types/user';
import { UserModel } from '../../schemas/user';
import { FilterQuery, ProjectionType, UpdateQuery } from 'mongoose';
import { UpdateOptions } from 'mongodb';
import { Shopping } from '../../types/shopping';
import { isEqualIds } from '../../utils/general';

const addOne: QueryHandle<
  {
    email: string;
    password: string;
    name: string;
    canCreateBusiness: boolean;
  },
  User | null
> = async ({ email, password, name, canCreateBusiness }) => {
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
    canCreateBusiness,
    name,
  });

  await newUser.save();

  return newUser;
};

const getOne: QueryHandle<
  {
    query: FilterQuery<User>;
    projection?: ProjectionType<User>;
  },
  User | null
> = async ({ query, projection }) => {
  const user = await UserModel.findOne(query, projection);

  return user;
};

const getAll: QueryHandle<
  {
    query: FilterQuery<User>;
    projection?: ProjectionType<User>;
  },
  Array<ModelDocument<User>>
> = async ({ query, projection }) => {
  const out = await UserModel.find(query, projection);

  return out;
};

const updateOne: QueryHandle<
  {
    query: FilterQuery<User>;
    update: UpdateQuery<User>;
    options?: UpdateOptions;
  },
  void
> = async ({ query, update, options }) => {
  await UserModel.updateOne(query, update, options);
};

const findOneAndUpdate: QueryHandle<
  {
    query: FilterQuery<User>;
    update: UpdateQuery<User>;
  },
  User | null
> = async ({ query, update }) => {
  return await UserModel.findOneAndUpdate(query, update);
};

const getUserDataFromShopping: QueryHandle<
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
  const usersData: Array<Pick<User, '_id' | 'name' | 'address' | 'phone'>> =
    await userServices.getAll({
      query,
      projection: { name: 1, address: 1, _id: 1, phone: 1 },
    });

  return {
    getOneShoppingUserData: (shopping) => {
      const userData = usersData.find((user) => isEqualIds(user._id, shopping.purchaserId));
      if (userData) {
        return {
          purchaserName: userData.name,
          purchaserAddress: userData.address,
          purchaserPhone: userData.phone,
        };
      }
      return null;
    },
  };
};

export const userServices = {
  addOne,
  getOne,
  updateOne,
  findOneAndUpdate,
  getAll,
  getUserDataFromShopping,
};

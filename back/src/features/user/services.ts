import { QueryHandle } from '../../types/general';
import { User } from '../../types/user';
import { UserModel } from '../../schemas/user';
import { FilterQuery, ProjectionType, UpdateQuery } from 'mongoose';
import { UpdateOptions } from 'mongodb';

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

const find: QueryHandle<
  {
    query: FilterQuery<User>;
    projection?: ProjectionType<User>;
  },
  Array<User>
> = async ({ query, projection }) => {
  return await UserModel.find(query, projection);
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

export const userServices = {
  addOne,
  getOne,
  updateOne,
  findOneAndUpdate,
  find,
};

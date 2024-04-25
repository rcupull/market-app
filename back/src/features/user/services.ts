import { QueryHandle } from "../../types/general";
import { User } from "../../types/user";
import { UserModel } from "../../schemas/user";
import { get401Response, get404Response } from "../../utils/server-response";
import { FilterQuery, ProjectionType, UpdateQuery } from "mongoose";
import { UpdateOptions } from "mongodb";

const addOne: QueryHandle<
  {
    email: string;
    password: string;
    name: string;
    canCreateBusiness: boolean;
  },
  User
> = async ({ email, res, password, name, canCreateBusiness }) => {
  // Check if the email is already registered
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return get401Response({
      res,
      json: {
        message: "Email already registered",
      },
    });
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
  User
> = async ({ query, res, projection }) => {
  const user = await UserModel.findOne(query, projection);
  if (!user) {
    return get404Response({
      res,
      json: {
        message: "User not found",
      },
    });
  }

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

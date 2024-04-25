import { BusinessModel } from "../schemas/business";
import { UserModel } from "../schemas/user";
import { Business } from "../types/business";
import { User } from "../types/user";

export const fillBD = async (args?: {
  overrideUser1?: Partial<User>;
  overrideBusiness1User1?: Partial<Business>;
}) => {
  const { overrideUser1 = {}, overrideBusiness1User1 = {} } = args || {};

  const admin = new UserModel({
    name: "admin",
    email: "admin@gmail.com",
    password: "password_123_admin",
    passwordVerbose: "password_123_admin",
    role: "admin",
  });
  await admin.save();

  //////////////////////////////////////////////////////////////////////////////////
  const user1 = new UserModel({
    name: "user1",
    email: "user1@gmail.com",
    password: "password_123_user1",
    passwordVerbose: "password_123_user1",
    validated: true,
    canCreateBusiness: true,
    ...overrideUser1,
  });
  await user1.save();
  //
  const business1User1 = new BusinessModel({
    name: "business1User1",
    routeName: "business1User1",
    createdBy: user1._id,
    validated: true,
    ...overrideBusiness1User1,
  });
  await business1User1.save();

  const business2User1 = new BusinessModel({
    name: "business2User1",
    routeName: "business2User1",
    createdBy: user1.id,
    validated: true,
  });
  await business2User1.save();

  const hiddenBusinessUser1 = new BusinessModel({
    name: "hiddenBusinessUser1",
    routeName: "hiddenBusinessUser1",
    createdBy: user1.id,
    validated: true,
    hidden: true,
  });

  await hiddenBusinessUser1.save();

  //////////////////////////////////////////////////////////////////////////////////

  const user2 = new UserModel({
    name: "user2",
    email: "user2@gmail.com",
    password: "password_123_user2",
    passwordVerbose: "password_123_user2",
  });
  await user2.save();
  //
  const business1User2 = new BusinessModel({
    name: "business1User2",
    routeName: "business1User2",
    createdBy: user2.id,
  });
  await business1User2.save();
  //
  const business2User2 = new BusinessModel({
    name: "business2User2",
    routeName: "business2User2",
    createdBy: user2.id,
  });
  await business2User2.save();

  const hiddenBusinessUser2 = new BusinessModel({
    name: "hiddenBusinessUser2",
    routeName: "hiddenBusinessUser2",
    createdBy: user2.id,
    validated: true,
    hidden: true,
  });
  await hiddenBusinessUser2.save();

  //////////////////////////////////////////////////////////////////////////////////

  return {
    user1,
    user2,
    business1User1,
    business2User1,
    //
    business1User2,
    business2User2,
    admin,
  };
};

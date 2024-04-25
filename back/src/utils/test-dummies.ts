import { Business } from "../types/business";
import { BaseIdentity } from "../types/general";
import mongose from "mongoose";
import { User } from "../types/user";
import { setAnyString } from "./test-utils";

//Business
export const objectIds = {
  obj0: new mongose.Types.ObjectId("62a23958e5a9e9b88f853a10"),
  obj1: new mongose.Types.ObjectId("62a23958e5a9e9b88f853a11"),
  obj2: new mongose.Types.ObjectId("62a23958e5a9e9b88f853a12"),
};

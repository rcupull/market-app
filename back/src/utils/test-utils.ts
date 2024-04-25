import { AnyRecord } from "../types/general";
import { Path } from "../types/paths";
import { set } from "./general";
import mongose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../constants/auth";

const dbTestUrl = "mongodb://127.0.0.1:27017/community_test_db";

export const setAnyString = <T extends AnyRecord = AnyRecord>(
  ...paths: Array<Path<T>>
) => {
  //@ts-expect-error ignore
  const out: T = {};
  paths.forEach((path) => {
    set(out, path, expect.anything());
  });

  return out;
};

export const openTestDbConnectionAsync = async () => {
  return mongose.connect(dbTestUrl);
};
export const dropTestDbConnectionAsync = async () => {
  return mongose.connection.db.dropDatabase();
};

export const closeTestDbConnectionAsync = async () => {
  return mongose.connection.close();
};

export const generateToken = (id: string | Schema.Types.ObjectId) => {
  return jwt.sign(
    {
      id,
    },
    SECRET_ACCESS_TOKEN
  );
};

import { PaginateModel, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SECRET_ACCESS_TOKEN } from "../constants/auth";
import { User } from "../types/user";
import { createdAtSchemaDefinition } from "../utils/schemas";
import mongoosePaginate from "mongoose-paginate-v2";

const UserSchema = new Schema<User>({
  ...createdAtSchemaDefinition,
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  passwordVerbose: { type: String, required: true, select: false },
  firebaseToken: { type: String, select: false },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  canCreateBusiness: { type: Boolean, required: true, default: false },
  validated: { type: Boolean, default: false },
  profileImage: {
    type: {
      _id: false,
      src: { type: String, required: true },
      width: { type: Number, required: true },
      height: { type: Number, required: true },
    },
    default: null,
  },
  payment: {
    planHistory: {
      type: [
        {
          _id: false,
          planType: {
            type: String,
            enum: ["free", "beginner", "professional", "company"],
            required: true,
          },
          dateOfPurchase: { type: String, required: true },
          trialMode: { type: Boolean, required: true },
          status: {
            type: String,
            enum: ["current", "validatingPurchase", "historical"],
            required: true,
          },
          validationPurchaseCode: { type: String },
        },
      ],
      default: [
        {
          planType: "free",
          dateOfPurchase: new Date(),
          trialMode: true,
          status: "current",
        },
      ],
    },
  },
});

UserSchema.methods.generateAccessJWT = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    SECRET_ACCESS_TOKEN
  );
};

const updateUserPassword = (user: User): Promise<void> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return reject(err);

      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return reject(err);

        user.password = hash;
        resolve();
      });
    });
  });
};

UserSchema.plugin(mongoosePaginate);

UserSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    try {
      await updateUserPassword(user);
    } catch (err: any) {
      next(err);
    }
  }

  next();
});

export const UserModel = model<User, PaginateModel<User>>(
  "User",
  UserSchema,
  "users"
);

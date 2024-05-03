import { Schema } from "mongoose";
import { BaseIdentity } from "./general";

export interface AuthSession extends BaseIdentity {
  refreshToken: string;
  userId: Schema.Types.ObjectId;
}

export interface ValidationCode extends BaseIdentity {
  code: string;
  userId: Schema.Types.ObjectId;
}

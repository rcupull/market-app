import { Schema, model } from "mongoose";
import { Session, ValidationCode } from "../types/auth";
import { createdAtSchemaDefinition } from "../utils/schemas";

const ValidationCodeShema = new Schema<ValidationCode>({
  ...createdAtSchemaDefinition,
  code: { type: String, required: true, unique: true },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const ValidationCodeModel = model<ValidationCode>(
  "ValidationCode",
  ValidationCodeShema,
  "validation_codes"
);

///////////////////////////////////////////////////////////////////////////////

const SessionShema = new Schema<Session>({
  ...createdAtSchemaDefinition,
  token: { type: String, required: true, unique: true },
});

export const SessionModel = model<Session>("Session", SessionShema, "sessions");

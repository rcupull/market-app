import { connect } from "mongoose";
import { dbUrl } from "../config";

export const connectDB = () => {
  connect(dbUrl)
    .then(() => {
      console.log("connected");
    })
    .catch((e) => {
      console.log(`Error: ${e}`);
    });
};

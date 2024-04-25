import { connect } from "mongoose";

export const dbUrl =
  process.env.DB_URL || "mongodb://127.0.0.1:27017/community_db";

export const connectDB = () => {
  connect(dbUrl)
    .then(() => {
      console.log("connected");
    })
    .catch((e) => {
      console.log(`Error: ${e}`);
    });
};

import { connect } from "mongoose";
import { dbUrl } from "../config";
import { logger } from "../features/logger";

export const connectDB = () => {
  connect(dbUrl)
    .then(() => {
      logger.info("connected");
    })
    .catch((e) => {
      logger.info(`Error: ${e}`);
    });
};

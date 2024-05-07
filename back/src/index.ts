import { connectDB } from "./db";
import { logger } from "./features/logger";
import { notificationsServices } from "./features/notifications";
import { app } from "./server";

connectDB();
notificationsServices.init();

app.listen("80", () => {
  logger.info(`Server running at port ${80}`);
});

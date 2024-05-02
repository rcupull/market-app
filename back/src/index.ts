import { apiPort } from "./config";
import { connectDB } from "./db";
import { logger } from "./features/logger";
import { notificationsServices } from "./features/notifications";
import { app } from "./server";

const PORT = apiPort || "4009";

connectDB();
notificationsServices.init();

app.listen(PORT, () => {
  logger.info(`Server running at port ${PORT}`);
});

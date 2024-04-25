import { apiPort } from "./config";
import { connectDB } from "./db";
import { notificationsServices } from "./features/notifications";
import { app } from "./server";

const PORT = apiPort || "4009";

connectDB();
notificationsServices.init();

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

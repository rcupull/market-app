import { connectDB } from "./db";
import { notificationsServices } from "./features/notifications";
import { app } from "./server";

const PORT = process.env.PORT || "4009";

connectDB();
notificationsServices.init();

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});

import { apiPort } from "./config";
import { connectDB } from "./db";
import { notificationsServices } from "./features/notifications";
import { app } from "./server";
import greenlockExpress from "greenlock-express";

connectDB();
notificationsServices.init();

if (process.env.NODE_ENV === "development") {
  const PORT = apiPort || "4009";

  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
} else {
  greenlockExpress
    .init({
      packageRoot: process.cwd(),
      configDir: "./greenlock.d",
      maintainerEmail: "rcupull@gmail.com",
      cluster: false,
    })
    .serve(app);
}

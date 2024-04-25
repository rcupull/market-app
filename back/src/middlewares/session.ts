import session from "express-session";
import { SECRET_ACCESS_TOKEN } from "../constants/auth";
import connectMongoSession from "connect-mongodb-session";
import { dbUrl } from "../db";

const MongoDBStore = connectMongoSession(session);

const store = new MongoDBStore(
  {
    uri: dbUrl,
    databaseName: "asere-market-stage",
    collection: "sessions",
  },
  function (error) {
    // Should have gotten an error
  }
);

store.on("error", function (error) {
  // Also get an error here
});

export const expressSession = session({
  secret: SECRET_ACCESS_TOKEN,
  resave: false,
  store,
  saveUninitialized: false,
  //   cookie: { secure: true },
});

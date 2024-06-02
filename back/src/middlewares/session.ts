import session from 'express-session';
import connectMongoSession from 'connect-mongodb-session';
import { dbUrl, secretAccessToken } from '../config';

const MongoDBStore = connectMongoSession(session);

const store = new MongoDBStore(
  {
    uri: dbUrl,
    databaseName: 'asere-market-stage',
    collection: 'sessions',
  },
  function () {
    // Should have gotten an error
  },
);

store.on('error', function () {
  // Also get an error here
});

export const expressSession = session({
  secret: secretAccessToken,
  resave: false,
  store,
  saveUninitialized: false,
  //   cookie: { secure: true },
});

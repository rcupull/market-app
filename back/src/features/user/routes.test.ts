import supertest from "supertest";
import { app } from "../../server";
import {
  dropTestDbConnectionAsync,
  generateToken,
  setAnyString,
} from "../../utils/test-utils";
import { Image } from "../../types/general";
import { User } from "../../types/user";
import { Business } from "../../types/business";
import { fillBD } from "../../utils/test-BD";

describe("/user/:userId", () => {
  afterEach(async () => {
    await dropTestDbConnectionAsync();
  });

  it("GET", async () => {
    const { user1 } = await fillBD();

    await supertest(app)
      .get(`/user/${user1._id}`)
      .auth(generateToken(user1._id), { type: "bearer" })
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchInlineSnapshot(
  setAnyString<User>(
    "_id",
    "createdAt",
    "payment.planHistory.0.dateOfPurchase"
  ), `
{
  "__v": 0,
  "_id": Anything,
  "canCreateBusiness": true,
  "createdAt": Anything,
  "email": "user1@gmail.com",
  "name": "user1",
  "payment": {
    "planHistory": [
      {
        "dateOfPurchase": Anything,
        "planType": "free",
        "status": "current",
        "trialMode": true,
      },
    ],
  },
  "profileImage": null,
  "role": "user",
  "shoppingCart": null,
  "validated": true,
}
`);
      });
  });

  it("GET should fail if not autenticated", async () => {
    const { user1 } = await fillBD();

    await supertest(app).get(`/user/${user1._id}`).expect(401);
  });

  it("GET should fail if the user has no access", async () => {
    const { user1, user2 } = await fillBD();

    await supertest(app)
      .get(`/user/${user2._id}`) // wrong id
      .auth(generateToken(user1._id), { type: "bearer" })
      .expect(401);
  });

  it("PUT", async () => {
    const { user1 } = await fillBD();

    const profileImage: Image = {
      height: 300,
      width: 300,
      src: "http://link-src.com/image.png",
    };

    //change the profileImage
    await supertest(app)
      .put(`/user/${user1._id}`)
      .send({ profileImage })
      .auth(generateToken(user1._id), { type: "bearer" })
      .expect(200);

    await supertest(app)
      .get(`/user/${user1._id}`)
      .auth(generateToken(user1._id), { type: "bearer" })
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchInlineSnapshot(
  setAnyString<User>(
    "_id",
    "createdAt",
    "payment.planHistory.0.dateOfPurchase"
  ), `
{
  "__v": 0,
  "_id": Anything,
  "canCreateBusiness": true,
  "createdAt": Anything,
  "email": "user1@gmail.com",
  "name": "user1",
  "payment": {
    "planHistory": [
      {
        "dateOfPurchase": Anything,
        "planType": "free",
        "status": "current",
        "trialMode": true,
      },
    ],
  },
  "profileImage": {
    "height": 300,
    "src": "http://link-src.com/image.png",
    "width": 300,
  },
  "role": "user",
  "shoppingCart": null,
  "validated": true,
}
`);
      });
  });

  it("PUT should fail if not autenticated", async () => {
    const { user1 } = await fillBD();

    await supertest(app).put(`/user/${user1._id}`).expect(401);
  });

  it("PUT should fail if the user has no access", async () => {
    const { user1, user2 } = await fillBD();

    await supertest(app)
      .put(`/user/${user2._id}`) // wrong id
      .auth(generateToken(user1._id), { type: "bearer" })
      .expect(401);
  });
});

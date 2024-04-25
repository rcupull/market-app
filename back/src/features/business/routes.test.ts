import supertest from "supertest";
import { app } from "../../server";
import {
  dropTestDbConnectionAsync,
  generateToken,
  setAnyString,
} from "../../utils/test-utils";
import { Business } from "../../types/business";
import { fillBD } from "../../utils/test-BD";
import { query } from "express";

describe("/business", () => {
  afterEach(async () => {
    await dropTestDbConnectionAsync();
  });
  it("GET", async () => {
    await fillBD();

    await supertest(app)
      .get(`/business`)
      .expect(200)
      .then((response) => {
        expect(response.body.data[0]).toMatchInlineSnapshot(
          setAnyString<Business>("_id", "createdAt", "createdBy"),
          `
{
  "__v": 0,
  "_id": Anything,
  "aboutUsPage": {
    "visible": false,
  },
  "bannerImages": [],
  "createdAt": Anything,
  "createdBy": Anything,
  "hidden": false,
  "layouts": {
    "banner": {
      "type": "static",
    },
    "footer": {
      "type": "basic",
    },
    "search": {
      "type": "right",
    },
  },
  "logo": null,
  "name": "business1User1",
  "postCategories": [],
  "routeName": "business1User1",
}
`
        );

        expect(response.body.paginator).toMatchInlineSnapshot(`
{
  "dataCount": 4,
  "hasNextPage": false,
  "hasPrevPage": false,
  "limit": 10,
  "nextPage": null,
  "offset": 0,
  "page": 1,
  "pageCount": 1,
  "pagingCounter": 1,
  "prevPage": null,
}
`);
      });
  });

  it("GET should no return hidden business", async () => {
    await fillBD();

    await supertest(app)
      .get(`/business`)
      .expect(200)
      .then((response) => {
        expect(response.body.data.length).toEqual(4);
      });
  });

  it("GET should return all business", async () => {
    await fillBD();

    await supertest(app)
      .get(`/business`)
      .expect(200)
      .then((response) => {
        expect(response.body.data.length).toEqual(4);
      });
  });

  it("POST should fail if the user can not create a business", async () => {
    const { user1, business1User1 } = await fillBD({
      overrideUser1: {
        canCreateBusiness: false,
      },
    });

    await supertest(app)
      .post(`/business`)
      .send({
        name: "newBusiness",
        routeName: "newBusiness",
        category: "clothing",
      })
      .auth(generateToken(user1._id), { type: "bearer" })
      .expect(401);
  });

  it("POST should fail if the business already exists", async () => {
    const { user1, business1User1 } = await fillBD();

    await supertest(app)
      .post(`/business`)
      .send({
        name: "newBusiness",
        routeName: business1User1.routeName, // exiting bussiness
        category: "clothing",
      })
      .auth(generateToken(user1._id), { type: "bearer" })
      .expect(400);
  });

  it("POST", async () => {
    const { user1 } = await fillBD();

    await supertest(app)
      .post(`/business`)
      .send({
        name: "newBusiness",
        routeName: "newBusiness",
        category: "clothing",
      })
      .auth(generateToken(user1._id), { type: "bearer" })
      .expect(200);

    await supertest(app).get(`/business/newBusiness`).expect(200);
  });

  it("POST should fail if not autenticated", async () => {
    await fillBD();

    await supertest(app)
      .post(`/business`)
      .send({
        name: "newBusiness",
        routeName: "newBusiness",
        category: "clothing",
      })
      .expect(401);
  });
});

describe("/business/:routeName", () => {
  afterEach(async () => {
    await dropTestDbConnectionAsync();
  });

  it("GET", async () => {
    const { business1User1 } = await fillBD();

    await supertest(app)
      .get(`/business/${business1User1.routeName}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toMatchInlineSnapshot(
          setAnyString<Business>("_id", "createdAt", "createdBy"),
          `
{
  "__v": 0,
  "_id": Anything,
  "aboutUsPage": {
    "visible": false,
  },
  "bannerImages": [],
  "createdAt": Anything,
  "createdBy": Anything,
  "hidden": false,
  "layouts": {
    "banner": {
      "type": "static",
    },
    "footer": {
      "type": "basic",
    },
    "search": {
      "type": "right",
    },
  },
  "logo": null,
  "name": "business1User1",
  "postCategories": [],
  "routeName": "business1User1",
}
`
        );
      });
  });
});

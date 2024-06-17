import supertest from 'supertest';
import { app } from '../../server';
import { dropTestDbConnectionAsync, generateToken, setAnyString } from '../../utils/test-utils';
import { Business } from '../../types/business';
import { fillBD } from '../../utils/test-BD';
import { getTestingRoute } from '../../utils/api';

describe('business', () => {
  describe('GET: /business', () => {
    afterEach(async () => {
      await dropTestDbConnectionAsync();
    });
    it('should return all visible business the business', async () => {
      await fillBD();

      await supertest(app)
        .get(
          getTestingRoute({
            path: '/business',
          }),
        )
        .expect(200)
        .then((response) => {
          expect(response.body.data.length).toEqual(4);

          expect(response.body.data[0]).toMatchInlineSnapshot(
            setAnyString<Business>('_id', 'createdAt', 'createdBy'),
            `
          {
            "__v": 0,
            "_id": Anything,
            "aboutUsPage": {
              "visible": false,
            },
            "bannerImages": [],
            "categories": [],
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
            "postFormFields": [
              "name",
              "currency",
              "clothingSizes",
              "colors",
              "description",
              "price",
              "details",
              "postCategoriesTags",
              "discount",
              "postPageLayout",
              "stockAmount",
              "images",
            ],
            "routeName": "business1User1",
            "shoppingPayment": {
              "history": [],
              "requests": [],
              "totalDebit": 0,
            },
          }
        `,
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
  });

  describe('POST: /business', () => {
    afterEach(async () => {
      await dropTestDbConnectionAsync();
    });

    it('should fail if the user can not create a business', async () => {
      const { user1 } = await fillBD({
        user1: {
          canCreateBusiness: false,
        },
      });

      await supertest(app)
        .post(
          getTestingRoute({
            path: '/business',
          }),
        )
        .send({
          name: 'newBusiness',
          routeName: 'newBusiness',
          categories: ['clothing'],
        })
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(401);
    });

    it('should fail if the business already exists', async () => {
      const { user1, business1User1 } = await fillBD();

      await supertest(app)
        .post(
          getTestingRoute({
            path: '/business',
          }),
        )
        .send({
          name: 'newBusiness',
          routeName: business1User1.routeName, // exiting bussiness
          categories: ['clothing'],
        })
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(400);
    });

    it('should add a new business', async () => {
      const { user1 } = await fillBD();

      await supertest(app)
        .post(
          getTestingRoute({
            path: '/business',
          }),
        )
        .send({
          name: 'newBusiness',
          routeName: 'newBusiness',
          categories: ['clothing'],
        })
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200);

      await supertest(app)
        .get(
          getTestingRoute({
            path: '/business/:newBusiness',
            urlParams: { newBusiness: 'newBusiness' },
          }),
        )
        .expect(200);
    });

    it('should fail if not autenticated', async () => {
      await fillBD();

      await supertest(app)
        .post(
          getTestingRoute({
            path: '/business',
          }),
        )
        .send({
          name: 'newBusiness',
          routeName: 'newBusiness',
          categories: ['clothing'],
        })
        .expect(401);
    });
  });

  describe('GET: /business/:routeName', () => {
    afterEach(async () => {
      await dropTestDbConnectionAsync();
    });

    it('should return the business', async () => {
      const { business1User1 } = await fillBD();

      await supertest(app)
        .get(
          getTestingRoute({
            path: '/business/:routeName',
            urlParams: { routeName: business1User1.routeName },
          }),
        )
        .expect(200)
        .then((response) => {
          expect(response.body).toMatchInlineSnapshot(
            setAnyString<Business>('_id', 'createdAt', 'createdBy'),
            `
          {
            "__v": 0,
            "_id": Anything,
            "aboutUsPage": {
              "visible": false,
            },
            "bannerImages": [],
            "categories": [],
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
            "postFormFields": [
              "name",
              "currency",
              "clothingSizes",
              "colors",
              "description",
              "price",
              "details",
              "postCategoriesTags",
              "discount",
              "postPageLayout",
              "stockAmount",
              "images",
            ],
            "routeName": "business1User1",
            "shoppingPayment": {
              "history": [],
              "requests": [],
              "totalDebit": 0,
            },
          }
        `,
          );
        });
    });
  });
});

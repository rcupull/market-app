import supertest from 'supertest';
import { app } from '../../server';
import { dropTestDbConnectionAsync, generateToken } from '../../utils/test-utils';
import { TestBDContent, fillBD } from '../../utils/test-BD';
import { getTestingRoute } from '../../utils/api';
import { Shopping, ShoppingState } from '../../types/shopping';
import { PostDto } from '../../types/post';
import { agendaServices as agendaServicesBase } from '../agenda/services';
import { isEqualIds } from '../../utils/general';
import { mockNotificationsServicesSendUpdateStockAmountMessage } from '../../utils/test-mocks/mockNotificationsServices';

jest.mock('../agenda/services', () => ({
  agenda: {
    schedule: jest.fn(),
    cancel: jest.fn(),
    on: jest.fn(),
    define: jest.fn(),
  },
  agendaServices: {
    scheduleRemoveValidationCode: jest.fn(),
    scheduleRemoveOrderInConstruction: jest.fn(),
  },
}));

const { scheduleRemoveOrderInConstruction } = agendaServicesBase as Record<
  keyof typeof agendaServicesBase,
  jest.Mock
>;

const handleAddPostsToOrder = async ({
  productPost1Business1User1,
  productPost2Business1User1,
  user1,
}: TestBDContent) => {
  // add one product to shopping
  await supertest(app)
    .post(
      getTestingRoute({
        path: '/shopping',
      }),
    )
    .send({
      postId: productPost1Business1User1._id,
      amountToAdd: 5,
    })
    .auth(generateToken(user1._id), { type: 'bearer' })
    .expect(200);

  // add de second product to shopping
  await supertest(app)
    .post(
      getTestingRoute({
        path: '/shopping',
      }),
    )
    .send({
      postId: productPost2Business1User1._id,
      amountToAdd: 10,
    })
    .auth(generateToken(user1._id), { type: 'bearer' })
    .expect(200);
};

describe('shopping', () => {
  describe('GET: /shopping', () => {
    afterEach(async () => {
      await dropTestDbConnectionAsync();
    });

    it('should fail the get if the user is not authenticated', async () => {
      const { business1User1 } = await fillBD();

      await supertest(app)
        .get(
          getTestingRoute({
            path: '/shopping',
            query: { routeName: business1User1.routeName },
          }),
        )
        .expect(401);
    });

    it('should return a new shopping', async () => {
      const { productPost1Business1User1, user1, business1User1 } = await fillBD();

      await supertest(app)
        .get(
          getTestingRoute({
            path: '/shopping',
            query: { routeName: business1User1.routeName },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200)
        .then((response) => {
          const shopping: Shopping = response.body.data[0];

          expect(shopping.history).toEqual([]);
          expect(shopping.purchaserId).toEqual(user1._id.toString());
          expect(shopping.purchaserName).toEqual(user1.name);
          expect(shopping.routeName).toEqual(business1User1.routeName);
          expect(shopping.state).toEqual('CONSTRUCTION');
          expect(shopping.posts[0].count).toEqual(5);
          expect(shopping.posts[0].postData._id).toContain(
            productPost1Business1User1._id.toString(),
          );
        });
    });
  });

  describe('GET: /shopping/owner', () => {
    afterEach(async () => {
      await dropTestDbConnectionAsync();
    });

    it('should fail the get if the user is not authenticated', async () => {
      const { business1User1 } = await fillBD();

      await supertest(app)
        .get(
          getTestingRoute({
            path: '/shopping/owner',
            query: { routeName: business1User1.routeName },
          }),
        )
        .expect(401);
    });

    it('should fail the get if the user is not the owner', async () => {
      const { business1User1, user2 } = await fillBD();

      await supertest(app)
        .get(
          getTestingRoute({
            path: '/shopping/owner',
            query: { routeName: business1User1.routeName },
          }),
        )
        .auth(generateToken(user2._id), { type: 'bearer' })
        .expect(401);
    });

    it('should return a new shopping if the user is the owner', async () => {
      const bd = await fillBD();

      const { productPost1Business1User1, user1, business1User1 } = bd;

      await supertest(app)
        .get(
          getTestingRoute({
            path: '/shopping/owner',
            query: { routeName: business1User1.routeName },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200)
        .then((response) => {
          const shopping: Shopping = response.body.data[0];

          expect(shopping.history).toEqual([]);
          expect(shopping.purchaserId).toEqual(user1._id.toString());
          expect(shopping.purchaserName).toEqual(user1.name);
          expect(shopping.routeName).toEqual(business1User1.routeName);
          expect(shopping.state).toEqual('CONSTRUCTION');
          expect(shopping.posts[0].count).toEqual(5);
          expect(shopping.posts[0].postData._id).toContain(
            productPost1Business1User1._id.toString(),
          );
        });
    });
  });

  describe('POST: /shopping', () => {
    afterEach(async () => {
      await dropTestDbConnectionAsync();
    });

    it('should fail post if the user is not autenticated', async () => {
      const { productPost1Business1User1 } = await fillBD();

      await supertest(app)
        .post(
          getTestingRoute({
            path: '/shopping',
          }),
        )
        .send({
          postId: productPost1Business1User1._id,
        })
        .expect(401);
    });

    it('should add a new shopping with several posts', async () => {
      const { notificationsServicesSendUpdateStockAmountMessage } =
        mockNotificationsServicesSendUpdateStockAmountMessage();

      const bd = await fillBD({
        noCreateInitialShopping: true,
        productPost1Business1User1: {
          stockAmount: 20,
        },
        productPost2Business1User1: {
          stockAmount: 30,
        },
      });

      const { business1User1, productPost1Business1User1, productPost2Business1User1, user1 } = bd;

      // checking the initial stokc amounts
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts',
          }),
        )
        .expect(200)
        .then((response) => {
          const posts: Array<PostDto> = response.body.data;
          const post1 = posts.find(({ _id }) => isEqualIds(_id, productPost1Business1User1._id));
          const post2 = posts.find(({ _id }) => isEqualIds(_id, productPost2Business1User1._id));

          expect(post1?.stockAmount).toEqual(20);
          expect(post1?.stockAmountAvailable).toEqual(20);

          expect(post2?.stockAmount).toEqual(30);
          expect(post2?.stockAmountAvailable).toEqual(30);
        });

      // create the shopping with two added posts
      await handleAddPostsToOrder(bd);

      // checking the created shopping
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/shopping',
            query: { routeName: business1User1.routeName },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200)
        .then((response) => {
          const shopping: Shopping = response.body.data[0];

          expect(shopping.history).toEqual([]);
          expect(shopping.purchaserId).toEqual(user1._id.toString());
          expect(shopping.purchaserName).toEqual(user1.name);
          expect(shopping.routeName).toEqual(business1User1.routeName);
          expect(shopping.state).toEqual('CONSTRUCTION');

          expect(shopping.posts[0].count).toEqual(5);
          expect(shopping.posts[0].postData._id).toContain(
            productPost1Business1User1._id.toString(),
          );

          expect(shopping.posts[1].count).toEqual(10);
          expect(shopping.posts[1].postData._id).toContain(
            productPost2Business1User1._id.toString(),
          );

          /**
           * call to agenda to remove
           */
          expect(scheduleRemoveOrderInConstruction.mock.calls[0][0].orderId).toEqual(
            shopping._id.toString(),
          );
        });

      // checking the current stock amount in both posts
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts',
          }),
        )
        .expect(200)
        .then((response) => {
          const posts: Array<PostDto> = response.body.data;
          const post1 = posts.find(({ _id }) => isEqualIds(_id, productPost1Business1User1._id));
          const post2 = posts.find(({ _id }) => isEqualIds(_id, productPost2Business1User1._id));

          expect(post1?.stockAmount).toEqual(20);
          expect(post1?.stockAmountAvailable).toEqual(15);

          expect(post2?.stockAmount).toEqual(30);
          expect(post2?.stockAmountAvailable).toEqual(20);
        });

      expect(
        notificationsServicesSendUpdateStockAmountMessage.mock.calls[0][0].stockAmountAvailable,
      ).toEqual(15);
      expect(notificationsServicesSendUpdateStockAmountMessage.mock.calls[0][0].postId).toEqual(
        productPost1Business1User1._id.toString(),
      );

      expect(
        notificationsServicesSendUpdateStockAmountMessage.mock.calls[1][0].stockAmountAvailable,
      ).toEqual(20);
      expect(notificationsServicesSendUpdateStockAmountMessage.mock.calls[1][0].postId).toEqual(
        productPost2Business1User1._id.toString(),
      );
    });

    it('should add all available products if the amount is greater than the stock', async () => {
      const { notificationsServicesSendUpdateStockAmountMessage } =
        mockNotificationsServicesSendUpdateStockAmountMessage();

      const bd = await fillBD({
        noCreateInitialShopping: true,
        productPost1Business1User1: {
          stockAmount: 2,
        },
      });

      const { business1User1, productPost1Business1User1, user1 } = bd;

      // checking the initial stokc amounts
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts',
          }),
        )
        .expect(200)
        .then((response) => {
          const posts: Array<PostDto> = response.body.data;

          const post1 = posts.find(({ _id }) => isEqualIds(_id, productPost1Business1User1._id));

          expect(post1?.stockAmount).toEqual(2);
          expect(post1?.stockAmountAvailable).toEqual(2);
        });

      // create the shopping with two added posts
      await handleAddPostsToOrder(bd);

      // checking the created shopping
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/shopping',
            query: { routeName: business1User1.routeName },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200)
        .then((response) => {
          const shopping: Shopping = response.body.data[0];

          expect(shopping.history).toEqual([]);
          expect(shopping.purchaserId).toEqual(user1._id.toString());
          expect(shopping.purchaserName).toEqual(user1.name);
          expect(shopping.routeName).toEqual(business1User1.routeName);
          expect(shopping.state).toEqual('CONSTRUCTION');

          expect(shopping.posts[0].count).toEqual(2);
          expect(shopping.posts[0].postData._id).toContain(
            productPost1Business1User1._id.toString(),
          );
        });

      // checking the current stock amount in both posts
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts',
          }),
        )
        .expect(200)
        .then((response) => {
          const posts: Array<PostDto> = response.body.data;

          const post1 = posts.find(({ _id }) => isEqualIds(_id, productPost1Business1User1._id));

          expect(post1?.stockAmount).toEqual(2);
          expect(post1?.stockAmountAvailable).toEqual(0);
        });

      expect(
        notificationsServicesSendUpdateStockAmountMessage.mock.calls[0][0].stockAmountAvailable,
      ).toEqual(0);
      expect(notificationsServicesSendUpdateStockAmountMessage.mock.calls[0][0].postId).toEqual(
        productPost1Business1User1._id.toString(),
      );
    });
  });

  describe('DELETE: /shopping', () => {
    afterEach(async () => {
      await dropTestDbConnectionAsync();
    });

    it('should fail if the user is not autenticated', async () => {
      const { business1User1 } = await fillBD();

      await supertest(app)
        .del(
          getTestingRoute({
            path: '/shopping',
          }),
        )
        .send({
          routeName: business1User1.routeName,
        })
        .expect(401);
    });

    it('should remove the whole shopping if has not postid', async () => {
      const { notificationsServicesSendUpdateStockAmountMessage } =
        mockNotificationsServicesSendUpdateStockAmountMessage();

      // ids has some object ids

      const bd = await fillBD({
        noCreateInitialShopping: true,
        productPost1Business1User1: {
          stockAmount: 20,
        },
        productPost2Business1User1: {
          stockAmount: 30,
        },
      });

      const { business1User1, user1, productPost1Business1User1, productPost2Business1User1 } = bd;

      // create the shopping with two added posts
      await handleAddPostsToOrder(bd);

      // checking the post stokc amounts
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts',
          }),
        )
        .expect(200)
        .then((response) => {
          const posts: Array<PostDto> = response.body.data;

          const post1 = posts.find(({ _id }) => isEqualIds(_id, productPost1Business1User1._id));
          const post2 = posts.find(({ _id }) => isEqualIds(_id, productPost2Business1User1._id));

          expect(post1?.stockAmount).toEqual(20);
          expect(post1?.stockAmountAvailable).toEqual(15);

          expect(post2?.stockAmount).toEqual(30);
          expect(post2?.stockAmountAvailable).toEqual(20);
        });

      expect(
        notificationsServicesSendUpdateStockAmountMessage.mock.calls[0][0].stockAmountAvailable,
      ).toEqual(15);
      expect(notificationsServicesSendUpdateStockAmountMessage.mock.calls[0][0].postId).toEqual(
        productPost1Business1User1._id.toString(),
      );

      expect(
        notificationsServicesSendUpdateStockAmountMessage.mock.calls[1][0].stockAmountAvailable,
      ).toEqual(20);
      expect(notificationsServicesSendUpdateStockAmountMessage.mock.calls[1][0].postId).toEqual(
        productPost2Business1User1._id.toString(),
      );

      //emove the whole order
      await supertest(app)
        .del(
          getTestingRoute({
            path: '/shopping',
          }),
        )
        .send({
          routeName: business1User1.routeName,
        })
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200);

      // checking the current shooping
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/shopping',
            query: { routeName: business1User1.routeName },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200)
        .then((response) => {
          expect(response.body.data.length).toEqual(0);
        });

      // checking the current stock amount in both posts
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts',
          }),
        )
        .expect(200)
        .then((response) => {
          const posts: Array<PostDto> = response.body.data;

          const post1 = posts.find(({ _id }) => isEqualIds(_id, productPost1Business1User1._id));
          const post2 = posts.find(({ _id }) => isEqualIds(_id, productPost2Business1User1._id));

          expect(post1?.stockAmount).toEqual(20);
          expect(post1?.stockAmountAvailable).toEqual(20);

          expect(post2?.stockAmount).toEqual(30);
          expect(post2?.stockAmountAvailable).toEqual(30);
        });

      expect(
        notificationsServicesSendUpdateStockAmountMessage.mock.calls[2][0].stockAmountAvailable,
      ).toEqual(20);
      expect(notificationsServicesSendUpdateStockAmountMessage.mock.calls[2][0].postId).toEqual(
        productPost1Business1User1._id.toString(),
      );

      expect(
        notificationsServicesSendUpdateStockAmountMessage.mock.calls[3][0].stockAmountAvailable,
      ).toEqual(30);
      expect(notificationsServicesSendUpdateStockAmountMessage.mock.calls[3][0].postId).toEqual(
        productPost2Business1User1._id.toString(),
      );
    });

    it('should remove only one post from  the orden when has postId', async () => {
      const { notificationsServicesSendUpdateStockAmountMessage } =
        mockNotificationsServicesSendUpdateStockAmountMessage();

      const bd = await fillBD({
        noCreateInitialShopping: true,
        productPost1Business1User1: {
          stockAmount: 20,
        },
        productPost2Business1User1: {
          stockAmount: 30,
        },
      });

      const { business1User1, user1, productPost1Business1User1, productPost2Business1User1 } = bd;

      // create the shopping with two added posts
      await handleAddPostsToOrder(bd);

      //emove the whole order
      await supertest(app)
        .del(
          getTestingRoute({
            path: '/shopping',
          }),
        )
        .send({
          routeName: business1User1.routeName,
          postId: productPost1Business1User1._id, // remove only the post1 from ths shopping
        })
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200);

      // checking the current shooping
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/shopping',
            query: { routeName: business1User1.routeName },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200)
        .then((response) => {
          const shopping: Shopping = response.body.data[0];

          expect(shopping.history).toEqual([]);
          expect(shopping.purchaserId).toEqual(user1._id.toString());
          expect(shopping.purchaserName).toEqual(user1.name);
          expect(shopping.routeName).toEqual(business1User1.routeName);
          expect(shopping.state).toEqual('CONSTRUCTION');

          expect(shopping.posts.length).toEqual(1);

          expect(shopping.posts[0].count).toEqual(10);
          expect(shopping.posts[0].postData._id).toContain(
            productPost2Business1User1._id.toString(),
          );
        });

      // checking the current stock amount in both posts
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts',
          }),
        )
        .expect(200)
        .then((response) => {
          const posts: Array<PostDto> = response.body.data;

          const post1 = posts.find(({ _id }) => isEqualIds(_id, productPost1Business1User1._id));
          const post2 = posts.find(({ _id }) => isEqualIds(_id, productPost2Business1User1._id));

          expect(post1?.stockAmount).toEqual(20);
          expect(post1?.stockAmountAvailable).toEqual(20); // has the initial amount

          expect(post2?.stockAmount).toEqual(30);
          expect(post2?.stockAmountAvailable).toEqual(20); // has the computed amount
        });

      expect(
        notificationsServicesSendUpdateStockAmountMessage.mock.calls[2][0].stockAmountAvailable,
      ).toEqual(20);
      expect(notificationsServicesSendUpdateStockAmountMessage.mock.calls[2][0].postId).toEqual(
        productPost1Business1User1._id.toString(),
      );

      expect(notificationsServicesSendUpdateStockAmountMessage.mock.calls[3]).toEqual(undefined);
    });
  });

  describe('POST: /shopping/:shoppingId/changeState', () => {
    afterEach(async () => {
      await dropTestDbConnectionAsync();
    });

    it('should change the state to READY_TO_DELIVER', async () => {
      const { user1, shopping1Business1User1 } = await fillBD({
        shopping1Business1User1: {
          state: ShoppingState.REQUESTED,
        },
      });

      if (!shopping1Business1User1) return;

      // checking the state
      expect(shopping1Business1User1.state).toEqual('REQUESTED');

      // change the state
      await supertest(app)
        .post(
          getTestingRoute({
            path: '/shopping/:shoppingId/changeState',
            urlParams: { shoppingId: shopping1Business1User1._id.toString() },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .send({
          state: 'READY_TO_DELIVER',
        })
        .expect(200);

      // checking the state
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/shopping/:shoppingId',
            urlParams: { shoppingId: shopping1Business1User1._id.toString() },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200)
        .then((response) => {
          const shopping: Shopping = response.body;
          expect(shopping.state).toEqual('READY_TO_DELIVER');
        });
    });

    it('should change the state to REJECTED', async () => {
      const { user1, shopping1Business1User1, productPost1Business1User1 } = await fillBD({
        shopping1Business1User1: {
          state: ShoppingState.REQUESTED,
        },
        productPost1Business1User1: {
          stockAmount: 20,
        },
      });

      if (!shopping1Business1User1) return;

      // checking the shoppinPost
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts/:postId',
            urlParams: { postId: productPost1Business1User1._id.toString() },
          }),
        )
        .expect(200)
        .then((response) => {
          const post: PostDto = response.body;

          expect(post.stockAmount).toEqual(20);
          expect(post.stockAmountAvailable).toEqual(15); // has not the initial amount. The shopping has someone
        });

      // checking the state
      expect(shopping1Business1User1.state).toEqual(ShoppingState.REQUESTED);

      // change the state
      await supertest(app)
        .post(
          getTestingRoute({
            path: '/shopping/:shoppingId/changeState',
            urlParams: { shoppingId: shopping1Business1User1._id.toString() },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .send({
          state: ShoppingState.REJECTED,
        })
        .expect(200);

      // checking the state
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/shopping/:shoppingId',
            urlParams: { shoppingId: shopping1Business1User1._id.toString() },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200)
        .then((response) => {
          const shopping: Shopping = response.body;
          expect(shopping.state).toEqual(ShoppingState.REJECTED);
        });

      // checking the shoppinPost
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts/:postId',
            urlParams: { postId: productPost1Business1User1._id.toString() },
          }),
        )
        .expect(200)
        .then((response) => {
          const post: PostDto = response.body;

          expect(post.stockAmount).toEqual(20);
          expect(post.stockAmountAvailable).toEqual(20); // has the initial amount
        });
    });

    it('should change the state to CANCELED', async () => {
      const { user1, shopping1Business1User1, productPost1Business1User1 } = await fillBD({
        shopping1Business1User1: {
          state: ShoppingState.REQUESTED,
        },
        productPost1Business1User1: {
          stockAmount: 20,
        },
      });

      if (!shopping1Business1User1) return;

      // checking the shoppinPost
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts/:postId',
            urlParams: { postId: productPost1Business1User1._id.toString() },
          }),
        )
        .expect(200)
        .then((response) => {
          const post: PostDto = response.body;

          expect(post.stockAmount).toEqual(20);
          expect(post.stockAmountAvailable).toEqual(15); // has not the initial amount. The shopping has someone
        });

      // checking the state
      expect(shopping1Business1User1.state).toEqual(ShoppingState.REQUESTED);

      // change the state
      await supertest(app)
        .post(
          getTestingRoute({
            path: '/shopping/:shoppingId/changeState',
            urlParams: { shoppingId: shopping1Business1User1._id.toString() },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .send({
          state: ShoppingState.CANCELED,
        })
        .expect(200);

      // checking the state
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/shopping/:shoppingId',
            urlParams: { shoppingId: shopping1Business1User1._id.toString() },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200)
        .then((response) => {
          const shopping: Shopping = response.body;
          expect(shopping.state).toEqual(ShoppingState.CANCELED);
        });

      // checking the shoppinPost
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts/:postId',
            urlParams: { postId: productPost1Business1User1._id.toString() },
          }),
        )
        .expect(200)
        .then((response) => {
          const post: PostDto = response.body;

          expect(post.stockAmount).toEqual(20);
          expect(post.stockAmountAvailable).toEqual(20); // has the initial amount
        });
    });

    it('should change the state to DELIVERED', async () => {
      const { user1, shopping1Business1User1, productPost1Business1User1 } = await fillBD({
        shopping1Business1User1: {
          state: ShoppingState.READY_TO_DELIVER,
        },
        productPost1Business1User1: {
          stockAmount: 20,
        },
      });

      if (!shopping1Business1User1) return;

      // checking the shoppinPost
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts/:postId',
            urlParams: { postId: productPost1Business1User1._id.toString() },
          }),
        )
        .expect(200)
        .then((response) => {
          const post: PostDto = response.body;

          expect(post.stockAmount).toEqual(20);
          expect(post.stockAmountAvailable).toEqual(15); // has not the initial amount. The shopping has someone
        });

      // checking the state
      expect(shopping1Business1User1.state).toEqual(ShoppingState.READY_TO_DELIVER);

      // change the state
      await supertest(app)
        .post(
          getTestingRoute({
            path: '/shopping/:shoppingId/changeState',
            urlParams: { shoppingId: shopping1Business1User1._id.toString() },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .send({
          state: ShoppingState.DELIVERED,
        })
        .expect(200);

      // checking the state
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/shopping/:shoppingId',
            urlParams: { shoppingId: shopping1Business1User1._id.toString() },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200)
        .then((response) => {
          const shopping: Shopping = response.body;
          expect(shopping.state).toEqual(ShoppingState.DELIVERED);
        });

      // checking the shoppinPost
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts/:postId',
            urlParams: { postId: productPost1Business1User1._id.toString() },
          }),
        )
        .expect(200)
        .then((response) => {
          const post: PostDto = response.body;

          expect(post.stockAmount).toEqual(15); // the ammount is decreased
          expect(post.stockAmountAvailable).toEqual(15); // the available amount is the same before change state
        });
    });

    it('should not change the state to CONSTRUCTION', async () => {
      const { user1, shopping1Business1User1 } = await fillBD({
        shopping1Business1User1: {
          state: ShoppingState.REQUESTED,
        },
      });

      if (!shopping1Business1User1) return;

      // change the state
      await supertest(app)
        .post(
          getTestingRoute({
            path: '/shopping/:shoppingId/changeState',
            urlParams: { shoppingId: shopping1Business1User1._id.toString() },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .send({
          state: 'CONSTRUCTION',
        })
        .expect(400);

      // checking the state
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/shopping/:shoppingId',
            urlParams: { shoppingId: shopping1Business1User1._id.toString() },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200)
        .then((response) => {
          const shopping: Shopping = response.body;
          expect(shopping.state).toEqual('REQUESTED');
        });
    });

    it('should not change the state from CONSTRUCTION', async () => {
      const { user1, shopping1Business1User1 } = await fillBD();

      if (!shopping1Business1User1) return;

      // change the state
      await supertest(app)
        .post(
          getTestingRoute({
            path: '/shopping/:shoppingId/changeState',
            urlParams: { shoppingId: shopping1Business1User1._id.toString() },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .send({
          state: 'READY_TO_DELIVER',
        })
        .expect(400);

      // checking the state
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/shopping/:shoppingId',
            urlParams: { shoppingId: shopping1Business1User1._id.toString() },
          }),
        )
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200)
        .then((response) => {
          const shopping: Shopping = response.body;
          expect(shopping.state).toEqual('CONSTRUCTION');
        });
    });
  });
});

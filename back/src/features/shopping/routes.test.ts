import supertest from 'supertest';
import { app } from '../../server';
import { dropTestDbConnectionAsync, generateToken } from '../../utils/test-utils';
import { fillBD } from '../../utils/test-BD';
import { getTestingRoute } from '../../utils/api';
import { Shopping } from '../../types/shopping';
import { Post } from '../../types/post';
import { notificationsServices } from '../notifications';

jest.mock('../notifications', () => ({
  notificationsServices: {
    sendNotification: jest.fn(),
    init: jest.fn(),
    sendNotificationToUpdate: jest.fn(),
  },
}));

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
      .post(
        getTestingRoute({
          path: '/shopping',
        }),
      )
      .send({
        postId: productPost1Business1User1._id,
      })
      .auth(generateToken(user1._id), { type: 'bearer' })
      .expect(200);

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
        const shopping: Shopping = response.body[0];

        expect(shopping.history).toEqual([]);
        expect(shopping.purchaserId).toEqual(user1.id);
        expect(shopping.purchaserName).toEqual(user1.name);
        expect(shopping.routeName).toEqual(business1User1.routeName);
        expect(shopping.state).toEqual('CONSTRUCTION');
        expect(shopping.posts[0].count).toEqual(1);
        expect(shopping.posts[0].post._id).toContain(productPost1Business1User1.id);
      });
  });
});

describe('POST: /shopping', () => {
  afterEach(async () => {
    await dropTestDbConnectionAsync();
  });

  it('should fail post if the user is not autenticated', async () => {
    const { productPost1Business1User1, user1, business1User1 } = await fillBD();

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
    const { productPost1Business1User1, productPost2Business1User1, user1, business1User1 } =
      await fillBD({
        overrideProductPost1Business1User1: {
          stockAmount: 20,
        },
        overrideProductPost2Business1User1: {
          stockAmount: 30,
        },
      });

    await supertest(app)
      .get(
        getTestingRoute({
          path: '/posts',
        }),
      )
      .expect(200)
      .then((response) => {
        const [post1, post2]: Array<Post> = response.body.data;

        expect(post1.stockAmount).toEqual(20);
        expect(post2.stockAmount).toEqual(30);
      });

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

    // get the shopping
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
        const shopping: Shopping = response.body[0];

        expect(shopping.history).toEqual([]);
        expect(shopping.purchaserId).toEqual(user1.id);
        expect(shopping.purchaserName).toEqual(user1.name);
        expect(shopping.routeName).toEqual(business1User1.routeName);
        expect(shopping.state).toEqual('CONSTRUCTION');

        expect(shopping.posts[0].count).toEqual(5);
        expect(shopping.posts[0].post._id).toContain(productPost1Business1User1.id);

        expect(shopping.posts[1].count).toEqual(10);
        expect(shopping.posts[1].post._id).toContain(productPost2Business1User1.id);
      });

    await supertest(app)
      .get(
        getTestingRoute({
          path: '/posts',
        }),
      )
      .expect(200)
      .then((response) => {
        const [post1, post2]: Array<Post> = response.body.data;

        expect(post1.stockAmount).toEqual(15);
        expect(post2.stockAmount).toEqual(20);
      });

    expect(
      (notificationsServices.sendNotificationToUpdate as jest.Mock).mock.calls[0][0].payload,
    ).toEqual({
      type: 'POST_AMOUNT_STOCK_CHANGE',
      stockAmount: 15,
      postId: productPost1Business1User1._id.toString(),
    });

    expect(
      (notificationsServices.sendNotificationToUpdate as jest.Mock).mock.calls[1][0].payload,
    ).toEqual({
      type: 'POST_AMOUNT_STOCK_CHANGE',
      stockAmount: 20,
      postId: productPost2Business1User1._id.toString(),
    });
  });
});

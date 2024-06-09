import supertest from 'supertest';
import { app } from '../../server';
import { dropTestDbConnectionAsync, generateToken } from '../../utils/test-utils';
import { TestBDContent, fillBD } from '../../utils/test-BD';
import { getTestingRoute } from '../../utils/api';
import { Shopping } from '../../types/shopping';
import { Post } from '../../types/post';
import * as notificationsHanldlesAll from '../notifications/handles';

jest.mock('../notifications/services', () => ({
  notificationsServices: {
    init: jest.fn(),
    sendNotificationToUpdate: jest.fn(),
  },
}));

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
      })
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
      })
    )
    .send({
      postId: productPost2Business1User1._id,
      amountToAdd: 10,
    })
    .auth(generateToken(user1._id), { type: 'bearer' })
    .expect(200);
};

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
        })
      )
      .expect(401);
  });

  it('should return a new shopping', async () => {
    const { productPost1Business1User1, user1, business1User1 } = await fillBD();

    await supertest(app)
      .post(
        getTestingRoute({
          path: '/shopping',
        })
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
        })
      )
      .auth(generateToken(user1._id), { type: 'bearer' })
      .expect(200)
      .then((response) => {
        const shopping: Shopping = response.body[0];

        expect(shopping.history).toEqual([]);
        expect(shopping.purchaserId).toEqual(user1._id.toString());
        expect(shopping.purchaserName).toEqual(user1.name);
        expect(shopping.routeName).toEqual(business1User1.routeName);
        expect(shopping.state).toEqual('CONSTRUCTION');
        expect(shopping.posts[0].count).toEqual(1);
        expect(shopping.posts[0].post._id).toContain(productPost1Business1User1._id.toString());
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
        })
      )
      .send({
        postId: productPost1Business1User1._id,
      })
      .expect(401);
  });

  it('should add a new shopping with several posts', async () => {
    const sendUpdateStockAmountMessage = jest
      .spyOn(notificationsHanldlesAll, 'sendUpdateStockAmountMessage')
      .mockImplementation(jest.fn());

    const bd = await fillBD({
      overrideProductPost1Business1User1: {
        stockAmount: 20,
      },
      overrideProductPost2Business1User1: {
        stockAmount: 30,
      },
    });

    const { business1User1, productPost1Business1User1, productPost2Business1User1, user1 } = bd;

    // checking the initial stokc amounts
    await supertest(app)
      .get(
        getTestingRoute({
          path: '/posts',
        })
      )
      .expect(200)
      .then((response) => {
        const [post1, post2]: Array<Post> = response.body.data;

        expect(post1.stockAmount).toEqual(20);
        expect(post2.stockAmount).toEqual(30);
      });

    // create the shopping with two added posts
    await handleAddPostsToOrder(bd);

    // checking the created shopping
    await supertest(app)
      .get(
        getTestingRoute({
          path: '/shopping',
          query: { routeName: business1User1.routeName },
        })
      )
      .auth(generateToken(user1._id), { type: 'bearer' })
      .expect(200)
      .then((response) => {
        const shopping: Shopping = response.body[0];

        expect(shopping.history).toEqual([]);
        expect(shopping.purchaserId).toEqual(user1._id.toString());
        expect(shopping.purchaserName).toEqual(user1.name);
        expect(shopping.routeName).toEqual(business1User1.routeName);
        expect(shopping.state).toEqual('CONSTRUCTION');

        expect(shopping.posts[0].count).toEqual(5);
        expect(shopping.posts[0].post._id).toContain(productPost1Business1User1._id.toString());

        expect(shopping.posts[1].count).toEqual(10);
        expect(shopping.posts[1].post._id).toContain(productPost2Business1User1._id.toString());
      });

    // checking the current stock amount in both posts
    await supertest(app)
      .get(
        getTestingRoute({
          path: '/posts',
        })
      )
      .expect(200)
      .then((response) => {
        const [post1, post2]: Array<Post> = response.body.data;

        expect(post1.stockAmount).toEqual(15);
        expect(post2.stockAmount).toEqual(20);
      });

    expect(sendUpdateStockAmountMessage.mock.calls[0][0].currentStockAmount).toEqual(15);
    expect(sendUpdateStockAmountMessage.mock.calls[0][0].postId).toEqual(
      productPost1Business1User1._id.toString()
    );

    expect(sendUpdateStockAmountMessage.mock.calls[1][0].currentStockAmount).toEqual(20);
    expect(sendUpdateStockAmountMessage.mock.calls[1][0].postId).toEqual(
      productPost2Business1User1._id.toString()
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
        })
      )
      .send({
        routeName: business1User1.routeName,
      })
      .expect(401);
  });

  it('should remove the whole order if has not postid', async () => {
    const sendUpdateStockAmountMessage = jest
      .spyOn(notificationsHanldlesAll, 'sendUpdateStockAmountMessage')
      .mockImplementation(jest.fn());

    const bd = await fillBD({
      overrideProductPost1Business1User1: {
        stockAmount: 20,
      },
      overrideProductPost2Business1User1: {
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
        })
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
        })
      )
      .auth(generateToken(user1._id), { type: 'bearer' })
      .expect(200)
      .then((response) => {
        expect(response.body.length).toEqual(0);
      });

    // checking the current stock amount in both posts
    await supertest(app)
      .get(
        getTestingRoute({
          path: '/posts',
        })
      )
      .expect(200)
      .then((response) => {
        const [post1, post2]: Array<Post> = response.body.data;

        expect(post1.stockAmount).toEqual(20);
        expect(post2.stockAmount).toEqual(30);
      });

    expect(sendUpdateStockAmountMessage.mock.calls[2][0].currentStockAmount).toEqual(20);
    expect(sendUpdateStockAmountMessage.mock.calls[2][0].postId).toEqual(
      productPost1Business1User1._id.toString()
    );

    expect(sendUpdateStockAmountMessage.mock.calls[3][0].currentStockAmount).toEqual(30);
    expect(sendUpdateStockAmountMessage.mock.calls[3][0].postId).toEqual(
      productPost2Business1User1._id.toString()
    );
  });

  it('should remove only one post from  the orden when has postId', async () => {
    const sendUpdateStockAmountMessage = jest
      .spyOn(notificationsHanldlesAll, 'sendUpdateStockAmountMessage')
      .mockImplementation(jest.fn());

    const bd = await fillBD({
      overrideProductPost1Business1User1: {
        stockAmount: 20,
      },
      overrideProductPost2Business1User1: {
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
        })
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
        })
      )
      .auth(generateToken(user1._id), { type: 'bearer' })
      .expect(200)
      .then((response) => {
        const shopping: Shopping = response.body[0];

        expect(shopping.history).toEqual([]);
        expect(shopping.purchaserId).toEqual(user1._id.toString());
        expect(shopping.purchaserName).toEqual(user1.name);
        expect(shopping.routeName).toEqual(business1User1.routeName);
        expect(shopping.state).toEqual('CONSTRUCTION');

        expect(shopping.posts.length).toEqual(1);

        expect(shopping.posts[0].count).toEqual(10);
        expect(shopping.posts[0].post._id).toContain(productPost2Business1User1._id.toString());
      });

    // checking the current stock amount in both posts
    await supertest(app)
      .get(
        getTestingRoute({
          path: '/posts',
        })
      )
      .expect(200)
      .then((response) => {
        const [post1, post2]: Array<Post> = response.body.data;

        expect(post1.stockAmount).toEqual(20); // has the initial amount
        expect(post2.stockAmount).toEqual(20); // has the computed amount
      });

    expect(sendUpdateStockAmountMessage.mock.calls[2][0].currentStockAmount).toEqual(20);
    expect(sendUpdateStockAmountMessage.mock.calls[2][0].postId).toEqual(
      productPost1Business1User1._id.toString()
    );

    expect(sendUpdateStockAmountMessage.mock.calls[3]).toEqual(undefined);
  });
});
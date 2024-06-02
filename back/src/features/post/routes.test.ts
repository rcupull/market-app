import supertest from 'supertest';
import { app } from '../../server';
import { dropTestDbConnectionAsync, generateToken } from '../../utils/test-utils';
import { fillBD } from '../../utils/test-BD';
import { body } from 'express-validator';

describe('POST: /posts/:postId/review', () => {
  afterEach(async () => {
    await dropTestDbConnectionAsync();
  });

  it('fail if the user is not autenticated', async () => {
    const { productPost1Business1User1 } = await fillBD();

    await supertest(app)
      .post(`/api-services/posts/${productPost1Business1User1._id}/review`)
      .send({
        value: 3,
      })
      .expect(401);
  });

  it('should faild the review because the owner can not review', async () => {
    const { user1, productPost1Business1User1 } = await fillBD();

    await supertest(app)
      .post(`/api-services/posts/${productPost1Business1User1._id}/review`)
      .send({
        value: 3,
      })
      .auth(generateToken(user1._id), { type: 'bearer' })
      .expect(400);
  });

  it('should review the post(1)', async () => {
    const { user2, user3, productPost1Business1User1 } = await fillBD();

    await supertest(app)
      .get(`/api-services/posts/${productPost1Business1User1._id}`)
      .then((response) => {
        expect(response.body.reviews).toEqual([0, 0, 0, 0, 0]);
      });
    ////////////////////
    await supertest(app)
      .post(`/api-services/posts/${productPost1Business1User1._id}/review`)
      .send({
        value: 3,
      })
      .auth(generateToken(user2._id), { type: 'bearer' })
      .expect(200);

    await supertest(app)
      .post(`/api-services/posts/${productPost1Business1User1._id}/review`)
      .send({
        value: 4,
      })
      .auth(generateToken(user3._id), { type: 'bearer' })
      .expect(200);

    ////////////////////
    await supertest(app)
      .get(`/api-services/posts/${productPost1Business1User1._id}`)
      .then((response) => {
        expect(response.body.reviews).toEqual([0, 0, 1, 1, 0]);
      });
  });

  it('should review the post(2)', async () => {
    const { user2, user3, productPost1Business1User1 } = await fillBD();

    await supertest(app)
      .get(`/api-services/posts/${productPost1Business1User1._id}`)
      .then((response) => {
        expect(response.body.reviews).toEqual([0, 0, 0, 0, 0]);
      });
    ////////////////////
    await supertest(app)
      .post(`/api-services/posts/${productPost1Business1User1._id}/review`)
      .send({
        value: 3,
      })
      .auth(generateToken(user2._id), { type: 'bearer' })
      .expect(200);

    await supertest(app)
      .post(`/api-services/posts/${productPost1Business1User1._id}/review`)
      .send({
        value: 3,
      })
      .auth(generateToken(user3._id), { type: 'bearer' })
      .expect(200);

    ////////////////////
    await supertest(app)
      .get(`/api-services/posts/${productPost1Business1User1._id}`)
      .then((response) => {
        expect(response.body.reviews).toEqual([0, 0, 2, 0, 0]);
      });
  });

  it('the user can not review the pots twice', async () => {
    const { user2, productPost1Business1User1 } = await fillBD();

    await supertest(app)
      .post(`/api-services/posts/${productPost1Business1User1._id}/review`)
      .send({
        value: 3,
      })
      .auth(generateToken(user2._id), { type: 'bearer' })
      .expect(200);

    await supertest(app)
      .get(`/api-services/posts/${productPost1Business1User1._id}`)
      .then((response) => {
        expect(response.body.reviews).toEqual([0, 0, 1, 0, 0]);
      });

    ///////////////////////////
    await supertest(app)
      .post(`/api-services/posts/${productPost1Business1User1._id}/review`)
      .send({
        value: 5,
      })
      .auth(generateToken(user2._id), { type: 'bearer' })
      .expect(400);

    await supertest(app)
      .get(`/api-services/posts/${productPost1Business1User1._id}`)
      .then((response) => {
        expect(response.body.reviews).toEqual([0, 0, 1, 0, 0]);
      });
  });
});

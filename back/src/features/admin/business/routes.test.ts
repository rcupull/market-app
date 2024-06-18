import supertest from 'supertest';
import { fillBD } from '../../../utils/test-BD';
import { dropTestDbConnectionAsync, generateToken } from '../../../utils/test-utils';
import { getTestingRoute } from '../../../utils/api';
import { app } from '../../../server';

describe('admin', () => {
  describe('DELETE: /admin/business/:routeName', () => {
    afterEach(async () => {
      await dropTestDbConnectionAsync();
    });

    it('should fail if not autenticated', async () => {
      const { business1User1 } = await fillBD();

      //delete business
      await supertest(app)
        .del(
          getTestingRoute({
            path: '/admin/business/:routeName',
            urlParams: { routeName: business1User1.routeName },
          }),
        )
        .expect(401);
    });

    it('should fail if has not access', async () => {
      const { business1User1, admin } = await fillBD({
        admin: { specialAccess: [] },
      });

      //delete business
      await supertest(app)
        .del(
          getTestingRoute({
            path: '/admin/business/:routeName',
            urlParams: { routeName: business1User1.routeName },
          }),
        )
        .auth(generateToken(admin._id), { type: 'bearer' })
        .expect(401);
    });

    it('should remove all posts and business', async () => {
      const { business1User1, admin } = await fillBD({
        admin: { specialAccess: ['business__remove'] },
      });

      await supertest(app)
        .get(
          getTestingRoute({
            path: '/business/:routeName',
            urlParams: { routeName: business1User1.routeName },
          }),
        )
        .expect(200)
        .then((response) => {
          expect(response.body.routeName).toEqual(business1User1.routeName);
        });

      //get business posts
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts',
            query: { routeNames: [business1User1.routeName] },
          }),
        )
        .expect(200)
        .then((response) => {
          expect(response.body.data.length).toEqual(2);
        });

      //delete business
      await supertest(app)
        .del(
          getTestingRoute({
            path: '/admin/business/:routeName',
            urlParams: { routeName: business1User1.routeName },
          }),
        )
        .auth(generateToken(admin._id), { type: 'bearer' })
        .expect(200);

      //get business posts(should be 0)
      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts',
            query: { routeNames: [business1User1.routeName] },
          }),
        )
        .expect(200)
        .then((response) => {
          expect(response.body.data.length).toEqual(0);
        });

      await supertest(app)
        .get(
          getTestingRoute({
            path: '/business/:routeName',
            urlParams: { routeName: business1User1.routeName },
          }),
        )
        .expect(404)
        .then((response) => {
          expect(response.body.routeName).toEqual(undefined);
        });
    });
  });
});

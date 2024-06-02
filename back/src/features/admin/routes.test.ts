import supertest from 'supertest';
import { app } from '../../server';
import { dropTestDbConnectionAsync, generateToken } from '../../utils/test-utils';
import { fillBD } from '../../utils/test-BD';

describe('GET: /admin/users', () => {
  afterEach(async () => {
    await dropTestDbConnectionAsync();
  });

  it('should fail when if not admin', async () => {
    const { user1 } = await fillBD();

    await supertest(app)
      .get(`/api-services/admin/users`)
      .auth(generateToken(user1._id), { type: 'bearer' })
      .expect(401);
  });

  it('should return all users', async () => {
    const { admin } = await fillBD();

    await supertest(app)
      .get(`/api-services/admin/users`)
      .auth(generateToken(admin._id), { type: 'bearer' })
      .expect(200)
      .then((response) => {
        expect(response.body.paginator).toMatchInlineSnapshot(`
          {
            "dataCount": 2,
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

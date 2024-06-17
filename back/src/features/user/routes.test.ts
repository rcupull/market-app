import supertest from 'supertest';
import { app } from '../../server';
import { dropTestDbConnectionAsync, generateToken, setAnyString } from '../../utils/test-utils';
import { Image } from '../../types/general';
import { User } from '../../types/user';
import { fillBD } from '../../utils/test-BD';

describe('users', () => {
  describe('GET: /user/:userId', () => {
    afterEach(async () => {
      await dropTestDbConnectionAsync();
    });

    it('should return the user', async () => {
      const { user1 } = await fillBD();

      await supertest(app)
        .get(`/api-services/user/${user1._id}`)
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200)
        .then((response) => {
          expect(response.body).toMatchInlineSnapshot(
            setAnyString<User>('_id', 'createdAt'),
            `
          {
            "__v": 0,
            "_id": Anything,
            "canCreateBusiness": true,
            "createdAt": Anything,
            "email": "user1@gmail.com",
            "name": "user1",
            "profileImage": null,
            "role": "user",
            "specialAccess": [],
            "validated": true,
          }
        `,
          );
        });
    });

    it('should fail if not autenticated', async () => {
      const { user1 } = await fillBD();

      await supertest(app).get(`/api-services/user/${user1._id}`).expect(401);
    });

    it('should fail if the user has no access', async () => {
      const { user1, user2 } = await fillBD();

      await supertest(app)
        .get(`/api-services/user/${user2._id}`) // wrong id
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(401);
    });
  });

  describe('PUT: /user/:userId', () => {
    afterEach(async () => {
      await dropTestDbConnectionAsync();
    });

    it('should update the user', async () => {
      const { user1 } = await fillBD();

      const profileImage: Image = {
        height: 300,
        width: 300,
        src: 'http://link-src.com/image.png',
      };

      //change the profileImage
      await supertest(app)
        .put(`/api-services/user/${user1._id}`)
        .send({ profileImage })
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200);

      await supertest(app)
        .get(`/api-services/user/${user1._id}`)
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(200)
        .then((response) => {
          expect(response.body).toMatchInlineSnapshot(
            setAnyString<User>('_id', 'createdAt'),
            `
          {
            "__v": 0,
            "_id": Anything,
            "canCreateBusiness": true,
            "createdAt": Anything,
            "email": "user1@gmail.com",
            "name": "user1",
            "profileImage": {
              "height": 300,
              "src": "http://link-src.com/image.png",
              "width": 300,
            },
            "role": "user",
            "specialAccess": [],
            "validated": true,
          }
        `,
          );
        });
    });

    it('should fail if not autenticated', async () => {
      const { user1 } = await fillBD();

      await supertest(app).put(`/api-services/user/${user1._id}`).expect(401);
    });

    it('should fail if the user has no access', async () => {
      const { user1, user2 } = await fillBD();

      await supertest(app)
        .put(`/api-services/user/${user2._id}`) // wrong id
        .auth(generateToken(user1._id), { type: 'bearer' })
        .expect(401);
    });
  });
});

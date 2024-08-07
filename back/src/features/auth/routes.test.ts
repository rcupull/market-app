import supertest from 'supertest';
import { app } from '../../server';
import { dropTestDbConnectionAsync, setAnyString } from '../../utils/test-utils';
import { User } from '../../types/user';
import { fillBD } from '../../utils/test-BD';
import { TYPE_DEVICE } from '../../types/auth';

describe('POST /auth/sign-in', () => {
  afterEach(async () => {
    await dropTestDbConnectionAsync();
  });

  it('should fail if the user is not validated', async () => {
    await fillBD({ user1: { validated: false } });

    await supertest(app)
      .post(`/api-services/auth/sign-in`)
      .set('User-Agent', 'some decription')
      .send({
        username: 'user1@gmail.com',
        password: 'password_123_user1',
        typeDevice: TYPE_DEVICE.WEB
      })
      .expect(401);
  });

  it('should sign in', async () => {
    await fillBD({ noCreateSesions: true });

    await supertest(app)
      .post(`/api-services/auth/sign-in`)
      .set('User-Agent', 'some decription')
      .send({
        username: 'user1@gmail.com',
        password: 'password_123_user1',
        typeDevice: TYPE_DEVICE.WEB
      })
      .expect(200)
      .then((response) => {
        const { user, accessToken, refreshToken } = response.body;

        expect(accessToken).toBeTruthy();
        expect(refreshToken).toBeTruthy();

        expect(user).toMatchInlineSnapshot(
          setAnyString<User>('_id', 'createdAt'),
          `
          {
            "_id": Anything,
            "canCreateBusiness": true,
            "createdAt": Anything,
            "email": "user1@gmail.com",
            "name": "user1",
            "profileImage": null,
            "role": "user",
            "validated": true,
          }
        `
        );
      });
  });
});

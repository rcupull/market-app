import supertest from 'supertest';
import { app } from '../../server';
import { dropTestDbConnectionAsync, setAnyString } from '../../utils/test-utils';
import { fillBD } from '../../utils/test-BD';
import { getTestingRoute } from '../../utils/api';
import { Post } from '../../types/post';

describe('posts', () => {
  describe('GET: /posts', () => {
    afterEach(async () => {
      await dropTestDbConnectionAsync();
    });

    it('should match snapshot', async () => {
      await fillBD();

      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts',
          }),
        )
        .expect(200)
        .then((response) => {
          expect(response.body.data[0]).toMatchInlineSnapshot(
            setAnyString<Post>('_id', 'createdAt', 'createdBy'),
            `
            {
              "__v": 0,
              "_id": Anything,
              "amountInProcess": 0,
              "clothingSizes": [],
              "colors": [],
              "createdAt": Anything,
              "createdBy": Anything,
              "hidden": false,
              "hiddenBusiness": false,
              "images": [],
              "name": "productPost5Business1User2",
              "postCategoriesTags": [
                "cat1",
                "cat2",
                "cat3",
              ],
              "postType": "product",
              "price": 10,
              "routeName": "business1User2",
              "stockAmount": null,
              "stockAmountAvailable": null,
            }
          `,
          );
        });
    });

    it('should return all posts', async () => {
      await fillBD();

      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts',
          }),
        )
        .expect(200)
        .then((response) => {
          expect(response.body.data.length).toEqual(10);
        });
    });

    it('should return all posts of a business', async () => {
      const { business1User1, business1User2 } = await fillBD();

      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts',
            query: { routeNames: [business1User1.routeName] },
          }),
        )
        .expect(200)
        .then((response) => {
          expect(response.body.data.length).toEqual(5);
        });

      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts',
            query: { routeNames: [business1User2.routeName] },
          }),
        )
        .expect(200)
        .then((response) => {
          expect(response.body.data.length).toEqual(5);
        });
    });
  });

  describe('GET: /posts/:postId/related', () => {
    afterEach(async () => {
      await dropTestDbConnectionAsync();
    });

    it('should return all related posts', async () => {
      const { productPost1Business1User2 } = await fillBD({
        productPost1Business1User2: {
          postCategoriesTags: ['c1', 'c2', 'p6'],
        },
        productPost2Business1User2: {
          postCategoriesTags: ['c1', 'c3', 'n1'], //related
        },
        productPost3Business1User2: {
          postCategoriesTags: ['c1', 'c2', 'c3', 'c4'], //related
        },
        productPost4Business1User2: {
          postCategoriesTags: ['n1', 'n2', 'n3'], //no related
        },
        productPost5Business1User2: {
          postCategoriesTags: ['c1', 'n2', 'n3'], //related
        },
      });

      await supertest(app)
        .get(
          getTestingRoute({
            path: '/posts/:postId/related',
            urlParams: { postId: productPost1Business1User2._id.toString() },
          }),
        )
        .expect(200)
        .then((response) => {
          const relatedPosts: Post[] = response.body.data;
          expect(relatedPosts.length).toEqual(3);

          expect(relatedPosts.map((p) => p.name)).toEqual([
            'productPost2Business1User2',
            'productPost3Business1User2',
            'productPost5Business1User2',
          ]);

          expect(response.body.paginator).toMatchInlineSnapshot(`
            {
              "dataCount": 3,
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
});

import { dropTestDbConnectionAsync, paginateOptionsForTesting } from '../../utils/test-utils';
import { fillBD } from '../../utils/test-BD';
import {
  postServicesGetAll,
  postServicesGetAllWithPagination,
  postServicesGetOne,
} from './services';

describe('services', () => {
  afterEach(async () => {
    await dropTestDbConnectionAsync();
  });

  describe('getAllWithPagination', () => {
    it('should return all posts with pagination', async () => {
      await fillBD();

      const paginatedPosts = await postServicesGetAllWithPagination({
        paginateOptions: paginateOptionsForTesting,
        query: {},
      });

      const { data, ...omittedProps } = paginatedPosts;

      expect(data.length).toBe(10);
      expect(omittedProps).toMatchInlineSnapshot(`
        {
          "paginator": {
            "dataCount": 10,
            "hasNextPage": false,
            "hasPrevPage": false,
            "limit": 10,
            "nextPage": null,
            "page": 1,
            "pageCount": 1,
            "pagingCounter": 1,
            "prevPage": null,
          },
        }
      `);
    });
  });

  describe('getAll', () => {
    it('should return all posts without pagination', async () => {
      await fillBD();

      const posts = await postServicesGetAll({ query: {} });

      expect(posts.length).toBe(10);
    });

    it('should return filtering by <createdBy>', async () => {
      const { user1, user2 } = await fillBD();

      const response1 = await postServicesGetAll({
        query: {
          createdBy: user1._id.toString(),
        },
      });

      expect(response1.length).toEqual(5);

      //////////////////////////////////////////////

      const response2 = await postServicesGetAll({
        query: {
          createdBy: user2._id.toString(),
        },
      });

      expect(response2.length).toEqual(5);
    });

    it('should return filtering by <postType>', async () => {
      await fillBD({
        productPost1Business1User1: {
          postType: 'link',
        },
        productPost2Business1User1: {
          postType: 'link',
        },
      });

      const response1 = await postServicesGetAll({
        query: {
          postType: 'product',
        },
      });

      expect(response1.length).toBe(8);

      //////////////////////////////////////////////

      const response2 = await postServicesGetAll({
        query: {
          postType: 'link',
        },
      });

      expect(response2.length).toBe(2);
    });

    it('should return filtering by <routeNames>', async () => {
      const { business1User1, business2User1, business1User2 } = await fillBD();

      const response1 = await postServicesGetAll({
        query: {
          routeNames: [business1User1.routeName],
        },
      });

      expect(response1.length).toEqual(5);
      //////////////////////////////////////////////

      const response2 = await postServicesGetAll({
        query: {
          routeNames: [business2User1.routeName],
        },
      });

      expect(response2.length).toBe(0);

      //////////////////////////////////////////////

      const response3 = await postServicesGetAll({
        query: {
          routeNames: [business1User2.routeName],
        },
      });

      expect(response3.length).toBe(5);
    });
  });

  describe('getOne', () => {
    it('should return one post', async () => {
      const { productPost1Business1User1 } = await fillBD();

      const post = await postServicesGetOne({
        query: {
          _id: productPost1Business1User1._id,
        },
      });

      if (!post) return;
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, createdAt, createdBy, ...rest } = post.toJSON();
      expect(rest).toMatchInlineSnapshot(`
        {
          "__v": 0,
          "clothingSizes": [],
          "colors": [],
          "hidden": false,
          "hiddenBusiness": false,
          "images": [],
          "name": "productPost1Business1User1",
          "postCategoriesTags": [
            "cat1",
            "cat2",
            "cat3",
          ],
          "postType": "product",
          "price": 10,
          "routeName": "business1User1",
          "stockAmount": null,
        }
      `);
    });
  });
});

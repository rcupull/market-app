import { dropTestDbConnectionAsync, paginateOptionsForTesting } from '../../utils/test-utils';
import { fillBD } from '../../utils/test-BD';
import { postServices } from './services';

describe('services', () => {
  afterEach(async () => {
    await dropTestDbConnectionAsync();
  });

  describe('getAllWithPagination', () => {
    it('should return all posts with pagination', async () => {
      await fillBD();

      const paginatedPosts = await postServices.getAllWithPagination({
        paginateOptions: paginateOptionsForTesting,
      });

      const { data, ...omittedProps } = paginatedPosts;

      expect(data.length).toBe(2);
      expect(omittedProps).toMatchInlineSnapshot(`
        {
          "paginator": {
            "dataCount": 2,
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

      const posts = await postServices.getAll({});

      expect(posts.length).toBe(2);
    });
  });

  describe('getOne', () => {
    it('should return one post', async () => {
      const { productPost1Business1User1 } = await fillBD();

      const post = await postServices.getOne({ postId: productPost1Business1User1._id.toString() });

      if (!post) return;
      //eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, createdAt, createdBy, ...rest } = post.toJSON();
      expect(rest).toMatchInlineSnapshot(`
              {
                "__v": 0,
                "clothingSizes": [],
                "colors": [],
                "currency": "CUP",
                "hidden": false,
                "hiddenBusiness": false,
                "images": [],
                "name": "chancletas",
                "postCategoriesTags": [
                  "cat1",
                  "cat2",
                  "cat3",
                ],
                "postType": "product",
                "price": 10,
                "reviews": [
                  0,
                  0,
                  0,
                  0,
                  0,
                ],
                "reviewsUserIds": [],
                "routeName": "business1User1",
                "stockAmount": null,
              }
          `);
    });
  });
});

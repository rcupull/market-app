import { dropTestDbConnectionAsync, paginateOptionsForTesting } from '../../utils/test-utils';
import { fillBD } from '../../utils/test-BD';
import { shoppingServices } from './services';

describe('shopping services', () => {
  afterEach(async () => {
    await dropTestDbConnectionAsync();
  });

  describe('getAllWithPagination', () => {
    it('should return all posts with pagination', async () => {
      await fillBD();

      const result = await shoppingServices.getAllWithPagination({
        paginateOptions: paginateOptionsForTesting,
        query: {},
      });

      const { data, ...omittedProps } = result;

      expect(data.length).toBe(1);
      expect(omittedProps).toMatchInlineSnapshot(`
        {
          "paginator": {
            "dataCount": 1,
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

      const result = await shoppingServices.getAll({ query: {} });

      expect(result.length).toBe(1);
    });
  });

  describe('getOne', () => {
    it('should return all posts without pagination', async () => {
      const { shopping1Business1User1 } = await fillBD();

      if (!shopping1Business1User1) return;

      const result = await shoppingServices.getOne({
        query: { _id: shopping1Business1User1._id.toString() },
      });

      if (!result) return;

      const { createdAt, _id, ...omitted } = result.toJSON();

      expect(omitted).toMatchInlineSnapshot(`
        {
          "__v": 0,
          "history": [],
          "posts": [
            {
              "count": 5,
              "lastUpdatedDate": 2024-06-14T04:18:31.128Z,
              "post": {
                "__v": 0,
                "_id": "666bc497b8cbfa9bc9b55978",
                "clothingSizes": [],
                "colors": [],
                "createdAt": 2024-06-14T04:18:30.121Z,
                "createdBy": "666bc497b8cbfa9bc9b55970",
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
              },
              "purshaseNotes": {
                "interestedByClothingSizes": [],
                "interestedByColors": [],
              },
            },
          ],
          "purchaserId": "666bc497b8cbfa9bc9b55970",
          "purchaserName": "user1",
          "routeName": "business1User1",
          "state": "CONSTRUCTION",
        }
      `);
    });
  });
});

import {
  dropTestDbConnectionAsync,
  paginateOptionsForTesting,
  setAnyString,
} from '../../utils/test-utils';
import { fillBD } from '../../utils/test-BD';
import { shoppingServices } from './services';
import { Shopping } from '../../types/shopping';

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

      expect(result.toJSON()).toMatchInlineSnapshot(
        setAnyString<Shopping>(
          '_id',
          'createdAt',
          'posts.0.postData._id',
          'posts.0.lastUpdatedDate',
          'purchaserId',
        ),
        `
        {
          "__v": 0,
          "_id": Anything,
          "createdAt": Anything,
          "currency": "CUP",
          "history": [],
          "posts": [
            {
              "count": 5,
              "lastUpdatedDate": Anything,
              "postData": {
                "_id": Anything,
                "images": [],
                "name": "chancletas",
                "price": 10,
              },
              "purshaseNotes": {
                "interestedByClothingSizes": [],
                "interestedByColors": [],
              },
            },
          ],
          "purchaserId": Anything,
          "purchaserName": "user1",
          "routeName": "business1User1",
          "state": "CONSTRUCTION",
        }
      `,
      );
    });
  });
});

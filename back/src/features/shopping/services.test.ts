import {
  dropTestDbConnectionAsync,
  paginateOptionsForTesting,
  setAnyString
} from '../../utils/test-utils';
import { fillBD } from '../../utils/test-BD';
import {
  shoppingServicesGetAll,
  shoppingServicesGetAllWithPagination,
  shoppingServicesGetOne
} from './services';
import { Shopping } from '../../types/shopping';

describe('shopping services', () => {
  afterEach(async () => {
    await dropTestDbConnectionAsync();
  });

  describe('getAllWithPagination', () => {
    it('should return all shopping with pagination', async () => {
      await fillBD();

      const result = await shoppingServicesGetAllWithPagination({
        paginateOptions: paginateOptionsForTesting,
        query: {}
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
    it('should return all shopping without pagination', async () => {
      await fillBD();

      const result = await shoppingServicesGetAll({ query: {} });

      expect(result.length).toBe(1);
    });
  });

  describe('getOne', () => {
    it('should return one shopping', async () => {
      const { shopping1Business1User1 } = await fillBD();

      const result = await shoppingServicesGetOne({
        query: { _id: shopping1Business1User1._id.toString() }
      });

      if (!result) return;

      expect(result.toJSON()).toMatchInlineSnapshot(
        setAnyString<Shopping>(
          '_id',
          'createdAt',
          'posts.0.postData._id',
          'posts.0.lastUpdatedDate',
          'purchaserId'
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
                "name": "productPost1Business1User1",
                "price": 10,
              },
              "purshaseNotes": {
                "interestedByClothingSizes": [],
                "interestedByColors": [],
              },
            },
          ],
          "purchaserId": Anything,
          "routeName": "business1User1",
          "state": "CONSTRUCTION",
        }
      `
      );
    });
  });
});

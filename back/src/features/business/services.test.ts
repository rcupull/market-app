import { dropTestDbConnectionAsync, paginateOptionsForTesting } from '../../utils/test-utils';
import { fillBD } from '../../utils/test-BD';
import { businessServices } from './services';

describe('services', () => {
  afterEach(async () => {
    await dropTestDbConnectionAsync();
  });

  describe('getAllWithPagination', () => {
    it('should return all business with pagination', async () => {
      await fillBD();

      const paginatedPosts = await businessServices.getAllWithPagination({
        paginateOptions: paginateOptionsForTesting,
      });

      const { data, ...omittedProps } = paginatedPosts;

      expect(data.length).toBe(6);
      expect(omittedProps).toMatchInlineSnapshot(`
        {
          "paginator": {
            "dataCount": 6,
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
    it('should return all busines without pagination', async () => {
      await fillBD();

      const response = await businessServices.getAll({});

      expect(response.length).toBe(6);
    });
  });
});

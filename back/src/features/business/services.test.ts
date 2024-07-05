import { dropTestDbConnectionAsync, paginateOptionsForTesting } from '../../utils/test-utils';
import { fillBD } from '../../utils/test-BD';
import { businessServicesGetAll, businessServicesGetAllWithPagination } from './services';

describe('services', () => {
  afterEach(async () => {
    await dropTestDbConnectionAsync();
  });

  describe('getAllWithPagination', () => {
    it('should return all business with pagination', async () => {
      await fillBD();

      const paginatedPosts = await businessServicesGetAllWithPagination({
        paginateOptions: paginateOptionsForTesting,
        query: {},
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

      const response = await businessServicesGetAll({ query: {} });

      expect(response.length).toBe(6);
    });

    it('should search in name using search', async () => {
      await fillBD({
        business1User1: {
          name: 'newName',
        },
        business2User1: {
          name: 'newName1',
        },
        business1User2: {
          name: 'newName12',
        },
        business2User2: {
          name: 'newName123',
        },
      });

      ///////////////////////////////////////////////////////////
      expect(
        (
          await businessServicesGetAll({
            query: {
              search: 'somethingWrong',
            },
          })
        ).map(({ name }) => name)
      ).toEqual([]);

      ///////////////////////////////////////////////////////////
      expect(
        (
          await businessServicesGetAll({
            query: {
              search: 'wNaMe1',
            },
          })
        ).map(({ name }) => name)
      ).toEqual(['newName1', 'newName12', 'newName123']);
      ///////////////////////////////////////////////////////////

      expect(
        (
          await businessServicesGetAll({
            query: {
              search: 'wNaMe12',
            },
          })
        ).map(({ name }) => name)
      ).toEqual(['newName12', 'newName123']);

      ///////////////////////////////////////////////////////////

      expect(
        (
          await businessServicesGetAll({
            query: {
              search: '',
            },
          })
        ).map(({ name }) => name)
      ).toEqual([
        'newName',
        'newName1',
        'business3User1',
        'newName12',
        'newName123',
        'business3User2',
      ]);
    });

    it('should search in postCategories using search', async () => {
      await fillBD({
        business1User1: {
          postCategories: [
            {
              label: 'cat1',
              tag: 'tagCat1',
              hidden: false,
            },
            {
              label: 'cat12',
              tag: 'tagCat12',
              hidden: false,
            },
          ],
        },
        business2User1: {
          postCategories: [
            {
              label: 'cat123',
              tag: 'tagCat123',
              hidden: false,
            },
            {
              label: 'cat1234',
              tag: 'tagCat1234',
              hidden: false,
            },
          ],
        },
        business1User2: {
          postCategories: [
            {
              label: 'cat12345',
              tag: 'tagCat12345',
              hidden: false,
            },
            {
              label: 'cat123456',
              tag: 'tagCat123456',
              hidden: false,
            },
          ],
        },
      });

      ///////////////////////////////////////////////////////////
      expect(
        (
          await businessServicesGetAll({
            query: {
              search: 'somethingWrong',
            },
          })
        ).map(({ name }) => name)
      ).toEqual([]);

      ///////////////////////////////////////////////////////////
      expect(
        (
          await businessServicesGetAll({
            query: {
              search: 'aT1234',
            },
          })
        ).map(({ name }) => name)
      ).toEqual(['business2User1', 'business1User2']);
      ///////////////////////////////////////////////////////////

      expect(
        (
          await businessServicesGetAll({
            query: {
              search: '',
            },
          })
        ).map(({ name }) => name)
      ).toEqual([
        'business1User1',
        'business2User1',
        'business3User1',
        'business1User2',
        'business2User2',
        'business3User2',
      ]);
    });
  });
});

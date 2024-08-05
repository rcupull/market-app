import { FilterQuery } from 'mongoose';
import { getFlattenUndefinedJson, isArray } from '../../utils/general';
import { PushNotification } from '../../types/notifications';

export interface GetAllNotificationsArgs extends FilterQuery<PushNotification> {}

export const getAllFilterQuery = ({
  ...omittedQuery
}: GetAllNotificationsArgs): FilterQuery<PushNotification> => {
  const filterQuery: FilterQuery<PushNotification> = omittedQuery;

  if (isArray(filterQuery.userIds) && filterQuery.userIds.length) {
    filterQuery.userIds = { $in: filterQuery.userIds };
  }

  return getFlattenUndefinedJson(filterQuery);
};

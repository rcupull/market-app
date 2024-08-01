import { QueryHandle } from '../../types/general';
import { AuthSessionModel } from '../../schemas/auth';
import { userServicesUpdateOne } from '../user/services';

export const authServicesRemoveSession: QueryHandle<{ refreshToken: string }, void> = async ({
  refreshToken,
}) => {
  try {
    const session = await AuthSessionModel.findOneAndDelete({ refreshToken });
    if (session) {
      /**
       * Remove the firebase token when signOut
       */
      await userServicesUpdateOne({
        query: {
          _id: session.userId,
        },
        update: {
          firebaseToken: null,
        },
      });
    }
  } catch (error) {
    return;
  }
};

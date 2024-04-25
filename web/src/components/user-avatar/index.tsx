import { useAuth } from 'features/api-slices/useAuth';

import { StyleProps } from 'types/general';
import { getImageEndpoint } from 'utils/api';
import { getInitials } from 'utils/business';
import { cn } from 'utils/general';

export interface UserAvatarProps extends StyleProps {}

export const UserAvatar = ({ className }: UserAvatarProps) => {
  const { authData } = useAuth();

  let profileImageSrc = authData?.user?.profileImage?.src;
  const profileName = authData?.user?.name;

  if (profileImageSrc) {
    profileImageSrc = profileImageSrc && getImageEndpoint(profileImageSrc);

    return (
      <img
        data-id="UserAvatar"
        className={cn('h-8 w-8 rounded-full', className)}
        src={profileImageSrc}
        alt=""
      />
    );
  }

  if (!profileName) {
    return <></>;
  }

  return (
    <div
      data-id="UserAvatar"
      className={cn('h-8 w-8 rounded-full flex items-center justify-center bg-gray-200', className)}
    >
      <span className="text-gray-600 text-xl">{getInitials(profileName)}</span>
    </div>
  );
};

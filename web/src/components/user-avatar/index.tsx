import { useAuth } from 'features/api-slices/useAuth';

import { StyleProps } from 'types/general';
import { getImageEndpoint } from 'utils/api';
import { getInitials } from 'utils/business';
import { cn } from 'utils/general';

export interface UserAvatarProps extends StyleProps {
  size?: 'small' | 'medium';
}

export const UserAvatar = ({ className, size = 'small' }: UserAvatarProps) => {
  const { authData } = useAuth();

  let profileImageSrc = authData?.user?.profileImage?.src;
  const profileName = authData?.user?.name;

  if (profileImageSrc) {
    profileImageSrc = profileImageSrc && getImageEndpoint(profileImageSrc);

    return (
      <img
        data-id="UserAvatar"
        className={cn(
          'rounded-full',
          {
            'size-10': size === 'small',
            'size-16': size === 'medium',
          },
          className
        )}
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
      className={cn(
        'rounded-full flex items-center justify-center bg-gray-200',
        {
          'size-10': size === 'small',
          'size-16': size === 'medium',
        },
        className
      )}
    >
      <span
        className={cn('text-gray-600', {
          'text-xl': size === 'small',
          'text-3xl': size === 'medium',
        })}
      >
        {getInitials(profileName)}
      </span>
    </div>
  );
};

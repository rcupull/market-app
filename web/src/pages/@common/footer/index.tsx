import { Footer as FooterBase } from 'components/footer';

import { useBusiness } from 'pages/@hooks/useBusiness';
import { StyleProps } from 'types/general';

export interface FooterProps extends StyleProps {}

export const Footer = ({ ...props }: FooterProps) => {
  const { business } = useBusiness();

  if (business) {
    const socialLinks = business.socialLinks || {};

    return <FooterBase socialLinks={socialLinks} {...props} />;
  }

  return (
    <FooterBase
      socialLinks={{
        instagram: 'https://www.instagram.com/aseremarket?igsh=MTJ6aDFtYXNrbzJoaQ=='
      }}
      {...props}
    />
  );
};

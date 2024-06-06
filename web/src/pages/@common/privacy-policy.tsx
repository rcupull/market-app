import { StyleProps } from 'types/general';

export interface PrivacyPolicyProps extends StyleProps {}

export const PrivacyPolicy = ({ className }: PrivacyPolicyProps) => {

  return (
    <div className={className}>
      PrivacyPolicy
    </div>
  );
};

export default PrivacyPolicy;

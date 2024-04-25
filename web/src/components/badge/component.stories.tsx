import { Badge } from '.';

export default {
  component: Badge,
};

export const Variants = () => (
  <>
    <Badge variant="error" />
    <br />
    <br />
    <Badge variant="info" />
    <br />
    <br />
    <Badge variant="success" />
  </>
);

import { Button } from 'components/button';

import { Modal } from '.';

export default {
  component: Modal,
};

export const Default = () => (
  <Modal
    title="Deactivate account"
    content="Are you sure you want to deactivate your account? All
    of your data will be permanently removed. This action
    cannot be undone."
    primaryBtn={<Button variant="primary" label="Deactivate" />}
  />
);

export const WithSecoundary = () => (
  <Modal
    title="Deactivate account"
    content="Are you sure you want to deactivate your account? All
    of your data will be permanently removed. This action
    cannot be undone."
    primaryBtn={<Button variant="primary" label="Deactivate" />}
    secondaryBtn={<Button variant="outlined" label="Reject" />}
  />
);

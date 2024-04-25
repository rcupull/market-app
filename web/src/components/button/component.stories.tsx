import { ClipboardIcon } from '@heroicons/react/20/solid';

import { Button } from '.';

export default {
  component: Button,
};

export const Default = (): JSX.Element => <Button label="Label" />;

export const WithSvg = (): JSX.Element => <Button svg={ClipboardIcon} />;

export const WithSvgAndLabel = (): JSX.Element => <Button label="Label" svg={ClipboardIcon} />;

export const IsBusy = (): JSX.Element => <Button label="Label" isBusy />;

export const Designs = (): JSX.Element => (
  <>
    <Button label="Primary" variant="primary" />
    <br />
    <br />
    <Button label="Outlined" variant="outlined" />
    <br />
    <br />
    <Button label="Error" variant="error" />
  </>
);

export const Disabled = (): JSX.Element => (
  <>
    <Button label="Primary" variant="primary" disabled />
    <br />
    <br />
    <Button label="Outlined" variant="outlined" disabled />
    <br />
    <br />
    <Button label="Error" variant="error" disabled />
  </>
);

export const NeedPremium = (): JSX.Element => (
  <>
    <Button label="Primary" variant="primary" needPremium />
    <br />
    <br />
    <Button label="Outlined" variant="outlined" needPremium />
    <br />
    <br />
    <Button label="Error" variant="error" needPremium />
  </>
);

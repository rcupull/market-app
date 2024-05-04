import { Button } from '.';

import SvgStoreSolid from 'icons/StoreSolid';

export default {
  component: Button,
};

export const Default = (): JSX.Element => <Button label="Label" />;

export const WithSvg = (): JSX.Element => (
  <div className="flex gap-2">
    <Button svg={SvgStoreSolid} />
    <Button svg={<SvgStoreSolid className="!size-9" />} />
  </div>
);

export const WithSvgAndLabel = (): JSX.Element => <Button label="Label" svg={SvgStoreSolid} />;

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

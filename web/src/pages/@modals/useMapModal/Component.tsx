import { MapOl, MapOlProps } from 'components/map';

export interface ComponentProps extends MapOlProps {}

export const Component = (props: ComponentProps) => {
  return <MapOl {...props} />;
};

export default Component;

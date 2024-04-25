import { AnyRecord } from 'types/general';

export const withPageProviders = (
  element: React.ReactNode,
  ...providers: Array<React.FunctionComponent<AnyRecord>>
) => {
  let out = element;

  providers.forEach((P) => {
    out = <P>{out}</P>;
  });

  return out;
};

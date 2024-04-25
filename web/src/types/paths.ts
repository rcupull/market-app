import { AnyRecord } from './general';

type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
type JSONObject = AnyRecord | Array<any>;
type JSONObjectKey = string | number;

// nesting paths inline
type JoinPathsInline<K, P> = K extends JSONObjectKey
  ? P extends string
    ? `${K}.${P}`
    : never
  : never;

//eslint-disable-next-line
export type Path<T extends any, D extends number = 5> = D extends never
  ? never
  : T extends JSONObject
    ? {
        [K in keyof T]-?: K extends JSONObjectKey
          ? `${K}` | JoinPathsInline<K, Path<T[K], Prev[D]>>
          : never;
      }[keyof T]
    : never;

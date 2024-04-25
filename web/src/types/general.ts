export type AnyRecord = Record<string, any>;

export type Nullable<T> = T | false | null | undefined;

type EmptyObject<T> = { [K in keyof T]?: never };
export type EmptyObjectOf<T> = EmptyObject<T> extends T ? EmptyObject<T> : never;

export interface BaseIdentity {
  _id: string;
  createdAt: string;
}

export interface StyleProps {
  className?: string;
}

export interface ChildrenProp {
  children?: React.ReactNode;
}

export interface Image {
  src: string;
  width: number;
  height: number;
  alt?: string;
  href?: string;
}

export interface ImageFile {
  src: File;
  width: number;
  height: number;
  alt?: string;
  href?: string;
}

declare global {
  const DEVELOPMENT: boolean;
  const PRODUCTION: boolean;
  const STAGING: boolean;
}

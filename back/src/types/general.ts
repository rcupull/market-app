import { Request, Response, RequestHandler as ExpressRequestHandler } from 'express';
import { ServerResponse } from 'http';
import {
  ApplySchemaOptions,
  DefaultSchemaOptions,
  ObtainDocumentType,
  PaginateOptions,
  ResolveSchemaOptions,
  Schema,
} from 'mongoose';

import { Post } from './post';
import { Business } from './business';
import { User as UserApp } from './user';

export type AnyRecord = Record<string, any>;

export interface BaseIdentity {
  _id: Schema.Types.ObjectId;
  createdAt: Date;
}

declare global {
  namespace Express {
    interface User extends UserApp {}
    interface Request {
      post?: Post;
      business?: Business;
      paginateOptions?: PaginateOptions;
      htmlMeta?: HtmlMeta;
    }
  }
}

export interface RequestHandler<
  P = AnyRecord,
  ResBody = any,
  ReqBody = any,
  ReqQuery = AnyRecord,
  Locals extends Record<string, any> = Record<string, any>
> extends ExpressRequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> {}

export type QueryHandle<Args extends AnyRecord = AnyRecord, R = void> = (
  args: Args
) => Promise<R | ServerResponse>;

export interface Image {
  src: string;
  width: number;
  height: number;
  href?: string;
}

export type SchemaDefinition<Type = any> = ApplySchemaOptions<
  ObtainDocumentType<any, Type, ResolveSchemaOptions<DefaultSchemaOptions>>,
  ResolveSchemaOptions<DefaultSchemaOptions>
>;

type EmptyObject<T> = { [K in keyof T]?: never };
export type EmptyObjectOf<T> = EmptyObject<T> extends T ? EmptyObject<T> : never;

export type Nullable<T> = T | false | null | undefined;

export interface HtmlMeta {
  title: string;
  description: string;
  url: string;
  image: string;
}

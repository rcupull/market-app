import { RequestHandler as ExpressRequestHandler } from 'express';

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
import { Document } from 'mongoose';

export type AnyRecord = Record<string, any>;
export type UnknownRecord = Record<string, unknown>;

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

export type QueryHandle<Args extends AnyRecord | void = void, R = void> = (
  args: Args
) => Promise<R>;

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

export type ModelDocument<T extends AnyRecord = AnyRecord> = Document<unknown, AnyRecord, T> & T;

export interface TelegramBotChat {
  chatId: number;
  firstName?: string;
  userName?: string;
}

export interface Address {
  _id: string;
  city: string;
  country: string;
  countryCode: string;
  municipality?: string;
  street: string;
  streetBetweenFrom?: string;
  streetBetweenTo?: string;
  neighborhood: string;
  number?: number;
  apartment?: number;
  lat: number;
  lon: number;
  postCode: string;
  placeId: string;
}

import { Schema } from 'mongoose';
import { AnyRecord, EmptyObjectOf, Nullable, RequestHandler } from '../types/general';
import dlv from 'dlv';
import { dset } from 'dset';
import { Path } from '../types/paths';
export const replaceAll = (value: string, match: string, replace: string): string =>
  value.split(match).join(replace);

export const isEqualIds = (
  id1: string | Schema.Types.ObjectId,
  id2: string | Schema.Types.ObjectId,
): boolean => {
  const id1Str = typeof id1 === 'string' ? id1 : id1.toString();
  const id2Str = typeof id2 === 'string' ? id2 : id2.toString();

  return id1Str === id2Str;
};

export const isEqual = (a: any, b: any): boolean => {
  if (typeof a === 'object' && typeof b === 'object') {
    return isEqualObj(a, b);
  }

  return a === b;
};
export const isEqualObj = (a: AnyRecord | undefined, b: AnyRecord | undefined): boolean => {
  if (!a || !b) return false;

  if (isArray(a) && isArray(b) && a.length !== b.length) {
    return false;
  }

  for (const prop in a) {
    //eslint-disable-next-line
    if (a.hasOwnProperty(prop)) {
      //eslint-disable-next-line
      if (b.hasOwnProperty(prop)) {
        //@ts-expect-error ignore
        if (typeof a[prop] === 'object') {
          //@ts-expect-error ignore
          if (!isEqualObj(a[prop], b[prop])) return false;
        } else {
          //@ts-expect-error ignore
          if (a[prop] !== b[prop]) return false;
        }
      } else {
        return false;
      }
    }
  }
  return true;
};

export const combineMiddleware = (...mids: Array<RequestHandler>) => {
  return mids.reduce(function (a, b) {
    return function (req, res, next) {
      a(req, res, function (err) {
        if (err) {
          return next(err);
        }
        b(req, res, next);
      });
    };
  });
};

export const isEmpty = <T = object>(
  value: T | null | undefined,
): value is EmptyObjectOf<T> | null | undefined => {
  if (!value) return true;

  if (typeof value === 'object') {
    const keys = Object.keys(value);
    return !keys.length;
  }

  return false;
};

export const get = <T extends AnyRecord = AnyRecord>(obj: T, path: Path<T>): any => {
  return dlv(obj, path);
};

export const set = <T extends AnyRecord = AnyRecord>(obj: T, path: Path<T>, value: any): void => {
  dset(obj, path, value);
};

export const isNullOrUndefined = (value: unknown): value is null | undefined => {
  return value === null || value === undefined;
};

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const isArray = (value: unknown): value is Array<any> => {
  return Array.isArray(value);
};

export const isNullOrUndefinedOrEmptyString = (value: unknown): value is null | undefined | '' => {
  return isNullOrUndefined(value) || value === '';
};

export const compact = <T = any>(value: Array<Nullable<T>>): Array<T> => {
  return value.filter((val) => val) as Array<T>;
};

export const addRow = <T = any>(
  data: Array<T>,
  rowData: T,
  position: 'start' | 'end' = 'end',
): Array<T> => {
  const newData = [...data];

  return position === 'start' ? [rowData, ...newData] : [...newData, rowData];
};

export const movRow = <T = any>(data: Array<T>, fromIndex: number, toIndex: number): Array<T> => {
  const new_index = ((toIndex % data.length) + data.length) % data.length;
  data.splice(new_index, 0, data.splice(fromIndex, 1)[0]);
  return data;
};

export const addStringToUniqueArray = <T extends string = string>(
  array: Array<T>,
  value: T,
): Array<T> => {
  return array.includes(value) ? array : addRow(array, value);
};

export const getRandomHash = () => `${Date.now()}`;

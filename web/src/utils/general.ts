import classnames from 'classnames';
import dlv from 'dlv';
import { dset } from 'dset';
import { nestie } from 'nestie';
import { AnyRecord, EmptyObjectOf, Nullable } from 'types/general';
import { Path } from 'types/paths';

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

export const getFlattenJson = <T extends AnyRecord = AnyRecord>(value: T): T => {
  return Object.entries(value).reduce(
    (acc, [k, v]) => (isNullOrUndefinedOrEmptyString(v) ? acc : { ...acc, [k]: v }),
    {} as T,
  );
};
export const getFlattenArray = <T extends Array<any> = Array<any>>(
  value: T,
  cbValid: (e: any) => boolean = Boolean,
): T => {
  return value.filter(cbValid) as T;
};

export const getRange = (count = 0): Array<number> => {
  return [...Array(count).keys()];
};

export const getLine = <T = undefined>(count = 0, fill?: T): Array<T> => {
  return getRange(count).map(() => fill as T);
};

export const cn = classnames;

export const replaceAll = (value: string, match: string, replace: string): string => {
  return value.split(match).join(replace);
};

export const deepJsonCopy = <T extends AnyRecord = AnyRecord>(json: T): T => {
  return JSON.parse(JSON.stringify(json));
};

export const addRow = <T = any>(
  data: Array<T>,
  rowData: T,
  position: 'start' | 'end' = 'end',
): Array<T> => {
  const newData = [...data];

  return position === 'start' ? [rowData, ...newData] : [...newData, rowData];
};

export const removeRow = <T = any>(data: Array<T>, index: number): Array<T> => {
  const newData = [...data];
  newData.splice(index, 1);
  return newData;
};

export const updateRow = <T = any>(data: Array<T>, rowData: T, index: number): Array<T> => {
  const newData = [...data];
  newData[index] = rowData;
  return newData;
};

export const relocateRow = <T = any>(
  data: Array<T>,
  fromIndex: number,
  toIndex: number,
): Array<T> => {
  const newData = deepJsonCopy(data);

  const element = newData.splice(fromIndex, 1)[0];
  newData.splice(toIndex, 0, element);

  return newData;
};

export const range = (count = 0): Array<number> => [...Array(count).keys()];

export const line = <T = undefined>(count = 0, fill?: T): Array<T> => {
  return range(count).map(() => fill as T);
};

export const isObject = (item: any) => {
  return item && typeof item === 'object' && !Array.isArray(item);
};

export const mergeDeep = <T extends AnyRecord = AnyRecord>(target: T, source: Partial<T>): T => {
  const output = Object.assign({}, target);

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] });
        //@ts-expect-error ignored
        else output[key] = mergeDeep(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
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

export const addStringToUniqueArray = <T extends string = string>(
  array: Array<T>,
  value: T,
): Array<T> => {
  return array.includes(value) ? array : addRow(array, value);
};

export const flatStringArrayToUniqueArray = <T extends string = string>(
  array: Array<Array<T>>,
): Array<T> => {
  return array.reduce((acc, item) => {
    let out = acc;
    item.forEach((field) => {
      out = addStringToUniqueArray(out, field);
    });

    return out;
  }, [] as Array<T>);
};

export const removeStringFromArray = (array: Array<string>, value: string): Array<string> => {
  const index = array.indexOf(value);
  return index < 0 ? array : removeRow(array, index);
};

export const get = <T extends AnyRecord = AnyRecord>(obj: T, path: Path<T>): any => {
  return dlv(obj, path);
};

export const set = <T extends AnyRecord = AnyRecord>(obj: T, path: Path<T>, value: any): void => {
  dset(obj, path, value);
};
export const makeObj = nestie;

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const wait = (timeout = 10): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

import { AnyRecord } from '../types/general';
import { Path } from '../types/paths';
import { get, set } from './general';

/*
 * Returns  a function that takes an object and returns an
 * object with values from the old object mapped to new locations.
 *
 * At its simplest
 *
 *   const reshaper = makeReshaper({ b: 'a'})
 *   reshaper({ a: true }) --> { b: true }
 *
 * That is, the input to makeReshaper() is a mapping of old to new
 * property names.
 *
 * Note: These are arranged in the order `new: old`, rather than
 * `old: new` so it is easier to see the shape of the resulting
 * object in the code.
 *
 * These names may be dotted to retrieve or put values
 * into arbitrary locations. e.g.:
 *
 *   const reshaper = makeReshaper({ 'x.y': 'a', 'b': 'm.n' })
 *   reshaper({ a: true, m: { n: 2 } }) --> { x: { y: true }, b: 2 }
 *
 * Note that properties in the provided object that are not in the mapping
 * are ignored. Properties in the mapping but not in the target object, are set to
 * undefined
 *
 * Additionally, old properties can be represented as functions which allows for
 * more complex values.
 *
 *   const reshaper = makeReshaper({
 *     hasAlerts: obj => obj.alerts > 0,
 *   });
 *   reshaper({ alerts: 2 }) --> { hasAlerts: true }
 *
 * You can also provide a second argument to makeReshaper. This should contain
 * any properties you want to add to the resulting object that are not from the original.
 * Most commonly, this will be used to add a `type` property to the object.
 */
type MakeReshaperReturn<I extends AnyRecord = AnyRecord, O extends AnyRecord = AnyRecord> = (
  obj: I
) => Partial<O>;

export type ReshapeRules<I extends AnyRecord = AnyRecord, O extends AnyRecord = AnyRecord> = {
  [K in Path<O>]?: Path<I> | ((val: I) => any);
};

export const makeReshaper = <I extends AnyRecord = AnyRecord, O extends AnyRecord = AnyRecord>(
  reshapeRules?: ReshapeRules<I, O> | false | null,
  propsToAdd: AnyRecord = {}
): MakeReshaperReturn<I, O> => {
  if (!reshapeRules || typeof reshapeRules !== 'object') {
    return () => ({});
  }

  return (oldObj) => {
    const reshaped = Object.entries(reshapeRules).reduce((newObj, [newKey, oldKey]) => {
      const newValue =
        typeof oldKey === 'function'
          ? oldKey(oldObj)
          : //@ts-expect-error the type of get is not generic
            get(oldObj, oldKey as string);

      //@ts-expect-error type of set is not generic
      set(newObj, newKey, newValue);
      return newObj;
    }, {});

    return {
      ...propsToAdd,
      ...reshaped
    };
  };
};

export const makeInvestedReshaper = <
  I extends AnyRecord = AnyRecord,
  O extends AnyRecord = AnyRecord
>(
  reshapeRules?: ReshapeRules<I, O> | false | null
): MakeReshaperReturn<O, I> => {
  if (!reshapeRules || typeof reshapeRules !== 'object') {
    return () => ({});
  }

  const investedRules = Object.entries(reshapeRules).reduce(
    (acc, [newKey, oldKey]) => {
      if (typeof oldKey === 'function') {
        throw new Error('This fearure is imposible using functions');
      }

      return {
        ...acc,
        [oldKey as string]: newKey
      };
    },
    {} as ReshapeRules<O, I>
  );

  return makeReshaper<O, I>(investedRules);
};

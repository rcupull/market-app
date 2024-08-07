import { makeInvestedReshaper, makeReshaper } from './makeReshaper';

describe('makeReshaper()', () => {
  it('should create a reshaper() that returns an empty object when no rules provided', async () => {
    const reshaper = makeReshaper();

    expect(reshaper({ a: true })).toEqual({});
  });

  it('should create a reshaper() that returns an empty object when bad rules provided', async () => {
    const reshaper = makeReshaper(false);

    expect(reshaper({ a: true })).toEqual({});
  });

  it('should map simple properties to simple properties', async () => {
    const reshaper = makeReshaper({ b: 'a' });

    expect(reshaper({ a: true })).toEqual({ b: true });
  });

  it('should compute values against the old object using a function', () => {
    const reshaper = makeReshaper({
      hasAlerts: (obj) => obj.alerts > 0
    });

    expect(reshaper({ alerts: 1 })).toEqual({ hasAlerts: true });
  });

  it('should set missing properties to undefined', async () => {
    const reshaper = makeReshaper({ b: 'a', y: 'b' });

    expect(reshaper({ a: true })).toEqual({ b: true, y: undefined });
  });

  it('should be able to pass dotted values for the new and old props', async () => {
    const reshaper = makeReshaper({ 'x.y': 'a', b: 'm.n' });

    expect(reshaper({ a: true, m: { n: 2 } })).toEqual({
      x: { y: true },
      b: 2
    });
  });

  it('should be able to pass array indices in the rules', async () => {
    const reshaper = makeReshaper({ 'x.y': 'a.1.foo', b: 'm.n', 'c.0.field': 'a.0' });

    expect(reshaper({ a: [{ foo: 2 }, { foo: 4 }], m: { n: 2 } })).toEqual({
      x: { y: 4 },
      b: 2,
      c: [{ field: { foo: 2 } }]
    });
  });

  it('should be able to pass array indices in the rules without brackets', async () => {
    const reshaper = makeReshaper({ 'x.y': 'a.1.foo', b: 'm.n', 'c.0.field': 'a.0' });

    expect(reshaper({ a: [{ foo: 2 }, { foo: 4 }], m: { n: 2 } })).toEqual({
      x: { y: 4 },
      b: 2,
      c: [{ field: { foo: 2 } }]
    });
  });

  it('should be able to introduce entirely new properties', async () => {
    const reshaper = makeReshaper(
      { 'x.y': 'a', b: 'm.n', type: 'm' },
      { type: 'test', epic: true }
    );

    expect(reshaper({ a: true, m: { n: 2 } })).toEqual({
      x: { y: true },
      b: 2,
      type: { n: 2 },
      epic: true
    });
  });
});

describe('makeInvestedReshaper()', () => {
  it('should create a reshaper() that returns an empty object when no rules provided', async () => {
    const reshaper = makeInvestedReshaper();

    expect(reshaper({ a: true })).toEqual({});
  });

  it('should create a reshaper() that returns an empty object when bad rules provided', async () => {
    const reshaper = makeInvestedReshaper(false);

    expect(reshaper({ a: true })).toEqual({});
  });

  it('should map simple properties to simple properties', async () => {
    const reshaper = makeInvestedReshaper({ a: 'b' });

    expect(reshaper({ a: true })).toEqual({ b: true });
  });

  it('should set missing properties to undefined', async () => {
    const reshaper = makeInvestedReshaper({ a: 'b', b: 'y' });

    expect(reshaper({ a: true })).toEqual({ b: true, y: undefined });
  });

  it('should be able to pass dotted values for the new and old props', async () => {
    const reshaper = makeInvestedReshaper({ a: 'x.y', 'm.n': 'b' });

    expect(reshaper({ a: true, m: { n: 2 } })).toEqual({
      x: { y: true },
      b: 2
    });
  });

  it('should be able to pass array indices in the rules', async () => {
    const reshaper = makeInvestedReshaper({ 'a.1.foo': 'x.y', 'm.n': 'b', 'a.0': 'c.0.field' });

    expect(reshaper({ a: [{ foo: 2 }, { foo: 4 }], m: { n: 2 } })).toEqual({
      x: { y: 4 },
      b: 2,
      c: [{ field: { foo: 2 } }]
    });
  });

  it('should be able to pass array indices in the rules without brackets', async () => {
    const reshaper = makeInvestedReshaper({ 'a.1.foo': 'x.y', 'm.n': 'b', 'a.0': 'c.0.field' });

    expect(reshaper({ a: [{ foo: 2 }, { foo: 4 }], m: { n: 2 } })).toEqual({
      x: { y: 4 },
      b: 2,
      c: [{ field: { foo: 2 } }]
    });
  });
});

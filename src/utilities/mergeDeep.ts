const isArray = (val: unknown) => !!(val && typeof val === 'object' && Array.isArray(val));
const isPlainObject = (val: unknown) => !!(val && typeof val === 'object' && !isArray(val));
const isCollection = (val: unknown): val is Array<object> => !!(val && isArray(val) && val.length && val.every(isPlainObject));
const isMatrix = (val: unknown): val is Array<unknown[]> => !!(val && isArray(val) && val.length && val.every(isArray));
const isPrimitive = (val: unknown) => !!(val && typeof val !== 'object');
const getValuesByKey = (args: object[], keyName: string) =>
  args
    .map((obj) =>
      Object.entries(obj)
        .filter(([key]) => key === keyName)
        .map(([, value]) => value)
    )
    .flat();
const getValuesByIndex = (args: Array<unknown[]>, index: number) => args.map((arr) => arr[index]).flat();

function mergeDeep(...args: unknown[]): object | unknown[] {
  if (isCollection(args)) {
    const allKeys = args.map((obj) => Object.entries(obj).map(([key]) => key)).flat();
    const entries = allKeys.map((key) => {
      const values = getValuesByKey(args as object[], key);
      return values.every(isPrimitive) ? [key, values[values.length - 1]] : [key, mergeDeep(...values)];
    });
    return Object.fromEntries(entries);
  }

  if (isMatrix(args)) {
    const maxArrayLength = args.reduce((acc, item) => (acc >= item.length ? acc : item.length), 0);
    return [...Array(maxArrayLength).keys()].map((index) => mergeDeep(...getValuesByIndex(args, index))).flat();
  }

  return [...new Set(args)].filter(Boolean);
}

export default mergeDeep;

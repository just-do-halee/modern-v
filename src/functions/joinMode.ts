import { ObjectOnly } from '../types';
import { isPreservedKey } from './tools';

export type JoinedObject<
  M extends string,
  O extends ObjectOnly<string>,
  Prefix extends boolean
> = {
  [K in keyof O]: Prefix extends true ? `${M}${O[K]}` : `${O[K]}${M}`;
};

export type JoinModeOptions<Prefix extends boolean> = {
  prefix?: Prefix;
  delimiter?: string;
};

function joinMode<
  M extends string,
  O extends ObjectOnly<string>,
  Prefix extends boolean
>(
  mode: M,
  obj: O,
  options: JoinModeOptions<Prefix> = {}
): JoinedObject<M, O, Prefix> & { __MODE__: M } {
  if (typeof mode !== 'string') throw new Error(`The mode must be a string.`);
  const { prefix = false, delimiter = '' } = options;

  let mergedObj: ObjectOnly<string> = { __MODE__: mode };

  for (const key in obj) {
    if (isPreservedKey(key)) continue;

    let value = obj[key] === '' ? key : obj[key];

    mergedObj[key] = prefix
      ? `${mode}${delimiter}${value}`
      : `${value}${delimiter}${mode}`;
  }

  return mergedObj as JoinedObject<M, O, Prefix> & { __MODE__: M };
}

export default joinMode;

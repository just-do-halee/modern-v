import { DEFAULT_VARIABLE, DEFAULT_MODE_LIST, DefaultMode } from './env';

export type GetModeOptions<T extends string> = {
  list?: Array<T>;
  variable?: string;
  strict?: boolean;
};

/**
 *
 * @param options - default: {
 *                - list: `['dev', 'test', 'prod']`,
 *                - variable: `process?.env?.NODE_ENV`,
 *                - strict: `false`,
 *                - }
 * @returns `variable` || `list[0]`
 */
function getMode<T extends string = DefaultMode>(
  options: GetModeOptions<T> = {}
): T {
  const {
    list = DEFAULT_MODE_LIST as Array<T>,
    variable = DEFAULT_VARIABLE,
    strict = false,
  } = options;

  if (Array.isArray(list) === false)
    throw new Error(`The list must be an array.`);

  if (list.length === 0)
    throw new Error(`The length of list must be longer than 1.`);

  if (list.includes(variable as any)) {
    //
    return variable as T;
    //
  } else if (strict) {
    // strict mode
    //
    throw new Error(`list:[${list}] not includes variable:${variable}`);
    //
  } else {
    //
    return list[0];
  }
}

export default getMode;

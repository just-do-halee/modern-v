export const ENV = process?.env;

export const { NODE_ENV } = ENV;

export const DEFAULT_VARIABLE = NODE_ENV;

export type DefaultMode = 'dev' | 'test' | 'prod';

export const DEFAULT_MODE_LIST: Array<DefaultMode & string> = [
  'dev',
  'test',
  'prod',
];

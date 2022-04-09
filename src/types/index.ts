export type ObjectOnly<T> = {
  [key: string | number | symbol]: T;
};

export type ObjectStringOnly<T> = {
  [key: string]: T;
};

export type PreservedKey = `__${string}__`;

export type PreservedKeyExcluded<O> = Exclude<keyof O, PreservedKey>;

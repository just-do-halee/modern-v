import { ObjectStringOnly, PreservedKey, PreservedKeyExcluded } from "../types";
import { isPreservedKey } from "./tools";
import { ENV } from "./env";

type ExceptKeys<O> = Array<PreservedKeyExcluded<O>> | [] | undefined;

type OmitKeys<
  O,
  K extends Array<keyof O> | [] | undefined
> = K extends undefined
  ? O
  : K extends []
  ? O
  : Omit<O, NonNullable<K>[number] | PreservedKey>;

function getEnvs<
  O extends ObjectStringOnly<string>,
  K extends ExceptKeys<O> = []
>(
  obj: O,
  { exceptKeys = [], strict = false }: { exceptKeys?: K; strict?: boolean } = {}
  /* + omit preserved key */
): OmitKeys<O, typeof exceptKeys> {
  let mergedObj: ObjectStringOnly<string> = {};

  for (const key in obj) {
    if (isPreservedKey(key)) continue;
    if (exceptKeys && exceptKeys.includes(key as never)) continue;

    const value = ENV[obj[key] === "" ? key : obj[key]];

    if (value === undefined) {
      // strict mode
      if (strict) throw new Error(`ENV:[${ENV}] not includes key:${obj[key]}`);
      continue;
    }

    mergedObj[key as string] = value;
  }

  return mergedObj as OmitKeys<O, typeof exceptKeys>;
}

export default getEnvs;

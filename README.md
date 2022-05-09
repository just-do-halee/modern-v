# **_`MODERN-V`_**

_Most easy way to get and set the **mode** in any situation._

<br>

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![License][license-image]][license-url]
[[changelog]](CHANGELOG.md)

<br>

```js
npm install modern-v
```

```js
yarn add modern-v
```

<br>

#### **_`Idiom` :_**

```typescript
const mode = getMode({ strict: true }); // dev | test | prod

const joined = joinMode(mode, {
  env: ".env.",
}); // .env.dev | .dev.test | .dev.prod

const envs = getEnvs({
  FOO: "",
  BAR: "",
}); // extracting process.env...

export const config = {
  mode,
  joined,
  envs,
};
```

<br>

## **_`Examples`_**

---

###### _\* Defaults:_

```typescript
import { getMode } from "modern-v";

const MODE = getMode(); // Type <=> 'dev' | 'test' | 'prod' from NODE_ENV

// If NODE_ENV is not one of them then MODE will be 'dev' (= list[0])
```

###### _\* Options:_

```typescript
import { getMode, ENV } from "modern-v";

const MODE = getMode({
  list: ["development", "debug", "production"],
  variable: ENV.MY_ENV, // <== Target
  strict: true, // <== If the Target is not included in the list, throw an error
});
```

<br>

## **_`Advanced`_**

---

> ### **join mode**

<br>

###### _\* Defaults:_

```typescript
import { getMode, joinMode } from "modern-v";

// if getMode() === 'dev'

const config = joinMode(getMode(), {
  env: ".env.",
  host_: "",
  port_: "",
} as const);

/*
  config = {
    env: '.env.dev',
    host_: 'host_dev',
    port_: 'port_dev',
  };
*/
```

###### _\* Options:_

```typescript
import { getMode, joinMode } from "modern-v";

// if getMode() === 'dev'

const config = joinMode(
  "." + getMode(),

  {
    env: "",
    __HOST__: "localhost", // __NAME__ will be preserved as same state
  } as const,

  { prefix: true, delimiter: "_" }
);

/*
  config = {
    env: '.dev_env',
    __HOST__: 'localhost', // preserved
  };
*/
```

---

> ### **get environments**

<br>

###### _\* Defaults:_

```typescript
import { getMode, joinMode, getEnvs } from "modern-v";

// if getMode() === 'dev'

const envs = getEnvs(
  joinMode(getMode(), {
    host: "DB_HOST_",
    port: "DB_PORT_",
    __FOO__: "bar", // __NAME__ ignored
  } as const)
);

/*
  envs = {
    host: '127.0.0.1', // = process.env.DB_HOST_dev
    port: '1234', // = process.env.DB_PORT_dev
  };
*/
```

###### _\* Options:_

```typescript
import { getMode, joinMode, getEnvs } from "modern-v";

// if getMode() === 'dev'

const envs = getEnvs(
  joinMode(getMode(), {
    env: ".env.",
    bar_: "foo-foo-",
    host: "DB_HOST_",
    port: "DB_PORT_",
    __FOO__: "bar", // __NAME__ ignored
  } as const),
  {
    exceptKeys: ["env", "bar_"],
    strict: true,
  }
);

/*
  envs = {
    host: '127.0.0.1', // = process.env.DB_HOST_dev
    port: '1234', // = process.env.DB_PORT_dev
  };
*/
```

<br>

## **_`Under the hood`_**

---

```typescript
import { NODE_ENV, DEFAULT_VARIABLE } from "modern-v";

console.assert(NODE_ENV === process?.env?.NODE_ENV);

console.assert(DEFAULT_VARIABLE === NODE_ENV);
```

```typescript
import { DEFAULT_MODE_LIST } from "modern-v";

console.assert(DEFAULT_MODE_LIST === ["dev", "test", "prod"]);
```

```typescript
import { getMode, DEFAULT_MODE_LIST, DEFAULT_VARIABLE } from "modern-v";

console.assert(
  getMode({
    list: DEFAULT_MODE_LIST,
    variable: DEFAULT_VARIABLE,
    strict: false,
  }) === getMode() // Same
);
```

<br>

## **License**<br>

---

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/modern-v.svg
[npm-url]: https://npmjs.org/package/modern-v
[downloads-image]: https://img.shields.io/npm/dm/modern-v.svg
[downloads-url]: https://npmcharts.com/compare/modern-v?minimal=true
[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/modern-v

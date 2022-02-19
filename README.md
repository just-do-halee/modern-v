# **_`GETMODE`_**

_Most easy way to get and set the **mode** in any situation._

<br>

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]
[![License][license-image]][license-url]
[[changelog]](CHANGELOG.md)

<br>

```js
npm install getmode
```

```js
yarn add getmode
```

<br>

## **_`Examples`_**

---

###### _\* Defaults:_

```typescript
import { getMode } from 'getmode';

const MODE = getMode(); // Type <=> 'dev' | 'test' | 'prod' from NODE_ENV

// If NODE_ENV is not one of them then MODE will be 'dev' (= list[0])
```

###### _\* Options:_

```typescript
import { getMode, ENV } from 'getmode';

const MODE = getMode({
  list: ['development', 'debug', 'production'],
  variable: ENV.MY_ENV, // <== Target
  strict: true, // <== If the Target is not included in the list, throw an error
});
```

<br>

## **_`Under the hood`_**

---

```typescript
import { NODE_ENV, DEFAULT_VARIABLE } from 'getmode';

console.assert(NODE_ENV === process?.env?.NODE_ENV);

console.assert(DEFAULT_VARIABLE === NODE_ENV);
```

```typescript
import { DEFAULT_MODE_LIST } from 'getmode';

console.assert(DEFAULT_MODE_LIST === ['dev', 'test', 'prod']);
```

```typescript
import { getMode, DEFAULT_MODE_LIST, DEFAULT_VARIABLE } from 'getmode';

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

[npm-image]: https://img.shields.io/npm/v/getmode.svg
[npm-url]: https://npmjs.org/package/getmode
[downloads-image]: https://img.shields.io/npm/dm/getmode.svg
[downloads-url]: https://npmcharts.com/compare/getmode?minimal=true
[license-url]: https://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/getmode

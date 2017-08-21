# babel-plugin-transform-constant-string

transform constant string variable

## Example

**In**

```js
constant(HELLO_WORLD)

function foo() {
  const bar = 'foo-bar'
  constant(THIS_IS_A_CONSTANT_STRING_VALUE)
  console.log('other code...');
  constant(
    A_FOO,
    B_BAR,
    C_FOO_BAR
  )
  return bar
}
```

**Out**

```js
"use strict";
export const HELLO_WORLD = 'HELLO_WORLD';

function foo() {
  const bar = 'foo-bar';
  const THIS_IS_A_CONSTANT_STRING_VALUE = 'THIS_IS_A_CONSTANT_STRING_VALUE';
  console.log('other code...');
  const A_FOO = 'A_FOO';
  const B_BAR = 'B_BAR';
  const C_FOO_BAR = 'C_FOO_BAR';
  return bar;
}
// output code
```

## Installation

```sh
$ npm install babel-plugin-transform-constant-string
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["transform-constant-string", {
    "exports": true, // boolean, whether to export the variable, default is false
    "name": "constant" // string, which callee to be transformed, default is "constant"
  }]
}
```

### Via CLI

```sh
$ babel --plugins transform-constant-string script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["transform-constant-string"]
});
```

# babel-plugin-transform-constant-string

transform constant string variable

## Example

**In**

```js
CONSPORT(HELLO_WORLD)

function foo() {
  const bar = 'foo-bar'
  CONST(THIS_IS_A_CONSTANT_STRING_VALUE)
  console.log('other code...');
  CONST(
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

```json5
{
  "plugins": ["transform-constant-string", {
    "callName": "CONST" // string, which callee to be transformed, default is "CONST",
    "exportCallName": "CONSPORT" // string, which will add `export` for the variable, default is "CONSPORT"
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

### license
MIT

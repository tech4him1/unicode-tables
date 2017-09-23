# unicode-tables

[![Greenkeeper badge](https://badges.greenkeeper.io/tech4him1/unicode-tables.svg)](https://greenkeeper.io/)

This is a set of Unicode category tables based off of [the `unicode` module](https://github.com/eversport/node-unicodetable), but it only contains the character values themselves, not all of the extra information. Therefor it is much smaller.

## Usage

It is imported in the same way as [the `unicode` module](https://github.com/eversport/node-unicodetable).
```js
require('unicode-tables/category/So');
```
or
```js
require('unicode-tables/category').So;
```

## Example

Check if a character is a non-spacing mark:
```js
const nonSpacing = new Set(require('unicode-tables/category/Mn'));
nonSpacing.has('\u0300'); // true
```
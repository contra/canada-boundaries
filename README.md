# canada-boundaries [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

Downloads and converts Canada Statistics data representing all designated place boundaries in Canada.

You define the processing logic, so you can put it into any DB you like.

## Install

```
npm install canada-boundaries
```

## Example

```js
import census from 'canada-boundaries'

census({
  // this function is called every time a record is parsed
  onBoundary: (doc, cb) => {
    cb() // make sure to call the cb
  },

  // this function is called when all records are parsed and processed
  onFinish: (err) => {

  }
})
```

[downloads-image]: http://img.shields.io/npm/dm/canada-boundaries.svg
[npm-url]: https://npmjs.org/package/canada-boundaries
[npm-image]: http://img.shields.io/npm/v/canada-boundaries.svg

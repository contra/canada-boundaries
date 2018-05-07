# canada-boundaries [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]

Downloads and converts US Census TIGER data representing all boundaries in the United States.

You define the processing logic, so you can put it into any DB you like.

By default, this imports the boundaries of every state and incorporated place (~30K boundaries). Takes quite a bit of time depending on your internet speed.

## Install

```
npm install canada-boundaries
```

## Example

```js
import census from 'canada-boundaries'

census({
  // this function is called every time a record is parsed
  onBoundary: (objectType, doc, cb) => {
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

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _async = require('async');

var _async2 = _interopRequireDefault(_async);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _shp2json = require('shp2json');

var _shp2json2 = _interopRequireDefault(_shp2json);

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _JSONStream = require('JSONStream');

var _JSONStream2 = _interopRequireDefault(_JSONStream);

var _through2Asyncmap = require('through2-asyncmap');

var _through2Asyncmap2 = _interopRequireDefault(_through2Asyncmap);

var _plural = require('plural');

var _plural2 = _interopRequireDefault(_plural);

var _lodash = require('lodash.clone');

var _lodash2 = _interopRequireDefault(_lodash);

var _once = require('once');

var _once2 = _interopRequireDefault(_once);

var _debug2 = require('debug');

var _debug3 = _interopRequireDefault(_debug2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = (0, _debug3.default)('canada-census');

var filePath = 'http://www12.statcan.gc.ca/census-recensement/2011/geo/bound-limit/files-fichiers/gdpl000b11a_e.zip';

exports.default = function (_ref) {
  var onBoundary = _ref.onBoundary,
      onFinish = _ref.onFinish;

  if (!onBoundary) throw new Error('Missing onBoundary!');
  if (!onFinish) throw new Error('Missing onFinish!');
  onFinish = (0, _once2.default)(onFinish);
  var srcStream = _superagent2.default.get(filePath).buffer(false);
  var count = 0;
  (0, _shp2json2.default)(srcStream).pipe(_JSONStream2.default.parse('features.*')).pipe(_through2Asyncmap2.default.obj(function (feat, done) {
    ++count;
    onBoundary(feat, done);
  })).once('error', function (err) {
    return onFinish(err);
  }).once('finish', function () {
    debug('  -- ' + _chalk2.default.cyan('Parsed and inserted ' + count + ' boundaries'));
    onFinish();
  });
};

module.exports = exports['default'];
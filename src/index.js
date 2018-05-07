import async from 'async'
import path from 'path'
import chalk from 'chalk'
import toJSON from 'shp2json'
import join from 'url-join'
import request from 'superagent'
import JSONStream from 'JSONStream'
import map from 'through2-asyncmap'
import plural from 'plural'
import clone from 'lodash.clone'
import once from 'once'
import _debug from 'debug'
const debug = _debug('canada-census')

const filePath = 'http://www12.statcan.gc.ca/census-recensement/2011/geo/bound-limit/files-fichiers/gpc_000b11a_e.zip'

export default ({ onBoundary, onFinish }) => {
  if (!onBoundary) throw new Error('Missing onBoundary!')
  if (!onFinish) throw new Error('Missing onFinish!')
  onFinish = once(onFinish)
  const srcStream = request.get(filePath).buffer(false)
  let count = 0
  toJSON(srcStream)
    .pipe(JSONStream.parse('features.*'))
    .pipe(map.obj((feat, done) => {
      ++count
      onBoundary(feat, done)
    }))
    .once('error', (err) => onFinish(err))
    .once('finish', () => {
      debug(`  -- ${chalk.cyan(`Parsed and inserted ${count} boundaries`)}`)
      onFinish()
    })
}

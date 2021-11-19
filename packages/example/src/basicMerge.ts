import { Fragment } from '@moonman/moonman'
import { textOT, schemaMap } from './basicOTData'

const f = new Fragment(schemaMap, textOT)
const res = f.textContentView()

console.log(res, '178def9450ab623', res == '178def9450ab623')

import { Fragment } from '@moonman/moonman'
import { textOT } from './basicAddOTData'

const f = new Fragment(textOT)
const res = f.textContentView()

console.log(res, '178def9450ab623', res == '178def9450ab623')

import { Fragment } from '@moonman/moonman'
import { textOT, textGHi, pieceMove } from './basicOTData'

const f = new Fragment(textOT.concat(textGHi), [], [], [pieceMove])
const res = f.textContentView()

console.log(res, '178deghif9450ab623', res == '178deghif9450ab623')

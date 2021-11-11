import { Fragment, createPieceMark } from '@moonman/moonman'

import { textOT, text1 } from './basicAddOTData'

const delete1 = createPieceMark({
  identity: {
    timestamp: 6,
    id: 200,
  },
  piece: {
    identity: text1.identity,
    start: 1,
    end: 2,
  },
  data: {
    deleted: true,
  },
})

const f = new Fragment(textOT, [delete1])

const res = f.textContentView()

console.log(res, '178def940ab623', res == '178def940ab623')

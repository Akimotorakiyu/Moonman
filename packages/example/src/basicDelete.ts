import { Fragment } from '@moonman/moonman'

import { textOT, delete1, schemaMap } from './basicOTData'

const f = new Fragment(schemaMap, textOT, [delete1])

const res = f.textContentView()

console.log(res, '178def940ab623', res == '178def940ab623')

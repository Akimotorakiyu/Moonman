import { createTextNode, Fragmant, createPieceMark } from '@moonman/moonman'

// start
const text1 = createTextNode({
  content: '123',
  timestamp: 1,
  id: 100,
  beforeId: 0,
  indexInBerfore: 0,
})
const text2 = createTextNode({
  content: '456',
  timestamp: 2,
  id: 101,
  beforeId: 100,
  indexInBerfore: 0,
})
const text3 = createTextNode({
  content: '789',
  timestamp: 3,
  id: 102,
  beforeId: 100,
  indexInBerfore: 0,
})
const text4 = createTextNode({
  content: '0ab',
  timestamp: 4,
  id: 103,
  beforeId: 101,
  indexInBerfore: 1,
})
const text5 = createTextNode({
  content: 'def',
  timestamp: 5,
  id: 103,
  beforeId: 102,
  indexInBerfore: 1,
})

const delete1 = createPieceMark({
  timestamp: 6,
  id: 200,
  aimId: 101,
  range: [1, 2],
  data: {
    deleted: true,
  },
})

const f = new Fragmant([text1, text2, text3, text4, text5], [delete1])
const res = f.textContentView()

console.log(res, '178def940ab623', res == '178def940ab623')

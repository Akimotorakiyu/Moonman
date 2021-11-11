import { createTextNode, Fragment } from '@moonman/moonman'

// start
const text1 = createTextNode({
  content: '123',
  timestamp: 1,
  id: 100,
  beforeId: 0,
  indexInBefore: 0,
})

const text2 = createTextNode({
  content: '456',
  timestamp: 2,
  id: 101,
  beforeId: 100,
  indexInBefore: 0,
})
const text3 = createTextNode({
  content: '789',
  timestamp: 3,
  id: 102,
  beforeId: 100,
  indexInBefore: 0,
})
const text4 = createTextNode({
  content: '0ab',
  timestamp: 4,
  id: 103,
  beforeId: 101,
  indexInBefore: 1,
})
const text5 = createTextNode({
  content: 'def',
  timestamp: 5,
  id: 104,
  beforeId: 102,
  indexInBefore: 1,
})

const f = new Fragment([text1, text2, text3, text4, text5])
const res = f.textContentView()

console.log(res, '178def9450ab623', res == '178def9450ab623')

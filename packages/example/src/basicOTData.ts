import {
  createPieceMark,
  createRangeMark,
  createTextNode,
} from '@moonman/moonman'

// start
export const text123 = createTextNode({
  content: '123',
  identity: {
    timestamp: 1,
    id: 100,
  },
  position: {
    identity: {
      timestamp: 0,
      id: 0,
    },
    index: 0,
    relativePos: 'inner-after',
  },
})

export const text456 = createTextNode({
  content: '456',
  identity: {
    timestamp: 2,
    id: 101,
  },
  position: {
    identity: text123.identity,
    index: 0,
    relativePos: 'after',
  },
})
export const text789 = createTextNode({
  content: '789',
  identity: {
    timestamp: 3,
    id: 102,
  },
  position: {
    identity: text123.identity,
    index: 0,
    relativePos: 'after',
  },
})
export const text0ab = createTextNode({
  content: '0ab',
  identity: {
    timestamp: 4,
    id: 103,
  },

  position: {
    identity: text456.identity,
    index: 1,
    relativePos: 'after',
  },
})
export const textDef = createTextNode({
  content: 'def',
  identity: {
    timestamp: 5,
    id: 104,
  },
  position: {
    identity: text789.identity,
    index: 1,
    relativePos: 'after',
  },
})

export const textOT = [text123, text456, text789, text0ab, textDef]

export const delete1 = createPieceMark({
  identity: {
    timestamp: 6,
    id: 200,
  },
  piece: {
    identity: text456.identity,
    start: 1,
    end: 2,
  },
  data: {
    deleted: true,
  },
})

// 7-9之间 大写红色
export const colorMark7To9 = createRangeMark({
  identity: { timestamp: 7, id: 300 },
  range: [
    {
      identity: text789.identity,
      index: 0,
      relativePos: 'before',
    },
    {
      identity: text789.identity,
      index: 2,
      relativePos: 'after',
    },
  ],
  data: {
    color: 'red',
    fontSize: 'larger',
  },
})

// 7-2之间 蓝色斜体
export const colorMark7To2 = createRangeMark({
  identity: {
    timestamp: 7,
    id: 300,
  },
  range: [
    {
      identity: text789.identity,
      index: 1,
      relativePos: 'before',
    },
    {
      identity: text123.identity,
      index: 1,
      relativePos: 'after',
    },
  ],
  data: { color: 'blue', fontStyle: 'italic' },
})

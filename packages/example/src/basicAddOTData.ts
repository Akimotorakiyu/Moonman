import { createTextNode } from '@moonman/moonman'

// start
export const text0 = createTextNode({
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

export const text1 = createTextNode({
  content: '456',
  identity: {
    timestamp: 2,
    id: 101,
  },
  position: {
    identity: text0.identity,
    index: 0,
    relativePos: 'after',
  },
})
export const text2 = createTextNode({
  content: '789',
  identity: {
    timestamp: 3,
    id: 102,
  },
  position: {
    identity: text0.identity,
    index: 0,
    relativePos: 'after',
  },
})
export const text3 = createTextNode({
  content: '0ab',
  identity: {
    timestamp: 4,
    id: 103,
  },

  position: {
    identity: text1.identity,
    index: 1,
    relativePos: 'after',
  },
})
export const text4 = createTextNode({
  content: 'def',
  identity: {
    timestamp: 5,
    id: 104,
  },
  position: {
    identity: text2.identity,
    index: 1,
    relativePos: 'after',
  },
})

export const textOT = [text0, text1, text2, text3, text4]

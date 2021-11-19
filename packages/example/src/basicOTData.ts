import {
  createPieceMark,
  createRangeMark,
  createMetaInfo,
  createPieceMove,
  ISchema,
} from '@moonman/moonman'

// start
export const text123 = createMetaInfo({
  data: { content: '123' },
  piece: {
    identity: {
      timestamp: 1,
      id: 100,
    },
    start: 0,
    end: 3,
  },
  type: 'text',
  position: {
    anchor: {
      identity: {
        timestamp: 0,
        id: 0,
      },
      index: 0,
    },
    relation: 'inner-after',
  },
})

export const text456 = createMetaInfo({
  data: { content: '456' },
  piece: {
    identity: {
      timestamp: 2,
      id: 101,
    },
    start: 0,
    end: 3,
  },
  type: 'text',
  position: {
    anchor: {
      identity: text123.piece.identity,
      index: 0,
    },
    relation: 'after',
  },
})
export const text789 = createMetaInfo({
  data: { content: '789' },
  piece: {
    identity: {
      timestamp: 3,
      id: 102,
    },
    start: 0,
    end: 3,
  },

  type: 'text',
  position: {
    anchor: {
      identity: text123.piece.identity,
      index: 0,
    },
    relation: 'after',
  },
})
export const text0ab = createMetaInfo({
  data: { content: '0ab' },
  piece: {
    identity: {
      timestamp: 4,
      id: 103,
    },
    start: 0,
    end: 3,
  },

  type: 'text',
  position: {
    anchor: {
      identity: text456.piece.identity,
      index: 1,
    },
    relation: 'after',
  },
})
export const textDef = createMetaInfo({
  data: { content: 'def' },
  piece: {
    identity: {
      timestamp: 5,
      id: 104,
    },
    start: 0,
    end: 3,
  },

  type: 'text',
  position: {
    anchor: {
      identity: text789.piece.identity,
      index: 1,
    },
    relation: 'after',
  },
})

export const textOT = [text123, text456, text789, text0ab, textDef]

export const delete1 = createPieceMark({
  identity: {
    timestamp: 6,
    id: 200,
  },
  piece: {
    identity: text456.piece.identity,
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
      anchor: {
        identity: text789.piece.identity,
        index: 0,
      },
      relation: 'before',
    },
    {
      anchor: {
        identity: text789.piece.identity,
        index: 2,
      },
      relation: 'after',
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
    timestamp: 8,
    id: 301,
  },
  range: [
    {
      anchor: {
        identity: text789.piece.identity,
        index: 1,
      },
      relation: 'before',
    },
    {
      anchor: {
        identity: text123.piece.identity,
        index: 1,
      },
      relation: 'after',
    },
  ],
  data: { color: 'blue', fontStyle: 'italic' },
})

export const pieceMove = createPieceMove({
  identity: {
    id: 400,
    timestamp: 8,
  },
  srcPiece: {
    identity: text456.piece.identity,
    start: 1,
    end: 2,
  },
  aimPiece: {
    identity: textDef.piece.identity,
    start: 1,
    end: 2,
  },
})

export const textGHi = createMetaInfo({
  data: { content: 'ghi' },

  piece: {
    identity: {
      timestamp: 9,
      id: 105,
    },

    start: 0,
    end: 3,
  },

  type: 'text',

  position: {
    anchor: {
      identity: text456.piece.identity,
      index: 1,
    },
    relation: 'after',
  },
})

// 7-2之间 蓝色斜体
export const delete2 = createPieceMark({
  identity: {
    timestamp: 10,
    id: 201,
  },
  piece: {
    identity: text456.piece.identity,
    start: 1,
    end: 2,
  },
  data: {
    deleted: true,
  },
})

export const schemaMap = new Map<string, ISchema>()

schemaMap.set('text', {
  toTextContent(info) {
    const content = info.srcMetaInfo.data.content.slice(
      info.piece.start,
      info.piece.end,
    )
    return content
  },
})

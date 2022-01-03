import {
  IElement,
  IMarkData,
  IPieceReplacedElement,
  IReplacedElement,
  replacedElementMap,
  elementMap,
} from '@moonman/moonman'

function addToReplacedElementMap(params: IReplacedElement) {
  replacedElementMap.set(params.id, params)
}
function addToElementMap(params: IElement) {
  elementMap.set(params.id, params)
}

function addToMap(params: IReplacedElement, element: IElement) {
  addToReplacedElementMap(params)
  addToElementMap(element)
}

const rDoc: IReplacedElement = {
  id: 'r-doc0',
  type: 'doc',
  src: 'e-doc0',
}

const eDoc: IElement = {
  id: 'e-doc0',
  type: 'doc',
  operation: [
    {
      type: 'insert-child',
      nextId: 'r-par0',
      position: 'back-flow',
    },
  ],
}

addToMap(rDoc, eDoc)

const rPar: IReplacedElement = {
  id: 'r-par0',
  type: 'paragraph',
  src: 'e-par0',
  operation: [
    {
      type: 'insert-brother',
      nextId: 'r-table0',
      position: 'back-flow',
    },
  ],
}

const ePar: IElement = {
  id: 'e-par0',
  type: 'paragraph',
  operation: [
    {
      type: 'insert-child',
      nextId: 'r-mention-zanlei-0',
      position: 'back-flow',
    },
  ],
}

addToMap(rPar, ePar)

const rMentionZanlei: IReplacedElement = {
  id: 'r-mention-zanlei-0',
  type: 'mention',
  src: 'e-mention-zanlei-0',
  operation: [
    {
      type: 'insert-brother',
      nextId: 'r-文字0',
      position: 'back-flow',
    },
  ],
}

const eMentionZanlei: IElement = {
  id: 'e-mention-zanlei-0',
  type: 'mention',
  operation: [],
}

addToMap(rMentionZanlei, eMentionZanlei)

const r文字: IPieceReplacedElement = {
  id: 'r-文字0',
  type: 'text',
  src: 'e-文字0',
  operation: [
    {
      type: 'insert-brother',
      nextId: 'r-image-zhumulangma-0',
      position: 'back-flow',
    },
  ],
}

const e文字: IElement = {
  id: 'e-文字0',
  type: 'text',
  content: '我们去',
}

addToMap(r文字, e文字)

const rImageZhumulangma: IReplacedElement = {
  id: 'r-image-zhumulangma-0',
  type: 'image',
  src: 'e-image-zhumulangma-0',
  operation: [
    {
      type: 'insert-brother',
      nextId: 'r-文字1',
      position: 'back-flow',
    },
  ],
}

const eImageZhumulangma: IElement = {
  id: 'e-image-zhumulangma-0',
  type: 'image',
  operation: [],
}

addToMap(rImageZhumulangma, eImageZhumulangma)

const r文字1: IPieceReplacedElement = {
  id: 'r-文字1',
  type: 'text',
  src: 'e-文字1',
  operation: [
    {
      type: 'insert-brother',
      nextId: 'r-flow-chart-0',
      position: 'back-flow',
    },
    {
      type: 'insert-brother',
      nextId: 'r-文字2',
      position: 'back-flow',
      offsetIndex: 1,
    },
  ],
}

const e文字1: IElement = {
  id: 'e-文字1',
  type: 'text',
  content: '这是安排',
  operation: [
    {
      type: 'end-mark-pointer',
      markId: 'mark-0',
      offsetIndex: 3,
    },
  ],
}
addToMap(r文字1, e文字1)

const r文字2: IPieceReplacedElement = {
  id: 'r-文字2',
  type: 'text',
  src: 'e-文字2',
  operation: [
    {
      type: 'insert-brother',
      nextId: 'r-文字3',
      position: 'back-flow',
      offsetIndex: 1,
    },
  ],
}

const e文字2: IElement = {
  id: 'e-文字2',
  type: 'text',
  content: '我做的',
  operation: [
    {
      type: 'start-mark-pointer',
      markId: 'mark-0',
      offsetIndex: 0,
    },
  ],
}

addToMap(r文字2, e文字2)

const mark0: IMarkData = {
  id: 'mark-0',
  data: {
    backgroundColor: 'yellow',
  },
}

const r文字3: IPieceReplacedElement = {
  id: 'r-文字3',
  type: 'text',
  src: 'e-文字3',
}

const e文字3: IElement = {
  id: 'e-文字3',
  type: 'text',
  content: '喻碧云',
  operation: [],
}

addToMap(r文字3, e文字3)

const rFLowChart: IReplacedElement = {
  id: 'r-flow-chart-0',
  type: 'flow-chart',
  src: 'e-flow-chart-0',
}

const eFlowChart: IElement = {
  id: 'e-flow-chart-0',
  type: 'flow-chart',
  operation: [],
}

addToMap(rFLowChart, eFlowChart)

const rTable: IReplacedElement = {
  id: 'r-table0',
  type: 'table',
  src: 'e-table0',
}
const eTable: IElement = {
  id: 'e-table0',
  type: 'table',
  operation: [
    {
      type: 'insert-child',
      position: 'back-flow',
      nextId: 'r-row0',
    },
    {
      type: 'insert-child',
      position: 'back-flow',
      nextId: 'r-col0',
    },
    {
      type: 'teleport-insert-child',
      nextId: 'r-文字4',
      position: 'back-flow',
      coordinate: ['e-row0', 'e-col0'],
    },
    {
      type: 'teleport-insert-child',
      nextId: 'r-文字5',
      position: 'back-flow',
      coordinate: ['e-row0', 'e-col3'],
    },
    {
      type: 'start-teleport-mark-pointer',
      markId: 'mark2',
      coordinate: ['e-row0', 'e-col0'],
    },
    {
      type: 'end-teleport-mark-pointer',
      markId: 'mark2',
      coordinate: ['e-row0', 'e-col3'],
    },
  ],
}

addToMap(rTable, eTable)

const mark2: IMarkData = {
  id: 'mark2',
  data: {
    backgroundColor: 'red',
  },
}

const rRow0: IReplacedElement = {
  id: 'r-row0',
  type: 'row',
  src: 'e-row0',
  operation: [
    {
      type: 'insert-brother',
      position: 'back-flow',
      nextId: 'r-row1',
    },
    {
      type: 'insert-brother',
      position: 'front-flow',
      nextId: 'r-row2',
    },
  ],
}

const eRow0: IElement = {
  id: 'e-row0',
  type: 'row',
}

addToMap(rRow0, eRow0)

const rRow1: IReplacedElement = {
  id: 'r-row1',
  type: 'row',
  src: 'e-row1',
}

const eRow1: IElement = {
  id: 'e-row1',
  type: 'row',
}

addToMap(rRow1, eRow1)

const rRow2: IReplacedElement = {
  id: 'r-row2',
  type: 'row',
  src: 'e-row2',
}

const eRow2: IElement = {
  id: 'e-row2',
  type: 'row',
  operation: [],
}

addToMap(rRow2, eRow2)

const rCol0: IReplacedElement = {
  id: 'r-col0',
  type: 'col',
  src: 'e-col0',
  operation: [
    {
      type: 'insert-brother',
      position: 'back-flow',
      nextId: 'r-col1',
    },
    {
      type: 'insert-brother',
      position: 'back-flow',
      nextId: 'r-col2',
    },
    {
      type: 'insert-brother',
      position: 'back-flow',
      nextId: 'r-col3',
    },
  ],
}

const eCol0: IElement = {
  id: 'e-col0',
  type: 'col',
  operation: [
    {
      type: 'element-mark',
      markId: 'mark-1',
    },
  ],
}

addToMap(rCol0, eCol0)

const mark1: IMarkData = {
  id: 'mark-1',
  data: {
    width: 300,
  },
}

const rCol1: IReplacedElement = {
  id: 'r-col1',
  type: 'col',
  src: 'e-col1',
}

const eCol1: IElement = {
  id: 'e-col1',
  type: 'col',
  operation: [],
}

addToMap(rCol1, eCol1)

const rCol2: IReplacedElement = {
  id: 'r-col2',
  type: 'col',
  src: 'e-col2',
}

const eCol2: IElement = {
  id: 'e-col2',
  type: 'col',
  operation: [],
}

addToMap(rCol2, eCol2)

const rCol3: IReplacedElement = {
  id: 'r-col3',
  type: 'col',
  src: 'e-col3',
}

const eCol3: IElement = {
  id: 'e-col3',
  type: 'col',
  operation: [],
}

addToMap(rCol3, eCol3)

const r文字4: IPieceReplacedElement = {
  id: 'r-文字4',
  type: 'text',
  src: 'e-文字4',
}

const e文字4: IElement = {
  id: 'e-文字4',
  type: 'text',
  content: '第一个格子',
  operation: [],
}

addToMap(r文字4, e文字4)

const r文字5: IPieceReplacedElement = {
  id: 'r-文字5',
  type: 'text',
  src: 'e-文字5',
}

const e文字5: IElement = {
  id: 'e-文字5',
  type: 'text',
  content: '第二个格子',
  operation: [],
}

addToMap(r文字5, e文字5)

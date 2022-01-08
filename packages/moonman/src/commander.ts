import { enableAllPlugins } from 'immer'
enableAllPlugins()

interface IElementBase {
  type: string
}
interface IReplacedElementInfo extends IElementBase {
  type: 'IReplacedElement'
  id: string
  src: string
  operationList: TReplacedElementOperation[]
}

interface IElementInfo extends IElementBase {
  type: 'IElementInfo'
  id: string
  operationList: TElementOperation[]
}

interface INode {
  replacedElementInfo: IReplacedElementInfo
  elementInfo: IElementInfo
  children: INode[]
  parentElement: INode | null
}

/**
 * 插入元素
 * 兄弟元素插在 ReplacedElement 上
 * 子元素插在 Element 上
 */
export interface IInsertChildForElementOperation {
  type: 'insert-child'
  nextId: string
  position: 'front-flow' | 'back-flow'
  timestamp: number
}
export interface IInsertBrotherForReplacedElementOperation {
  type: 'insert-brother'
  nextId: string
  position: 'front-flow' | 'back-flow'
  // 文字节点会用到
  offsetIndex?: number
  timestamp: number
}

type TElementOperation = IInsertChildForElementOperation
type TReplacedElementOperation = IInsertBrotherForReplacedElementOperation

interface IElementOperationContainer {
  type: 'ElementOperation'
  op: TElementOperation
  containerId: string
}
interface IReplacedElementOperationContainer {
  type: 'ReplacedElementOperation'
  op: TReplacedElementOperation
  containerId: string
}

type TOperationForExec =
  | IElementOperationContainer
  | IReplacedElementOperationContainer

// 外部数据源
export const replacedElementInfoMap = new Map<string, IReplacedElementInfo>()

interface IOperationList {
  mergedOperationList: TOperationForExec[]
  execedOperationList: TOperationForExec[]
  infoMap: {
    replacedElementInfoMap: Map<string, IReplacedElementInfo>
    elementInfoMap: Map<string, IElementInfo>
    elementToNodeMap: Map<string, INode>
  }
}

function useOperationList(): IOperationList {
  const mergedOperationList: TOperationForExec[] = []
  const execedOperationList: TOperationForExec[] = []

  const replacedElementInfoMap = new Map<string, IReplacedElementInfo>()
  const elementInfoMap = new Map<string, IElementInfo>()
  const elementToNodeMap = new Map<string, INode>()

  return {
    mergedOperationList,
    execedOperationList,
    infoMap: {
      replacedElementInfoMap,
      elementInfoMap,
      elementToNodeMap,
    },
  }
}

interface IState {
  doc: INode
  operationList: IOperationList
}

const getElement = (state: IState, id: string): IElementInfo => {
  const element = state.operationList.infoMap.elementInfoMap.get(id)
  if (!element) {
    const newElement: IElementInfo = {
      type: 'IElementInfo',
      id,
      operationList: [],
    }

    return newElement
  } else {
    return element
  }
}

const getReplacedElement = (
  state: IState,
  id: string,
): IReplacedElementInfo => {
  const element = state.operationList.infoMap.replacedElementInfoMap.get(id)
  if (!element) {
    const newReplacedElement: IReplacedElementInfo = {
      type: 'IReplacedElement',
      src: 'r' + id,
      id,
      operationList: [],
    }

    return newReplacedElement
  } else {
    return element
  }
}

const insertChildForNode = (
  state: IState,
  node: INode,
  op: IInsertChildForElementOperation,
) => {
  const childReplacedElement = getReplacedElement(state, op.nextId)
  const childElement = getElement(state, childReplacedElement.src)

  const childNode: INode = {
    children: [],
    elementInfo: childElement,
    replacedElementInfo: childReplacedElement,
    parentElement: node,
  }

  switch (op.position) {
    case 'back-flow':
      node.children.unshift(childNode)
      break
    case 'front-flow':
      node.children.push(childNode)
      break

    default:
      break
  }
}

const insertBrotherForNode = (
  state: IState,
  node: INode,
  op: IInsertBrotherForReplacedElementOperation,
) => {
  const brotherReplacedElement = getReplacedElement(state, op.nextId)
  const brotherElement = getElement(state, brotherReplacedElement.src)

  const brotherNode: INode = {
    children: [],
    elementInfo: brotherElement,
    replacedElementInfo: brotherReplacedElement,
    parentElement: node,
  }

  if (node.parentElement) {
    const index = node.parentElement?.children.findIndex((child) => {
      return child === node
    })

    switch (op.position) {
      case 'back-flow':
        node.parentElement.children.splice(index, 0, brotherNode)
        break
      case 'front-flow':
        node.parentElement.children.splice(index + 1, 0, brotherNode)
        break

      default:
        break
    }
  } else {
    console.error('should not add brother for root node')
  }
}

const execOperationForElement = (
  state: IState,
  elementOperationContainer: IElementOperationContainer,
) => {
  const containerNode = getContainerNode(
    state,
    elementOperationContainer.containerId,
  )
  const op = elementOperationContainer.op
  switch (op.type) {
    case 'insert-child':
      insertChildForNode(state, containerNode, op)
      break
    default:
      break
  }
}

const execOperationForReplacedElement = (
  state: IState,
  replacedElementOperationContainer: IReplacedElementOperationContainer,
) => {
  const containerNode = getContainerNode(
    state,
    replacedElementOperationContainer.containerId,
  )

  switch (replacedElementOperationContainer.op.type) {
    case 'insert-brother':
      insertBrotherForNode(
        state,
        containerNode,
        replacedElementOperationContainer.op,
      )
      break

    default:
      break
  }
}

const execOperation = (state: IState) => {
  const operation = state.operationList.execedOperationList.shift()
  if (operation) {
    switch (operation.type) {
      case 'ElementOperation':
        execOperationForElement(state, operation)
        break
      case 'ReplacedElementOperation':
        execOperationForReplacedElement(state, operation)
        break

      default:
        break
    }
  } else {
    console.log('no operation')
  }
}

export function createEnv(doc: INode) {
  const state: IState = {
    doc,
    operationList: useOperationList(),
  }

  const run = () => {
    execOperation(state)
  }

  return {
    state,
    execOperation,
    run,
  }
}

function getContainerNode(state: IState, containerId: string): INode {
  const node = state.operationList.infoMap.elementToNodeMap.get(containerId)

  if (!node) {
    throw new Error('node not exist')
  }

  return node
}

export function createDoc() {
  const rDoc: IReplacedElementInfo = {
    id: 'r-doc0',
    type: 'IReplacedElement',
    src: 'e-doc0',
    operationList: [],
  }

  const eDoc: IElementInfo = {
    id: 'e-doc0',
    type: 'IElementInfo',
    operationList: [],
  }

  const docNode: INode = {
    children: [],
    elementInfo: eDoc,
    replacedElementInfo: rDoc,
    parentElement: null,
  }

  return docNode
}

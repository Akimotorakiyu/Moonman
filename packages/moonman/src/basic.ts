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

/**
 * 指针式 Mark
 * for element
 * for replaced element
 */
interface IMarkPointerForElementOperation {
  type: 'start-mark-pointer' | 'end-mark-pointer'
  markId: string
  // for text
  offsetIndex: number
  timestamp: number
}
interface IMarkPointerForReplacedElementOperation {
  type: 'start-replaced-mark-pointer' | 'end-replaced-mark-pointer'
  markId: string
  timestamp: number
}

/**
 * 元素 mark
 * for element
 * for replaced element
 */
interface IElementMarkOperation {
  type: 'element-mark'
  markId: string
  timestamp: number
}

interface IReplacedElementMarkOperation {
  type: 'replaced-element-mark'
  markId: string
  timestamp: number
}

/**
 * for table
 * 只给 table element
 */
interface ITeleportInsertChildForTableElementOperation {
  type: 'teleport-insert-child'
  nextId: string
  position: 'front-flow' | 'back-flow'
  coordinate: string[]
  timestamp: number
}

interface ITeleportMarkPointerForTableElementOperation {
  type: 'start-teleport-mark-pointer' | 'end-teleport-mark-pointer'
  markId: string
  coordinate: string[]
  timestamp: number
}

/**
 * 真实会改变节点内容的操作
 */
type TElementOperation =
  | IInsertChildForElementOperation
  | IMarkPointerForElementOperation
  | ITeleportInsertChildForTableElementOperation
  | IElementMarkOperation
  | ITeleportMarkPointerForTableElementOperation

type TReplacedElementOperation =
  | IInsertBrotherForReplacedElementOperation
  | IReplacedElementMarkOperation
  | IMarkPointerForReplacedElementOperation

export interface ICommonReplacedElement {
  id: string
  src: string
  type: string
  operation?: TReplacedElementOperation[]
  isPieceReplacedElement?: boolean
}

export type IReplacedElement = ICommonReplacedElement | IPieceReplacedElement

// for text
export interface IPieceReplacedElement extends ICommonReplacedElement {
  isPieceReplacedElement: true
}

export interface IElement {
  id: string
  type: string
  operation?: TElementOperation[]
  content?: string
}

export interface IMarkData {
  id: string
  data: Record<string, any>
}

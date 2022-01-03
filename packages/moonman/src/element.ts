import {
  IElement,
  IInsertChildForElementOperation,
  IReplacedElement,
  IInsertBrotherForReplacedElementOperation,
  TElementOperation,
  TMergedOperationContainer,
  TReplacedElementOperation,
} from './basic'

export const replacedElementInfoMap = new Map<string, IReplacedElement>()
export const elementInfoMap = new Map<string, IElement>()

export const mergedOperationList: TMergedOperationContainer[] = []
export let lastIndex = -1

const replacedElementMap = new Map<string, MReplacedElement[]>()
const elementMap = new Map<string, MElement>()

function addToReplacedElementMap(ele: MReplacedElement) {
  if (!replacedElementMap.has(ele.replacedElementInfo.id)) {
    replacedElementMap.set(ele.replacedElementInfo.id, [])
  }

  const arr = replacedElementMap.get(ele.replacedElementInfo.id)
  arr?.push(ele)

  mergedOperationList.push(
    ...(ele.replacedElementInfo.operation?.map((op) => {
      return {
        op,
        type: 'ReplacedElementOperation' as const,
        containerId: ele.replacedElementInfo.id,
      }
    }) ?? []),
  )

  mergedOperationList.sort((a, b) => {
    return a.op.timestamp - b.op.timestamp
  })
}
function addToElementMap(ele: MElement) {
  elementMap.set(ele.elementInfo.id, ele)

  mergedOperationList.push(
    ...(ele.elementInfo.operation?.map((op) => {
      return {
        op,
        type: 'ElementOperation' as const,
        containerId: ele.elementInfo.id,
      }
    }) ?? []),
  )

  mergedOperationList.sort((a, b) => {
    return a.op.timestamp - b.op.timestamp
  })
}

// 历史永远只会向前
function execOperation() {
  const index = lastIndex + 1
  const op = mergedOperationList[index]

  if (!op) {
    return
  }

  console.log(index, op)

  if (op.type === 'ReplacedElementOperation') {
    const id = (op as any).containerId
    const rel = replacedElementMap.get(id)!

    rel[0].execOperation(op.op)
  } else {
    const id = (op as any).containerId
    const rel = elementMap.get(id)!

    rel.execOperation(op.op)
  }

  lastIndex = index

  execOperation()
}

export class MRootElement {
  rootReplacedDocelement: MReplacedElement

  constructor(docId: string) {
    this.rootReplacedDocelement = getReplacedElement(docId, null)

    execOperation()
  }
}

function getReplacedElement(id: string, parentElement: MElement | null) {
  const replacedElementInfo = replacedElementInfoMap.get(id)
  if (replacedElementInfo) {
    if (replacedElementInfo.isPieceReplacedElement) {
      const rEle = new MPieceReplacedElement(replacedElementInfo, parentElement)

      addToReplacedElementMap(rEle)
      return rEle
    } else {
      const rEle = new MReplacedElement(replacedElementInfo, parentElement)
      addToReplacedElementMap(rEle)
      return rEle
    }
  } else {
    throw new Error(`${id} not has a replacedElementInfo`)
  }
}

export class MReplacedElement {
  constructor(
    public replacedElementInfo: IReplacedElement,
    public parentElement: MElement | null,
  ) {
    this.element = MElement.get(this.replacedElementInfo.src)
    // this.init()
  }

  // init() {
  //   this.replacedElementInfo.operation?.filter((op) => {
  //     this.execOperation(op)
  //   })
  // }

  execOperation(op: TReplacedElementOperation) {
    switch (op.type) {
      case 'insert-brother':
        this.dealInsertBrother(op)
        break

      default:
        break
    }
  }

  dealInsertBrother(op: IInsertBrotherForReplacedElementOperation) {
    switch (op.position) {
      case 'back-flow':
        this.before(op.nextId)
        break

      case 'front-flow':
        this.after(op.nextId)
        break

      default:
        const err = new Error(`${op.position}`)
        throw err
    }
  }

  before(id: string) {
    if (this.parentElement) {
      const index = this.parentElement?.children.findIndex(
        (replacedElement) => {
          return (
            replacedElement.replacedElementInfo.id ===
            this.replacedElementInfo.id
          )
        },
      )

      this.parentElement.children.splice(
        index,
        0,
        getReplacedElement(id, this.parentElement),
      )
    } else {
      throw new Error(`no parentElement ${id}`)
    }
  }

  after(id: string) {
    if (this.parentElement) {
      const index = this.parentElement?.children.findIndex(
        (replacedElement) => {
          return (
            replacedElement.replacedElementInfo.id ===
            this.replacedElementInfo.id
          )
        },
      )

      this.parentElement.children.splice(
        index + 1,
        0,
        getReplacedElement(id, this.parentElement),
      )
    } else {
      throw new Error(`no parentElement ${id}`)
    }
  }

  element: MElement
}

export class MElement {
  constructor(public elementInfo: IElement) {
    // this.init()
  }

  static get(id: string) {
    const elementInfo = elementInfoMap.get(id)
    if (elementInfo) {
      const ele = new MElement(elementInfo)
      addToElementMap(ele)
      return ele
    } else {
      throw new Error(`${id} not has a replacedElementInfo`)
    }
  }

  // init() {
  //   this.elementInfo.operation?.filter((op) => {
  //     switch (op.type) {
  //       case 'insert-child':
  //         this.dealInsertChild(op)
  //         break

  //       default:
  //         break
  //     }
  //   })
  // }

  execOperation(op: TElementOperation) {
    switch (op.type) {
      case 'insert-child':
        this.dealInsertChild(op)
        break

      default:
        break
    }
  }

  dealInsertChild(op: IInsertChildForElementOperation) {
    switch (op.position) {
      case 'back-flow':
        this.children.unshift(getReplacedElement(op.nextId, this))
        break

      case 'front-flow':
        this.children.push(getReplacedElement(op.nextId, this))
        break

      default:
        const err = new Error(`${op.position}`)
        throw err
    }
  }

  children: MReplacedElement[] = []
}

export class MPieceReplacedElement extends MReplacedElement {}
export class MPieceElement extends MElement {}

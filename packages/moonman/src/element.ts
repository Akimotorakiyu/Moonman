import {
  IElement,
  IInsertChildForElementOperation,
  IReplacedElement,
  IInsertBrotherForReplacedElementOperation,
} from './basic'

export const replacedElementMap = new Map<string, IReplacedElement>()
export const elementMap = new Map<string, IElement>()

export class MRootElement {
  replacedDocelement: MReplacedElement
  constructor(docId: string) {
    this.replacedDocelement = getReplacedElement(docId, null)
  }
}

function getReplacedElement(id: string, parentElement: MElement | null) {
  const replacedElementInfo = replacedElementMap.get(id)
  if (replacedElementInfo) {
    if (replacedElementInfo.isPieceReplacedElement) {
      return new MPieceReplacedElement(replacedElementInfo, parentElement)
    } else {
      return new MReplacedElement(replacedElementInfo, parentElement)
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
    this.init()
  }

  init() {
    this.replacedElementInfo.operation?.filter((op) => {
      switch (op.type) {
        case 'insert-brother':
          this.dealInsertBrother(op)
          break

        default:
          break
      }
    })
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
    this.init()
  }

  static get(id: string) {
    const elementInfo = elementMap.get(id)
    if (elementInfo) {
      return new MElement(elementInfo)
    } else {
      throw new Error(`${id} not has a replacedElementInfo`)
    }
  }

  init() {
    this.elementInfo.operation?.filter((op) => {
      switch (op.type) {
        case 'insert-child':
          this.dealInsertChild(op)
          break

        default:
          break
      }
    })
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

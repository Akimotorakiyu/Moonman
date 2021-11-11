import { IIdentity, IPosition, TRelativePos } from './basic'
import { ITextNode } from './textNode'
export interface IMetaView {
  identity: IIdentity
  start: number
  content: string
  data: Record<string, any>
}

export class MetaView implements IMetaView {
  constructor(
    public start: number,
    public end: number,
    public data: Record<string, any>,
    public srcTextNode: ITextNode,
  ) {
    if (start < 0 || this.length < 0) {
      throw new Error('start 和 length 不能小于 0')
    }
  }

  get content() {
    return this.srcTextNode.content.slice(this.start, this.end)
  }

  get identity() {
    return this.srcTextNode.identity
  }

  get length() {
    return this.end - this.start
  }

  isInRange(position: IPosition) {
    if (this.isInThisTextNode(position)) {
      const isAfterStart = this.start <= position.index
      const isBeforeEnd = position.index < this.end

      return isAfterStart && isBeforeEnd
    } else {
      return false
    }
  }

  mappingIndexToRelativeIndex(index: number, relativePos: TRelativePos) {
    switch (relativePos) {
      case 'before':
        return index
        break
      case 'after':
        return index + 1
        break
      case 'inner-before':
      case 'inner-after':
        throw new Error('未支持')
        break

      default:
        let never: never = relativePos
        return never
    }
  }

  splitByPosition(position: IPosition) {
    this.checkIsInThisTextNode(position)

    const index = this.mappingIndexToRelativeIndex(
      position.index,
      position.relativePos,
    )

    const beforeMetaView = new MetaView(
      this.start,
      index,
      { ...this.data },
      this.srcTextNode,
    )

    const afterMetaView = new MetaView(
      index,
      this.end,
      { ...this.data },
      this.srcTextNode,
    )

    return [beforeMetaView, afterMetaView] as [MetaView, MetaView]
  }

  splitByTwoPosition(startPosition: IPosition, endPosition: IPosition) {
    this.checkIsInThisTextNode(startPosition)
    this.checkIsInThisTextNode(endPosition)
    const indexA = this.mappingIndexToRelativeIndex(
      startPosition.index,
      startPosition.relativePos,
    )
    const indexB = this.mappingIndexToRelativeIndex(
      endPosition.index,
      endPosition.relativePos,
    )

    const beforeMetaView = new MetaView(
      this.start,
      indexA,
      { ...this.data },
      this.srcTextNode,
    )

    const middleMetaView = new MetaView(
      indexA,
      indexB,
      { ...this.data },
      this.srcTextNode,
    )
    const afterMetaView = new MetaView(
      indexB,
      this.end,
      { ...this.data },
      this.srcTextNode,
    )

    return [beforeMetaView, middleMetaView, afterMetaView] as [
      MetaView,
      MetaView,
      MetaView,
    ]
  }

  private checkIsInThisTextNode(position: IPosition) {
    if (!this.isInThisTextNode(position)) {
      throw new Error('不在当前节点')
    }
  }

  isInThisTextNode(position: IPosition) {
    const isInThisTextNode =
      position.identity.timestamp == this.identity.timestamp &&
      this.identity.id === position.identity.id

    return isInThisTextNode
  }

  configData(data: Record<string, any>) {
    return new MetaView(
      this.start,
      this.end,
      { ...this.data, ...data },
      this.srcTextNode,
    )
  }
}

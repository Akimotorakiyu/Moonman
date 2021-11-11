import { IPosition, TRelativePos } from './basic'
import { ITextNode } from './textNode'
export interface IMetaView {
  id: number
  start: number
  content: string
  timestamp: number
  data: Record<string, any>
}

export class MetaView implements IMetaView {
  constructor(
    public start: number,
    public length: number,
    public data: Record<string, any>,
    public srcTextNode: ITextNode,
  ) {
    if (start < 0 || length < 0) {
      throw new Error('start 或 length 不能小于 0')
    }
  }

  get content() {
    return this.srcTextNode.content.slice(this.start, this.start + this.length)
  }

  get timestamp() {
    return this.srcTextNode.timestamp
  }

  get id() {
    return this.srcTextNode.id
  }

  isInRange(position: IPosition) {
    if (this.isInThisTextNode(position)) {
      const isAfterStart = this.start <= position.index
      const isBeforeEnd = position.index < this.start + this.content.length

      return isAfterStart && isBeforeEnd
    } else {
      return false
    }
  }

  mappingIndexToThisRange(index: number, relativePos: TRelativePos) {
    const pos = index - this.start
    let gap = -1
    switch (relativePos) {
      case 'before':
        gap = pos
        break
      case 'after':
        gap = pos + 1
        break
      case 'inner-before':
      case 'inner-after':
        throw new Error('未支持')
        break

      default:
        let never: never = relativePos
        return never
    }
    return gap
  }

  splitByPosition(position: IPosition) {
    this.checkIsInThisTextNode(position)

    const index = this.mappingIndexToThisRange(
      position.index,
      position.relativePos,
    )

    const beforeLength = index
    const afterLength = this.length - index

    if (beforeLength < 0 || afterLength < 0) {
      throw new Error('length 不能小于 0')
    }

    const beforeMetaView = new MetaView(
      this.start,
      beforeLength,
      { ...this.data },
      this.srcTextNode,
    )

    const afterMetaView = new MetaView(
      index,
      afterLength,
      { ...this.data },
      this.srcTextNode,
    )

    return [beforeMetaView, afterMetaView] as const
  }

  splitByTwoPosition(startPosition: IPosition, endPosition: IPosition) {
    this.checkIsInThisTextNode(startPosition)
    this.checkIsInThisTextNode(endPosition)
    const indexA = this.mappingIndexToThisRange(
      startPosition.index,
      startPosition.relativePos,
    )
    const indexB = this.mappingIndexToThisRange(
      endPosition.index,
      endPosition.relativePos,
    )

    const beforeLength = indexA
    const middleLength = indexB - indexA
    const afterLength = this.length - indexB

    if (beforeLength < 0 || middleLength < 0 || afterLength < 0) {
      throw new Error('length 不能小于 0')
    }

    const beforeMetaView = new MetaView(
      this.start,
      beforeLength,
      { ...this.data },
      this.srcTextNode,
    )

    const middleMetaView = new MetaView(
      this.start,
      middleLength,
      { ...this.data },
      this.srcTextNode,
    )
    const afterMetaView = new MetaView(
      this.start,
      afterLength,
      { ...this.data },
      this.srcTextNode,
    )

    return [beforeMetaView, middleMetaView, afterMetaView] as const
  }

  private checkIsInThisTextNode(position: IPosition) {
    if (!this.isInThisTextNode(position)) {
      throw new Error('不在当前节点')
    }
  }

  isInThisTextNode(position: IPosition) {
    const isInThisTextNode =
      position.timestamp == this.timestamp && this.id === position.id
    return isInThisTextNode
  }

  configData(data: Record<string, any>) {
    return new MetaView(
      this.start,
      this.length,
      { ...this.data, ...data },
      this.srcTextNode,
    )
  }
}

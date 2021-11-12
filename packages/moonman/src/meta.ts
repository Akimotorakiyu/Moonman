import {
  IIdentity,
  IRelativePosition,
  isTheSameIdentity,
  TRelation,
  IPosition,
  positionInPiece,
  IPiece,
} from './basic'
import { IPieceText } from './textNode'
export interface IMetaView extends IPiece {
  content: string
  data: Record<string, any>
  srcTextNode: IPieceText
}

export class MetaView implements IMetaView {
  constructor(
    public start: number,
    public end: number,
    public data: Record<string, any>,
    public srcTextNode: IPieceText,
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
    return positionInPiece(position, this)
  }

  mappingIndexToRelativeIndex(index: number, relativePos: TRelation) {
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

  splitByPosition(position: IRelativePosition) {
    this.checkIsInThisTextNode(position)

    const index = this.mappingIndexToRelativeIndex(
      position.anchor.index,
      position.relation,
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

  splitByTwoPosition(
    startPosition: IRelativePosition,
    endPosition: IRelativePosition,
  ) {
    this.checkIsInThisTextNode(startPosition)
    this.checkIsInThisTextNode(endPosition)
    const indexA = this.mappingIndexToRelativeIndex(
      startPosition.anchor.index,
      startPosition.relation,
    )
    const indexB = this.mappingIndexToRelativeIndex(
      endPosition.anchor.index,
      endPosition.relation,
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

  private checkIsInThisTextNode(position: IRelativePosition) {
    if (!this.isInThisTextPiece(position.anchor.identity)) {
      throw new Error('不在当前节点')
    }
  }

  isInThisTextPiece(identity: IIdentity) {
    return isTheSameIdentity(this.identity, identity)
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

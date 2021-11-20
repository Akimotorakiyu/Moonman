import {
  IIdentity,
  IRelativePosition,
  isTheSameIdentity,
  TRelation,
  IPosition,
  positionInPiece,
  IPiece,
} from '../operation'
import { IMetaInfo } from '../operation/piece'

export class MetaView {
  constructor(
    public piece: IPiece,
    public data: Record<string, any>,
    public srcMetaInfo: IMetaInfo,
  ) {
    if (piece.start < 0 || this.length < 0) {
      throw new Error('start 和 length 不能小于 0')
    }
  }

  get length() {
    return this.piece.end - this.piece.start
  }

  isInRange(position: IPosition) {
    return positionInPiece(position, this.piece)
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
      {
        identity: this.piece.identity,
        start: this.piece.start,
        end: index,
      },
      { ...this.data },
      this.srcMetaInfo,
    )

    const afterMetaView = new MetaView(
      {
        identity: this.piece.identity,
        start: index,
        end: this.piece.end,
      },
      { ...this.data },
      this.srcMetaInfo,
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
      {
        identity: this.piece.identity,
        start: this.piece.start,
        end: indexA,
      },
      { ...this.data },
      this.srcMetaInfo,
    )

    const middleMetaView = new MetaView(
      {
        identity: this.piece.identity,
        start: indexA,
        end: indexB,
      },

      { ...this.data },
      this.srcMetaInfo,
    )
    const afterMetaView = new MetaView(
      {
        identity: this.piece.identity,
        start: indexB,
        end: this.piece.end,
      },
      { ...this.data },
      this.srcMetaInfo,
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
    return isTheSameIdentity(this.piece.identity, identity)
  }

  configData(data: Record<string, any>) {
    return new MetaView(
      {
        ...this.piece,
      },
      { ...this.data, ...data },
      this.srcMetaInfo,
    )
  }
}

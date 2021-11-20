import { createMetaInfo } from '../operation/'
import {
  computedPositionFromPiece,
  identitySortMethod,
  positionInPiece,
} from '../operation'
import { MetaView } from './metaView'
import { IPieceMark, IMetaInfo, IPieceMove } from '../operation/piece'
import { IRangeMark } from '../operation/range'

export interface ISchema {
  toTextContent(info: MetaView): string
}

export class Fragment {
  constructor(
    public schemaMap: Map<string, ISchema>,
    pieceText: IMetaInfo[] = [],
    pieceMark: IPieceMark[] = [],
    rangeMark: IRangeMark[] = [],
    pieceMove: IPieceMove[] = [],
  ) {
    this.pieceText = [...pieceText]
    this.pieceMark = [...pieceMark]
    this.rangeMark = [...rangeMark]
    this.pieceMove = [...pieceMove]

    // sort
    pieceText.sort((itemA, itemB) => {
      return identitySortMethod(itemA.piece, itemB.piece)
    })
    pieceMark.sort(identitySortMethod)
    rangeMark.sort(identitySortMethod)

    this.dealMove()
    this.dealPieceText()
    this.dealPieceMark()
    this.dealRangeMark()
  }

  pieceText: IMetaInfo[]
  pieceMark: IPieceMark[]
  rangeMark: IRangeMark[]
  pieceMove: IPieceMove[]

  listing: MetaView[] = []

  dealPieceText() {
    this.pieceText.forEach((textNode, index) => {
      if (index > 0) {
        const beforeIndex = this.listing.findIndex((item) => {
          return item.isInRange(textNode.position.anchor)
        })

        const before = this.listing[beforeIndex]

        const part = before.splitByPosition(textNode.position)

        const newSlice = [
          part[0],
          new MetaView(
            {
              ...textNode.piece,
            },
            {},
            textNode,
          ),
          part[1],
        ]

        newSlice.filter((item) => {
          return Boolean(item.length)
        })

        this.listing.splice(beforeIndex, 1, ...newSlice)
      } else {
        this.listing.push(
          new MetaView(
            {
              ...textNode.piece,
            },
            {},
            textNode,
          ),
        )
      }
    })
  }

  dealMove() {
    this.pieceMove.forEach((move) => {
      this.pieceText.forEach((text, index, arr) => {
        const isInMovePiece = positionInPiece(
          text.position.anchor,
          move.srcPiece,
        )

        // todo need ensure time
        const isAfterMoveOT =
          text.piece.identity.timestamp > move.identity.timestamp

        if (isInMovePiece && isAfterMoveOT) {
          const newTextPiece = createMetaInfo({
            type: 'text',
            data: {
              ...text.data,
            },
            piece: { ...text.piece },
            position: {
              anchor: {
                identity: move.aimPiece.identity,
                index:
                  text.position.anchor.index -
                  move.srcPiece.start +
                  move.aimPiece.start,
              },
              relation: text.position.relation,
            },
          })

          arr[index] = newTextPiece
        }
      })

      this.pieceMark.forEach((mark, index, arr) => {
        const pieceRange = computedPositionFromPiece(mark.piece)
        const isStartInItem = positionInPiece(
          pieceRange[0].anchor,
          move.srcPiece,
        )
        const isEndInItem = positionInPiece(pieceRange[1].anchor, move.srcPiece)

        // todo need ensure time
        const isAfterMoveOT = mark.identity.timestamp > move.identity.timestamp

        if (isAfterMoveOT) {
          if (isStartInItem && isEndInItem) {
            const newBefore: IPieceMark = {
              identity: mark.identity,
              data: mark.data,
              piece: {
                identity: mark.piece.identity,
                start: mark.piece.start,
                end: move.srcPiece.start,
              },
            }
            const newMiddle: IPieceMark = {
              identity: mark.identity,
              data: mark.data,
              piece: {
                identity: move.aimPiece.identity,
                start: move.aimPiece.start,
                end: move.aimPiece.end,
              },
            }
            const newEnd: IPieceMark = {
              identity: mark.identity,
              data: mark.data,
              piece: {
                identity: mark.piece.identity,
                start: move.srcPiece.end,
                end: mark.piece.end,
              },
            }

            const newSlice = [newBefore, newMiddle, newEnd]

            newSlice.filter((item) => {
              return Boolean(item.piece.start - item.piece.end)
            })

            arr[index] = newSlice as any
          } else if (!isStartInItem && isEndInItem) {
            const newBefore: IPieceMark = {
              identity: mark.identity,
              data: mark.data,
              piece: {
                identity: move.aimPiece.identity,
                start:
                  mark.piece.start - move.srcPiece.start + move.aimPiece.start,
                end: mark.piece.end - move.srcPiece.end + move.aimPiece.end,
              },
            }
            const newEnd: IPieceMark = {
              identity: mark.identity,
              data: mark.data,
              piece: {
                identity: mark.piece.identity,
                start: move.srcPiece.end,
                end: mark.piece.end,
              },
            }

            const newSlice = [newBefore, newEnd]

            newSlice.filter((item) => {
              return Boolean(item.piece.start - item.piece.end)
            })

            arr[index] = newSlice as any
          } else if (isStartInItem && !isEndInItem) {
            const newBefore: IPieceMark = {
              identity: mark.identity,
              data: mark.data,
              piece: {
                identity: mark.piece.identity,
                start: mark.piece.start,
                end: move.srcPiece.start,
              },
            }
            const newEnd: IPieceMark = {
              identity: mark.identity,
              data: mark.data,
              piece: {
                identity: move.aimPiece.identity,
                start:
                  mark.piece.start - move.srcPiece.start + move.aimPiece.start,
                end: mark.piece.end - move.srcPiece.end + move.aimPiece.end,
              },
            }

            const newSlice = [newBefore, newEnd]

            newSlice.filter((item) => {
              return Boolean(item.piece.start - item.piece.end)
            })

            arr[index] = newSlice as any
          }
        }
      })

      this.pieceMark = this.pieceMark.flat()
    })
  }

  dealPieceMark() {
    this.pieceMark.forEach((mark) => {
      const pieceRange = computedPositionFromPiece(mark.piece)
      this.listing.some((item, index) => {
        const isStartInItem = item.isInRange(pieceRange[0].anchor)
        const isEndInItem = item.isInRange(pieceRange[1].anchor)

        if (isStartInItem && isEndInItem) {
          const newSlice = item.splitByTwoPosition(pieceRange[0], pieceRange[1])
          newSlice[1] = newSlice[1].configData(mark.data)
          newSlice.filter((item) => {
            return Boolean(item.length)
          })

          this.listing[index] = newSlice as any

          return true
        } else if (!isStartInItem && isEndInItem) {
          const newSlice = item.splitByPosition(pieceRange[1])
          newSlice[0] = newSlice[0].configData(mark.data)
          newSlice.filter((item) => {
            return Boolean(item.length)
          })

          this.listing[index] = newSlice as any

          return true
        } else if (isStartInItem && !isEndInItem) {
          const newSlice = item.splitByPosition(pieceRange[0])
          newSlice[1] = newSlice[1].configData(mark.data)
          newSlice.filter((item) => {
            return Boolean(item.length)
          })

          this.listing[index] = newSlice as any
          return false
        } else {
          return false
        }
      })
      this.listing = this.listing.flat()
    })
  }

  dealRangeMark() {
    this.rangeMark.forEach((mark) => {
      let isInRange = false
      this.listing.some((item, index) => {
        const isStartItem = item.isInRange(mark.range[0].anchor)
        const isEndItem = item.isInRange(mark.range[1].anchor)

        if (isStartItem && isEndItem) {
          const newSlice = item.splitByTwoPosition(mark.range[0], mark.range[1])
          newSlice[1] = newSlice[1].configData(mark.data)

          newSlice.filter((item) => {
            return Boolean(item.length)
          })

          this.listing[index] = newSlice as any
        } else if (!isStartItem && isEndItem) {
          isInRange = false

          const newSlice = item.splitByPosition(mark.range[1])
          newSlice[0] = newSlice[0].configData(mark.data)
          newSlice.filter((item) => {
            return Boolean(item.length)
          })
          this.listing[index] = newSlice as any
        } else if (isStartItem && !isEndItem) {
          isInRange = true
          const newSlice = item.splitByPosition(mark.range[0])
          newSlice[1] = newSlice[1].configData(mark.data)
          newSlice.filter((item) => {
            return Boolean(item.length)
          })

          this.listing[index] = newSlice as any
        } else if (isInRange) {
          this.listing[index] = item.configData(mark.data)
        } else {
        }

        return false
      })
      this.listing = this.listing.flat()
    })
  }

  textContentView() {
    const content = this.contentView()
      .map((item) => {
        return this.schemaMap.get(item.srcMetaInfo.type)?.toTextContent?.(item)
      })
      .join('')
    return content
  }

  contentView() {
    const content = this.listing.filter((item) => {
      return !item.data.deleted
    })

    return content
  }
}

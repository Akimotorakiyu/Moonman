import { computedPositionFromPiece, identitySortMethod } from './basic'
import { MetaView } from './meta'
import { IPieceMark, IRangeMark, ITextNode } from './textNode'

export class Fragment {
  constructor(
    public content: ITextNode[] = [],
    public pieceMark: IPieceMark[] = [],
    public rangeMark: IRangeMark[] = [],
  ) {
    // sort
    content.sort(identitySortMethod)
    // pieceMark.sort(identitySortMethod)
    // rangeMark.sort(identitySortMethod)

    this.initListing()
    this.dealPieceMark()
    // this.dealRangeMark()
  }

  listing: MetaView[] = []

  initListing() {
    this.content.forEach((textNode, index) => {
      if (index > 0) {
        const beforeIndex = this.listing.findIndex((item) => {
          return item.isInRange(textNode.position)
        })

        const before = this.listing[beforeIndex]

        const part = before.splitByPosition(textNode.position)

        const newSlice = [
          part[0],
          new MetaView(0, textNode.content.length, {}, textNode),
          part[1],
        ]

        newSlice.filter((item) => {
          return Boolean(item.content)
        })

        this.listing.splice(beforeIndex, 1, ...newSlice)
      } else {
        this.listing.push(
          new MetaView(0, textNode.content.length, {}, textNode),
        )
      }
    })
  }

  dealPieceMark() {
    this.pieceMark.forEach((mark) => {
      const pieceRange = computedPositionFromPiece(mark.piece)
      this.listing.some((item, index) => {
        const startInItem = item.isInRange(pieceRange[0])
        const endInItem = item.isInRange(pieceRange[1])

        if (startInItem && endInItem) {
          const newSlice = item.splitByTwoPosition(pieceRange[0], pieceRange[1])
          newSlice[1] = newSlice[1].configData(mark.data)
          newSlice.filter((item) => {
            return Boolean(item.content)
          })

          this.listing[index] = newSlice as any

          return true
        } else if (!startInItem && endInItem) {
          const newSlice = item.splitByPosition(pieceRange[1])
          newSlice[0] = newSlice[0].configData(mark.data)
          newSlice.filter((item) => {
            return Boolean(item.content)
          })

          this.listing[index] = newSlice as any

          return true
        } else if (startInItem && !endInItem) {
          const newSlice = item.splitByPosition(pieceRange[0])
          newSlice[1] = newSlice[1].configData(mark.data)
          newSlice.filter((item) => {
            return Boolean(item.content)
          })

          this.listing[index] = newSlice as any

          newSlice.filter((item) => {
            return Boolean(item.content)
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
        const isStartItem =
          item.id === mark.range[0].id &&
          item.start <= mark.range[0].index &&
          mark.range[0].index < item.start + item.content.length

        const isEndItem =
          item.id === mark.range[1].id &&
          item.start <= mark.range[1].index &&
          mark.range[1].index < item.start + item.content.length

        if (isStartItem && isEndItem) {
          const pos1 = mark.range[0].index - item.start
          const pos2 = mark.range[1].index - item.start
          const newBefore = {
            ...item,
            start: item.start,
            content: item.content.slice(0, pos1),
          }
          const newMiddle = {
            ...item,
            start: pos1,
            content: item.content.slice(pos1, pos2),
            data: mark.data,
          }
          const newAfter = {
            ...item,
            start: pos2,
            content: item.content.slice(pos2),
          }

          const newSlice = [newBefore, newMiddle, newAfter]

          newSlice.filter((item) => {
            return Boolean(item.content)
          })

          this.listing[index] = newSlice as any
        } else if (!isStartItem && isEndItem) {
          isInRange = false
          const pos1 = mark.range[0].index - item.start
          const pos2 = mark.range[1].index - item.start
          const newBefore = {
            ...item,
            start: item.start,
            content: item.content.slice(0, pos2),
            data: {
              ...item.data,
              ...mark.data,
            },
          }

          const newAfter = {
            ...item,
            start: pos2,
            content: item.content.slice(pos2),
          }

          const newSlice = [newBefore, newAfter]

          newSlice.filter((item) => {
            return Boolean(item.content)
          })

          this.listing[index] = newSlice as any
        } else if (isStartItem && !isEndItem) {
          isInRange = true
          const pos1 = mark.range[0].index - item.start
          const pos2 = mark.range[1].index - item.start
          const newBefore = {
            ...item,
            start: item.start,
            content: item.content.slice(0, pos1),
          }

          const newAfter = {
            ...item,
            start: pos1,
            content: item.content.slice(pos1),
            data: {
              ...item.data,
              ...mark.data,
            },
          }

          const newSlice = [newBefore, newAfter]

          newSlice.filter((item) => {
            return Boolean(item.content)
          })

          this.listing[index] = newSlice as any
        } else if (isInRange) {
          item.data = {
            ...item.data,
            ...mark.data,
          }
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
        return item.content
      })
      .join('')
    return content
  }

  contentView() {
    const content = this.listing.filter((item) => {
      return !item.data.deleted
    })

    console.log('contentView', this.listing, content)

    return content
  }
}

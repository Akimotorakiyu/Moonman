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
    pieceMark.sort(identitySortMethod)
    rangeMark.sort(identitySortMethod)

    this.initListing()
    this.dealPieceMark()
    this.dealRangeMark()
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
        const isStartInItem = item.isInRange(pieceRange[0])
        const isEndInItem = item.isInRange(pieceRange[1])

        if (isStartInItem && isEndInItem) {
          const newSlice = item.splitByTwoPosition(pieceRange[0], pieceRange[1])
          newSlice[1] = newSlice[1].configData(mark.data)
          newSlice.filter((item) => {
            return Boolean(item.content)
          })

          this.listing[index] = newSlice as any

          return true
        } else if (!isStartInItem && isEndInItem) {
          const newSlice = item.splitByPosition(pieceRange[1])
          newSlice[0] = newSlice[0].configData(mark.data)
          newSlice.filter((item) => {
            return Boolean(item.content)
          })

          this.listing[index] = newSlice as any

          return true
        } else if (isStartInItem && !isEndInItem) {
          const newSlice = item.splitByPosition(pieceRange[0])
          newSlice[1] = newSlice[1].configData(mark.data)
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
        const isStartItem = item.isInRange(mark.range[0])
        const isEndItem = item.isInRange(mark.range[1])

        if (isStartItem && isEndItem) {
          const newSlice = item.splitByTwoPosition(mark.range[0], mark.range[1])
          newSlice[1] = newSlice[1].configData(mark.data)

          newSlice.filter((item) => {
            return Boolean(item.content)
          })

          this.listing[index] = newSlice as any
        } else if (!isStartItem && isEndItem) {
          isInRange = false

          const newSlice = item.splitByPosition(mark.range[1])
          newSlice[0] = newSlice[0].configData(mark.data)
          newSlice.filter((item) => {
            return Boolean(item.content)
          })
          this.listing[index] = newSlice as any
        } else if (isStartItem && !isEndItem) {
          isInRange = true
          const newSlice = item.splitByPosition(mark.range[0])
          newSlice[1] = newSlice[1].configData(mark.data)
          newSlice.filter((item) => {
            return Boolean(item.content)
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

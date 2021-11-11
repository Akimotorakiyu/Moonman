import { IMetaView, MetaView } from './meta'
import { IPieceMark, IRangeMark, ITextNode } from './textNode'

export class Fragment {
  constructor(
    public content: ITextNode[] = [],
    public pieceMark: IPieceMark[] = [],
    public rangeMark: IRangeMark[] = [],
  ) {
    // sort
    content.sort((a, b) => {
      return a.timestamp - b.timestamp || a.id - b.id
    })
    pieceMark.sort((a, b) => {
      return a.timestamp - b.timestamp || a.id - b.id
    })
    rangeMark.sort((a, b) => {
      return a.timestamp - b.timestamp || a.id - b.id
    })

    this.initListing()
    this.dealPieceMark()
    this.dealRangeMark()
  }

  listing: MetaView[] = []

  initListing() {
    this.content.forEach((textNode, index) => {
      if (index > 0) {
        const beforeIndex = this.listing.findIndex((item) => {
          return item.isInRange({
            timestamp: item.timestamp,
            id: textNode.beforeId,
            index: textNode.indexInBefore,
            relativePos: 'after',
          })
        })

        const before = this.listing[beforeIndex]

        const part = before.splitByPosition({
          timestamp: before.timestamp,
          id: before.id,
          index: textNode.indexInBefore,
          relativePos: 'after',
        })

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
      this.listing.some((item, index) => {
        if (item.id === mark.aimId) {
          const startInItem =
            item.start <= mark.range[0] &&
            mark.range[0] < item.start + item.content.length
          const endInItem =
            item.start <= mark.range[1] &&
            mark.range[1] < item.start + item.content.length

          const hasIntersection = startInItem || endInItem

          if (startInItem && endInItem) {
            const pos1 = mark.range[0] - item.start
            const pos2 = mark.range[1] - item.start
            const newBefore = {
              ...item,
              start: item.start,
              content: item.content.slice(0, pos1),
            }
            const newMiddle = {
              ...item,
              start: pos1,
              content: item.content.slice(pos1, pos2),
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

            const newSlice = [newBefore, newMiddle, newAfter]

            newSlice.filter((item) => {
              return Boolean(item.content)
            })

            this.listing[index] = newSlice as any
          } else if (!startInItem && endInItem) {
            const pos1 = mark.range[0] - item.start
            const pos2 = mark.range[1] - item.start
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
          } else if (startInItem && !endInItem) {
            const pos1 = mark.range[0] - item.start
            const pos2 = mark.range[1] - item.start
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
          }
        } else {
        }
        return false
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

    return content
  }
}

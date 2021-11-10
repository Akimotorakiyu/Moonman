import { IMetaView } from './meta'
import { IPieceMark, IRangeMark, ITextNode } from './textNode'

export class Fragmant {
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

  listing: IMetaView[] = []

  initListing() {
    this.content.forEach((textNode, index) => {
      if (index > 0) {
        const beforeIndex = this.listing.findIndex((item) => {
          const isBeforeSlice = item.id === textNode.beforeId
          if (isBeforeSlice) {
            const isInRange =
              item.start <= textNode.indexInBerfore &&
              textNode.indexInBerfore < item.start + item.content.length

            if (isInRange) {
              return true
            } else {
              return false
            }
          } else {
            return false
          }
        })

        const before = this.listing[beforeIndex]

        const newBefore = {
          ...before,
          start: before.start,
          content: before.content.slice(
            0,
            textNode.indexInBerfore + 1 - before.start,
          ),
        }
        const newAfter = {
          ...before,
          content: before.content.slice(
            textNode.indexInBerfore + 1 - before.start,
          ),
          start: before.start + textNode.indexInBerfore + 1,
        }

        const middle: IMetaView = {
          id: textNode.id,
          start: 0,
          content: textNode.content,
          timestamp: textNode.timestamp,
          data: {},
        }

        const newSlice = [newBefore, middle, newAfter]

        newSlice.filter((item) => {
          return Boolean(item.content)
        })

        this.listing.splice(beforeIndex, 1, ...newSlice)
      } else {
        this.listing.push(<IMetaView>{
          id: textNode.id,
          start: 0,
          content: textNode.content,
          timestamp: textNode.timestamp,
          data: {},
        })
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

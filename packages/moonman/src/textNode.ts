export class BasicNode {}

export class TextNode extends BasicNode {
  constructor(
    public content: string,
    public timestamp: number,
    public id: number,
    public beforeId: number,
    public indexInBerfore: number,
  ) {
    super()
  }
}

export class MarkNode<T = any> {
  constructor(
    public data: T,
    public timestamp: number,
    public id: number,
    public startId: number,
    public endId: number,
  ) {}
}

export class DeleteMark {
  constructor(
    public timestamp: number,
    public id: number,
    public deleteId: number,

    public range: [number, number],
  ) {}
}

export class Fragmant {
  constructor(public content: TextNode[], public deleteMark: DeleteMark[]) {
    // sort
    content.sort((a, b) => {
      return a.timestamp - b.timestamp || a.id - b.id
    })

    this.initMapping()
    this.initListing()
    this.dealDeleteMark()
  }

  mapping = new Map<number, Map<number, string>>()

  initMapping() {
    this.content.forEach((textNode) => {
      //   let initPos = 0
      //   const brofrePosContentMap = this.mapping.get(textNode.beforeId)
      //   if (brofrePosContentMap) {
      //   }
      //   const posContentMap = new Map<number, string>()
      //   this.mapping.set(textNode.id, posContentMap)
    })
    console.log(this.mapping)
  }

  listing: {
    id: number
    start: number
    content: string
    timestamp: number
    deleted: boolean
  }[] = []

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

        const middle = {
          id: textNode.id,
          start: 0,
          content: textNode.content,
          timestamp: textNode.timestamp,
          deleted: false,
        }

        const newSlice = [newBefore, middle, newAfter]

        newSlice.filter((item) => {
          return Boolean(item.content)
        })

        this.listing.splice(beforeIndex, 1, ...newSlice)
      } else {
        this.listing.push({
          id: textNode.id,
          start: 0,
          content: textNode.content,
          timestamp: textNode.timestamp,
          deleted: false,
        })
      }
    })
  }

  dealDeleteMark() {
    this.deleteMark.forEach((mark) => {
      this.listing.some((item, index) => {
        if (item.id === mark.deleteId) {
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
              deleted: true,
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
              deleted: true,
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
              deleted: true,
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

  dealMark() {}

  view() {
    const content = this.listing
      .filter((item) => {
        return !item.deleted
      })
      .map((item) => {
        return item.content
      })
      .join('')
    return content
  }

  map(pos: number) {
    return this.content[0]
  }
}

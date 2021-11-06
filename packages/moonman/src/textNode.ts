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

export class Fragmant {
  constructor(public content: TextNode[]) {
    // sort
    content.sort((a, b) => {
      return a.timestamp - b.timestamp || a.id - b.id
    })

    this.initMapping()
    this.initListing()
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

  listing: { id: number; start: number; content: string; timestamp: number }[] =
    []

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
          content: before.content.slice(0, textNode.indexInBerfore + 1),
          start: before.start,
        }
        const newAfter = {
          ...before,
          content: before.content.slice(textNode.indexInBerfore + 1),
          start: before.start + textNode.indexInBerfore + 1,
        }

        const middle = {
          id: textNode.id,
          start: 0,
          content: textNode.content,
          timestamp: textNode.timestamp,
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
        })
      }
    })
    console.log(this.listing)
  }

  view() {
    const content = this.listing
      .map((item) => {
        return item.content
      })
      .join('')
    return content
  }

  add(textNode: TextNode) {
    const content = this.content.concat(textNode)

    return new Fragmant(content)
  }

  map(pos: number) {
    return this.content[0]
  }
}

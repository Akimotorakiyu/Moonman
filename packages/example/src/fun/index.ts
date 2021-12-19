import {
  createDocument,
  TitleSpace,
  TextSpace,
  BlockSpace,
} from '@moonman/moonman'
console.log('hello')
let docBlockSpace = createDocument()
let titleBlockSpace = new TitleSpace()
let hello = new TextSpace(undefined, undefined, 'hello')
let world = new TextSpace(undefined, undefined, 'world')

titleBlockSpace = titleBlockSpace
  .appendChild(hello, {
    anchor: {
      coordinate: [titleBlockSpace.identity],
      index: 0,
    },
    relation: {
      isInner: true,
      isForward: true,
    },
  })
  .appendChild(world, {
    anchor: {
      coordinate: [hello.identity],
      index: 2,
    },
    relation: {
      isInner: false,
      isForward: true,
    },
  })

docBlockSpace = docBlockSpace
  .appendChild(titleBlockSpace, {
    anchor: {
      coordinate: [docBlockSpace.identity],
      index: 0,
    },
    relation: {
      isInner: true,
      isForward: true,
    },
  })
  .addPropsMark({
    color: 'blue',
    fontSize: '12px',
  })
  .addPropsMark({
    color: 'red',
  })
  .addPropsMark({
    color: 'yellow',
    fontSize: '12px',
  })

// console.log(`docBlockSpace`, docBlockSpace)
console.log(`titleBlockSpace`, titleBlockSpace)
console.log(`dataRepo`, BlockSpace.dataRepo)
console.log(`childrenView`, titleBlockSpace.childrenView)
console.log(`docBlockSpace`, docBlockSpace.getComputedProps)

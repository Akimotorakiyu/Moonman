import {
  TitleSpace,
  TextSpace,
  BlockSpace,
  DocumentSpace,
} from '@moonman/moonman'
console.log('hello')

let myDoc = new DocumentSpace()
let docTitle = new TitleSpace()
let hello = new TextSpace(undefined, undefined, 'hello  --Qiuye')
let world = new TextSpace(undefined, undefined, 'world')

docTitle = docTitle
  .appendChild(hello, {
    anchor: {
      coordinate: [docTitle.identity],
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
      index: 6,
    },
    relation: {
      isInner: false,
      isForward: true,
    },
  })

myDoc = myDoc
  .appendChild(docTitle, {
    anchor: {
      coordinate: [myDoc.identity],
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
    lastModify: 'zanlei',
    author: 'zanlei',
  })
  .addPropsMark({
    color: 'red',
  })
  .addPropsMark({
    color: 'yellow',
    fontSize: '14px',
    lastModify: 'yubiyun',
  })
  .addPropsMark({
    color: 'red',
  })

// console.log(`docBlockSpace`, docBlockSpace)
console.log(`titleBlockSpace`, docTitle)
console.log(`dataRepo`, BlockSpace.dataRepo)
console.log(`childrenView`, docTitle.childrenView)
console.log(`docBlockSpace`, myDoc.getComputedProps)

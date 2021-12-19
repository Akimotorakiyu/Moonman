import {
  PieceTitleData,
  PieceTextData,
  PieceData,
  PieceDocumentData,
} from '@moonman/moonman'
console.log('hello')

let myDoc = new PieceDocumentData()
let docTitle = new PieceTitleData()
let hello = new PieceTextData('hello  --Qiuye')
let world = new PieceTextData('world')

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
console.log(`dataRepo`, PieceData.dataRepo)
console.log(`childrenView`, docTitle.childrenView)
console.log(`docBlockSpace`, myDoc, myDoc.childrenView)
console.log(`docBlockSpace`, myDoc.getComputedProps)

import { createDocument, TitleSpace, TextSpace } from '@moonman/moonman'
console.log('hello')
let docBlockSpace = createDocument()
let titleBlockSpace = new TitleSpace()
let textBlockSpace = new TextSpace(undefined, undefined, 'hello')
let textBlockSpace2 = new TextSpace(undefined, undefined, 'world')

titleBlockSpace.appendChild(textBlockSpace, {
  anchor: {
    coordinate: [titleBlockSpace.identity],
    index: 0,
  },
  relation: {
    isInner: true,
    isForward: true,
  },
})

titleBlockSpace = titleBlockSpace.appendChild(textBlockSpace2, {
  anchor: {
    coordinate: [textBlockSpace.identity],
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

console.log(
  'getComputedProps',
  docBlockSpace,
  docBlockSpace.getComputedProps,
  docBlockSpace.viewSpace,
  TitleSpace.dataRepo,
)

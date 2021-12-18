import { createDocument, TitleSpace } from '@moonman/moonman'
console.log('hello')
let docBlockSpace = createDocument()
let titleBlockSpace = new TitleSpace()
docBlockSpace = docBlockSpace.addPropsMark({
  color: 'blue',
  fontSize: '12px',
})

docBlockSpace = docBlockSpace.addPropsMark({
  color: 'red',
})

docBlockSpace = docBlockSpace.addPropsMark({
  color: 'yellow',
  fontSize: '12px',
})

console.log('getComputedProps', docBlockSpace, docBlockSpace.getComputedProps)

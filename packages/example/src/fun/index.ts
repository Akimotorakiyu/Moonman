import { createDocument } from '@moonman/moonman'

let docBlockSpace = createDocument()
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
console.log('getComputedProps', docBlockSpace.getComputedProps)

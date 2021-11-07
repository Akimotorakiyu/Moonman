import { TextNode, Fragmant, DeleteMark, MarkNode } from '@moonman/moonman'

// start
const text1 = new TextNode('123', 1, 100, 0, 0)

const text2 = new TextNode('456', 2, 101, 100, 0)

const text3 = new TextNode('789', 3, 102, 100, 0)

const text4 = new TextNode('0ab', 4, 103, 101, 1)

const text5 = new TextNode('def', 5, 103, 102, 1)

const delete1 = new DeleteMark(6, 200, 101, [1, 2])

const colorMark1 = new MarkNode(
  7,
  300,
  [
    { id: 102, index: 0 },
    { id: 102, index: 2 },
  ],
  {
    color: 'red',
    fontSize: 'bold',
  },
)
const colorMark2 = new MarkNode(
  7,
  300,
  [
    { id: 102, index: 1 },
    { id: 100, index: 1 },
  ],
  { color: 'blue', fontStyle: 'italic' },
)

const f = new Fragmant(
  [text1, text2, text3, text4, text5],
  [delete1],
  [colorMark1, colorMark2],
)
const res = f.viewTextContent()
const resWithColor = f.viewContent()

console.log(res, '178def940ab623', res == '178def940ab623')
console.log(resWithColor)

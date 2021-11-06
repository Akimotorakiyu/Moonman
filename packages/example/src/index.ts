import { TextNode, Fragmant } from '@moonman/moonman'

// start
const text1 = new TextNode('12', 1, 100, 0, 0)

// client 0
const text2 = new TextNode('34', 2, 101, 100, 0)
const text4 = new TextNode('78', 4, 103, 101, 1)

// client 1
const text3 = new TextNode('56', 3, 102, 100, 1)
const text5 = new TextNode('90', 5, 103, 102, 0)

const f = new Fragmant([text1, text2, text3, text4, text5])
const res = f.view()

console.log(res, '1590637842', res == '1590637842')

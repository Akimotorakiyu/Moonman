import { Fragment, createPieceMark, createRangeMark } from '@moonman/moonman'

import { textOT } from './basicAddOTData'

const delete1 = createPieceMark({
  timestamp: 6,
  id: 200,
  aimId: 101,
  range: [1, 2],
  data: {
    deleted: true,
  },
})
const colorMark1 = createRangeMark({
  timestamp: 7,
  id: 300,
  range: [
    { id: 102, index: 0 },
    { id: 102, index: 2 },
  ],
  data: {
    color: 'red',
    fontSize: 'larger',
  },
})
const colorMark2 = createRangeMark({
  timestamp: 7,
  id: 300,
  range: [
    { id: 102, index: 1 },
    { id: 100, index: 1 },
  ],
  data: { color: 'blue', fontStyle: 'italic' },
})

const f = new Fragment(textOT, [delete1], [colorMark1, colorMark2])

const res = f.textContentView()
const resWithColor = f.contentView()

console.log(res, '178def940ab623', res == '178def940ab623')
console.log(resWithColor)

import { defineFunctionComponent } from './defineFunctionComponent'

export const MarkRender = defineFunctionComponent(() => {
  return {
    render() {
      return (
        <div>
          {resWithColor.map((item) => {
            return <span style={item.data}>{item.content}</span>
          })}
        </div>
      )
    },
  }
})

import { Fragment } from '@moonman/moonman'

import {
  textOT,
  delete1,
  colorMark7To9,
  colorMark7To2,
  schemaMap,
} from './basicOTData'

const f = new Fragment(
  schemaMap,
  textOT,
  [delete1],
  [colorMark7To9, colorMark7To2],
)

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
            return (
              <span style={item.data}>
                {schemaMap.get(item.srcMetaInfo.type)?.toTextContent?.(item)}
              </span>
            )
          })}
        </div>
      )
    },
  }
})

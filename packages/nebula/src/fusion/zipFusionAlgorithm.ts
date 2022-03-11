export function zipFusion<T>(
  side1: T[],
  side2: T[],
  compare: (value1: T, value2: T) => number,
): T[] {
  let side1CurrentIndex = 0
  let side2CurrentIndex = 0

  const newArray = []

  while (side1CurrentIndex < side1.length && side2CurrentIndex < side2.length) {
    const side1Value = side1[side1CurrentIndex]
    const side2Value = side2[side2CurrentIndex]

    if (compare(side1Value, side2Value) > 0) {
      newArray.push(side1Value)
      side1CurrentIndex++
    } else if (compare(side1Value, side2Value) < 0) {
      newArray.push(side2Value)
      side2CurrentIndex++
    } else {
      newArray.push(side1Value)
      side1CurrentIndex++
      side2CurrentIndex++
    }
  }

  newArray.push(
    ...side1.slice(side1CurrentIndex),
    ...side2.slice(side2CurrentIndex),
  )

  return newArray
}

// 因为新的操作更多场景出现，所以反向操作在 side2 数量少的时候会需要更少次数的对比
export function zipFusionR<T>(
  side1: T[],
  side2: T[],
  compare: (value1: T, value2: T) => number,
): T[] {
  let side1CurrentIndex = side1.length - 1
  let side2CurrentIndex = side2.length - 1

  const newArray = []

  while (side1CurrentIndex > -1 && side2CurrentIndex > -1) {
    const side1Value = side1[side1CurrentIndex]
    const side2Value = side2[side2CurrentIndex]

    if (compare(side1Value, side2Value) > 0) {
      newArray.push(side2Value)
      side2CurrentIndex--
    } else if (compare(side1Value, side2Value) < 0) {
      newArray.push(side1Value)
      side1CurrentIndex--
    } else {
      newArray.push(side1Value)
      side1CurrentIndex--
      side2CurrentIndex--
    }
  }

  newArray.push(
    ...side1.slice(side1CurrentIndex).reverse(),
    ...side2.slice(side2CurrentIndex).reverse(),
  )

  newArray.reverse()

  return newArray
}

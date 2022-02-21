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

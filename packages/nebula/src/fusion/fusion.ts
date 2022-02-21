import { TOperationTransform } from '@moonman/blueprint'
import { zipFusion } from './zipFusionAlgorithm'

// todo: 使用二分查找 插入法，对有大量操作，加入少量插入的情况进行优化
export function fusionTOperationTransform(
  opList1: TOperationTransform[],
  opList2: TOperationTransform[],
) {
  return zipFusion(opList1, opList2, (value1, value2) => {
    return value2.timestamp - value1.timestamp || value2.id - value1.id
  })
}

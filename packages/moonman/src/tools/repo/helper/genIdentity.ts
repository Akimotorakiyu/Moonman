import type { IIdentity } from '../../../operation/index'

// 生产环境中应使用随机数
let id = 0

// 生成 id
export function genIdentity(): IIdentity {
  return {
    id: id++,
    timestamp: Date.now() + id,
  }
}

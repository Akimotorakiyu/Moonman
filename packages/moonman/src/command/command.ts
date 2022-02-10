import { ITransaction } from '@moonman/core'
import { doTransation } from './dispatchTransation'
import { commandRing } from './ring'
import { TMiddleWare } from './ring'

type TCommand = TMiddleWare<[ITransaction], boolean>

export function defineCommand<Args extends unknown[]>(
  command: (...args: Args) => TCommand,
) {
  return command
}

export function runCommandsWithTransation(commandList: TCommand[]) {
  const result = doTransation((tr) => {
    return commandRing.ring(commandList, [tr])
  })

  console.log('deal result', result)
  return result
}

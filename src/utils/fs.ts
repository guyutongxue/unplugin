import type { UnpluginContextFs } from '../types'
import fs from 'node:fs'
import { promisify } from 'node:util'

interface FsLike {
  readFile?: ((...args: any[]) => any) | undefined
  stat?: ((...args: any[]) => any) | undefined
  lstat?: ((...args: any[]) => any) | undefined
}

export function createBuildContextFs(inputFs?: FsLike): UnpluginContextFs {
  const fsLike = inputFs ?? fs
  const readFile = (typeof fsLike.readFile === 'function'
    ? promisify(fsLike.readFile.bind(fsLike))
    : fs.promises.readFile) as UnpluginContextFs['readFile']
  const stat = (typeof fsLike.stat === 'function'
    ? promisify(fsLike.stat.bind(fsLike))
    : fs.promises.stat) as UnpluginContextFs['stat']
  const lstat = (typeof fsLike.lstat === 'function'
    ? promisify(fsLike.lstat.bind(fsLike))
    : fs.promises.lstat) as UnpluginContextFs['lstat']

  return {
    readFile,
    stat,
    lstat,
  }
}

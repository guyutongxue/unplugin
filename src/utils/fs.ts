import type { UnpluginContextFs } from '../types'
import fs from 'node:fs'
import { promisify } from 'node:util'

type FsLike = {
  readFile?: ((...args: any[]) => any) | undefined
  stat?: ((...args: any[]) => any) | undefined
  lstat?: ((...args: any[]) => any) | undefined
}

export function createBuildContextFs(inputFs?: FsLike): UnpluginContextFs {
  const fsLike = inputFs ?? fs

  return {
    readFile: inputFs?.readFile
      ? promisify(fsLike.readFile.bind(fsLike))
      : fs.promises.readFile.bind(fs.promises),
    stat: inputFs?.stat
      ? promisify(fsLike.stat.bind(fsLike))
      : fs.promises.stat.bind(fs.promises),
    lstat: inputFs?.lstat
      ? promisify(fsLike.lstat.bind(fsLike))
      : fs.promises.lstat.bind(fs.promises),
  }
}

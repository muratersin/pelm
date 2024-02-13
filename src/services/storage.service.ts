import logger from '@/helpers/logger'

interface StorageObject {
  sortType: SortType
  sortBy: SortBy
}

const INITIAL_DATA: StorageObject = {
  sortType: 'next',
  sortBy: 'createdAt'
}
const keyListenerMap: any = {}
const storageName = 'pelm'
const storage = window.localStorage
const data = (() => {
  const storageData = storage.getItem(storageName)

  if (storageData) {
    return JSON.parse(storageData)
  }

  return INITIAL_DATA
})()

export const getItem = (key: string): any => {
  return data[key]
}

export const setItem = (key: string, value: any): void => {
  data[key] = value
  flush(key)
}

export const removeItem = (key: string): void => {
  delete data[key]
  flush(key)
}

const flush = (key: string) => {
  try {
    storage.setItem(storageName, JSON.stringify(data))

    const listeners = keyListenerMap[key]
    listeners?.forEach((fn: () => void) => {
      fn()
    })
  } catch (err) {
    logger.error("Couln't persist storage data.")
  }
}

export const listen = (key: string, cb: (v: any) => void) => {
  if (cb && typeof cb === 'function') {
    keyListenerMap[key] = keyListenerMap[key] || []
    keyListenerMap[key].push(cb)
  }
}

import logger from '@/helpers/logger'

export class DBService {
  public db?: IDBDatabase
  private static _instance: DBService

  private constructor() {}

  public static get instance() {
    if (!DBService._instance) {
      DBService._instance = new DBService()
    }

    return DBService._instance
  }

  public init() {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) {
        throw new Error("This browser doesn't support IndexedDB")
      }

      const request = indexedDB.open('PelmDB', 22)

      request.onerror = () => {
        reject("Why didn't you allow my web app to use IndexedDB?!")
      }

      request.onsuccess = () => {
        this.db = request.result
        logger.info('DB service successfully created.', this.db)
        resolve(true)
      }

      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains('books')) {
          const objectStore = db.createObjectStore('books', { keyPath: 'id', autoIncrement: true })
          objectStore.createIndex('isbn', 'isbn', { unique: false })
          objectStore.createIndex('title', 'title', { unique: false })
        }
      }
    })
  }
}

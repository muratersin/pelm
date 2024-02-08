import logger from '@/helpers/logger'

export class DBService {
  private db?: IDBDatabase
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
      const request = indexedDB.open('PelmDB')

      request.onerror = () => {
        reject("Why didn't you allow my web app to use IndexedDB?!")
      }

      request.onsuccess = () => {
        this.db = request.result
        logger.info('DB service successfully created.', this.db)
        resolve(true)
      }

      request.onupgradeneeded = function () {
        const db = request.result
        if (!db.objectStoreNames.contains('books')) {
          db.createObjectStore('books', { keyPath: 'id', autoIncrement: true })
        }
      }
    })
  }
}

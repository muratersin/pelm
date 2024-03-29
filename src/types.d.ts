type BookListItem = {
  id: id
  title: string
  authors: string
  coverUrl: string
  createdAt: number
}

type Book = {
  id?: number
  title?: string
  authors?: string
  categories?: string[]
  publishDate?: string
  createdAt?: number
  publisher?: string
  pageSize?: number
  isbn?: string
  summary?: string
  coverUrl?: string
  note?: string
}

type NavItem = {
  icon: Component
  to: string
  title?: string
  isCurrent?: boolean
}

type ParsedArray = Array<string[]>

type BookDataHeader = {
  displayedName: string
  name: string
  required?: boolean
}

type GoogleApiHttpResponse<T> = {
  items: T[]
  kind: string
  totalItems: number
}

type GoogleApiBookRequestResponse = GoogleApiHttpResponse<GoogleApiBook>

type GoogleApiBook = {
  kind: string
  id: string
  etag: string
  selfLink: string
  volumeInfo: {
    title: string
    authors: string[]
    publishedDate: string
    description: string
    imageLinks: {
      smallThumbnail: string
      thumbnail: string
    }
    industryIdentifiers: {
      type: string
      identifier: string
    }[]
    readingModes: {
      text: boolean
      image: boolean
    }
    pageCount: number
    printType: string
    categories: string[]
    maturityRating: string
    allowAnonLogging: boolean
    contentVersion: string
    language: string
    previewLink: string
    infoLink: string
    canonicalVolumeLink: string
  }
  saleInfo: {
    country: string
    saleability: string
    isEbook: boolean
  }
  accessInfo: {
    country: string
    viewability: string
    embeddable: boolean
    publicDomain: boolean
    textToSpeechPermission: string
    epub: {
      isAvailable: boolean
    }
    pdf: {
      isAvailable: boolean
    }
    webReaderLink: string
    accessViewStatus: string
    quoteSharingAllowed: boolean
  }
  searchInfo: {
    textSnippet: string
  }
}

type SortBy = 'authors' | 'title' | 'createdAt'

type SortType = 'prev' | 'next'

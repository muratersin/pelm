export const BOOK_DB_FIELD_NAMES = [
  'title',
  'authors',
  'categories',
  'publishDate',
  'createdAt',
  'publisher',
  'pages',
  'isbn',
  'summary',
  'coverUrl'
]

export const BOOK_DATA_HEADERS: BookDataHeader[] = [
  { displayedName: 'Title', name: 'title', required: true },
  { displayedName: 'Authors', name: 'authors', required: true },
  { displayedName: 'Categories', name: 'categories' },
  { displayedName: 'Created At', name: 'createdAt' },
  { displayedName: 'Publisher', name: 'publisher' },
  { displayedName: 'Page Size', name: 'pageSize' },
  { displayedName: 'ISBN', name: 'isbn' },
  { displayedName: 'Summary', name: 'summary' },
  { displayedName: 'Cover URL', name: 'coverUrl' }
]

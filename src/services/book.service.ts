export const fetchBooks = async (query: {
  title?: string
  isbn?: string
}): Promise<GoogleApiBookRequestResponse> => {
  const { isbn, title } = query

  if (!isbn && !title) {
    throw new Error('Please provide ISBN or title')
  }

  const apiUrl = `https://www.googleapis.com/books/v1/volumes?key=AIzaSyCDf7i0KYdVF58MMrzPHF7zE6IOLc9Umaw&q=${isbn ? `isbn:${isbn}` : `intitle:${title}`}`

  const response = await fetch(apiUrl)
  const result = await response.json()

  return result
}

export const addBook = (book: Book) => {}

export const deleteBook = (id: number) => {}

export const updateBook = (book: book) => {}

export const getBooks = () => {}

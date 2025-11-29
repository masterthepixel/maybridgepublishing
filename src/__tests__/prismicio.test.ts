import { getAllBooks } from '../prismicio'

describe('getAllBooks', () => {
  it('should fetch all books from Prismic', async () => {
    // Mock the Prismic client
    const mockBooks = [
      {
        id: 'book1',
        uid: 'cooking-with-mama',
        data: {
          title: 'Cooking with Mama',
          author: 'Akosua',
          category: 'primary'
        }
      }
    ]

    // Mock the client.getAllByType method
    const mockClient = {
      getAllByType: jest.fn().mockResolvedValue(mockBooks)
    }

    // Mock createClient to return the mock client
    jest.mock('../prismicio', () => ({
      createClient: jest.fn(() => mockClient)
    }))

    const books = await getAllBooks()

    expect(mockClient.getAllByType).toHaveBeenCalledWith('book', {
      orderings: ['my.book.title']
    })
    expect(books).toEqual(mockBooks)
  })
})
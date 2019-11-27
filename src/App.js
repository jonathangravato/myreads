import React from 'react';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
      books: null,
      sortedBooks: [
        {
          shelfReading: {
            title: '',
            books: null
          },
          shelfWantRead: {
            title: '',
            books: null
          },
          shelfRead: {
            title: '',
            books: null
          }
        }
      ]
    }
    
    this.sortBooks = this.sortBooks.bind(this)
    this.toggleSearchPage = this.toggleSearchPage.bind(this)
  }

  toggleSearchPage() {
    this.setState({ showSearchPage: false })
  }

  sortBooks(books) {

    const shelfReading = []
    const shelfWantRead = []
    const shelfRead = []

    books.map((book) => {
      book.shelf === 'currentlyReading' && shelfReading.push(book)
      book.shelf === 'wantToRead' && shelfWantRead.push(book)
      book.shelf === 'read' && shelfRead.push(book)
      return books
    })

    this.setState(() => ({
      sortedBooks: {
        shelfReading: {
          title: 'Currently Reading',
          books: shelfReading
        },
        shelfWantRead: {
          title: 'Want to Read',
          books: shelfWantRead
        },
        shelfRead: {
          title: 'Read',
          books: shelfRead
        }
      }
    }))
  }

  componentDidMount() {
    //getAll from BooksAPI
    BooksAPI.getAll().then((books) => {
      // Sort books into shelves to be passed to list books
      this.sortBooks(books)
      this.setState(() => ({
        books
      }))
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks toggleHandler={this.toggleSearchPage} />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListBooks 
                  books = {this.state.books}
                  shelves = {this.state.sortedBooks}
                />
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;

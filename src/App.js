import React from 'react';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import './App.css';

class App extends React.Component {
  
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    
    booksCollection: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  toggleSearchPage() {
    this.setState({ showSearchPage: false })
  }

  sortBooks = (books) => {
    this.setState({
      booksCollection: books,
      currentlyReading: books.filter( book => (book.shelf === "currentlyReading") ),
      wantToRead: books.filter( book => (book.shelf === "wantToRead") ),
      read: books.filter( book => (book.shelf === "read") )
    })
  }

  componentDidMount() {
    //getAll from BooksAPI
    BooksAPI.getAll().then( books => {
      // Sort books for shelves
      this.sortBooks(books)
    })
  }

  updateBookShelf = (book, shelf) => {
    // TODO: BooksAPI update method
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then(
        books => {
          this.sortBooks(books)
        }
      )
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
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    {this.state.currentlyReading.length > 0 && (
                      <ListBooks books = {this.state.currentlyReading} updateShelf = {this.updateBookShelf} />
                    )}
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    {this.state.wantToRead.length > 0 && (
                      <ListBooks books = {this.state.wantToRead} updateShelf = {this.updateBookShelf} />
                    )}
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    {this.state.read.length > 0 && (
                      <ListBooks books = {this.state.read} updateShelf = {this.updateBookShelf} />
                    )}
                  </div>
                </div>
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

import React from 'react'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import './App.css'

class App extends React.Component {
  
  state = {
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
          <Route exact path='/' render={() => (
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
                <Link to='/search' className='search-button'>
                  Add a book
                </Link>
              </div>
            </div>
          )} />
          <Route path='/search' render={() => (
            <SearchBooks
              onUpdateBookshelf={this.updateBookshelf}
            />
          )} />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react'

class ListBooks extends Component {
    constructor(props) {
      super(props);
      this.state = {
        shelfReading: {
          title: 'Currently Reading',
          books: []
        },
        shelfWantRead: {
          title: 'Want to Read',
          books: []
        },
        shelfRead: {
          title: 'Read',
          books: []
        },
        sortedBooks: []
      }

      //this.handleChange = this.handleChange.bind(this);
      //this.sortBooks = this.sortBooks.bind(this)
    }

    componentDidUpdate() {
        // eslint-disable-next-line array-callback-return
        this.props.books.map((book) => {
          book.shelf === 'currentlyReading' && this.state.shelfReading.books.push(book)
          book.shelf === 'wantToRead' && this.state.shelfWantRead.books.push(book)
          book.shelf === 'read' && this.state.shelfRead.books.push(book)
        })
        
        this.setState((state) => ({
          sortedBooks: [...this.state.shelfReading.books, ...this.state.shelfWantRead.books, ...this.state.shelfRead.books]
        }))
    }
    
    render() {
      return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">Books in List</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
                {this.props.books.map((book) => (
                    <li key={book.title}>
                        <div className="book">
                        <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${book.imageLinks.thumbnail}')` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={this.updateShelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                            </select>
                        </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">
                            {book.authors.map((author) => (
                            author
                            ))}
                        </div>
                        </div> 
                    </li>
                ))}
            </ol>
          </div>
        </div>
      )
    }
  }
  
  export default ListBooks
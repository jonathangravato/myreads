import React, { Component } from 'react'

class ListBooks extends Component {
    constructor(props) {
      super(props);
      this.state = {
        shelfReading: [],
        shelfWantRead: [],
        shelfRead: [],
        sortedBooks: []
      }

      //this.handleChange = this.handleChange.bind(this);
      this.sortBooks = this.sortBooks.bind(this)
    }

    sortBooks(b, s){
        if(s === 'currentlyReading') {
            this.state.shelfReading.push(b)
        }
        if(s === 'wantToRead') {
            this.state.shelfWantRead.push(b)
        }
        if(s === 'read') {
            this.state.shelfRead.push(b)
        }
    }

    componentDidUpdate() {
        //TODO: sort books
        this.props.books.map((book) => {
          return this.sortBooks(book, book.shelf)
        })
        
        this.state.sortedBooks.push(this.state.shelfReading)
        this.state.sortedBooks.push(this.state.shelfWantRead)
        this.state.sortedBooks.push(this.state.shelfRead)

        console.log(this.state.sortedBooks)
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
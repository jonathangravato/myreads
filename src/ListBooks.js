import React, { Component } from 'react'

class ListBooks extends Component {

    eventHandler = (book, event) => {
      event.preventDefault()
      const value = event.target.value
      this.props.updateShelf(book, value)
    }

<<<<<<< HEAD
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
          console.log(this.props.books)
        this.props.books.map((book) => {
          return this.sortBooks(book, book.shelf)
        })
        
        this.state.sortedBooks.push(this.state.shelfReading)
        this.state.sortedBooks.push(this.state.shelfWantRead)
        this.state.sortedBooks.push(this.state.shelfRead)

        //console.log(this.state.sortedBooks)
    }
    
=======
>>>>>>> dev
    render() {
      return (
        <ol className="books-grid">
          {this.props.books.map((book) => (
            <li key={book.id}>
              <div className="book">
              <div className="book-top">
                {
                  //if has book cover
                    book.imageLinks ?
                      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${book.imageLinks.thumbnail}')` }}></div>
                    :
                      <div className="book-cover"></div>
                  //else
                }
                <div className="book-shelf-changer">
                  <select value={book.shelf} onChange={(event) => this.eventHandler(book, event)}>
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
                  {
                    // check for array of authors 
                    Array.isArray(book.authors) ? 
                    book.authors.map((author, i) => (
                    <div key={i} className="book-authors"> {author}</div>
                  )) :
                    false
                  }
              </div>
              </div> 
            </li>
          ))}
        </ol>
      )
    }
  }
  
  export default ListBooks
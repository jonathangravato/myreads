import React, { Component } from 'react'

class ListBooks extends Component {

  //Handle the update bookshelf event
  eventHandler = (book, event) => {
    event.preventDefault()
    const value = event.target.value

    let selectedShelf = ''

    switch(value) {
      case 'currentlyReading':
        selectedShelf = 'Currently Reading'
        break
      case 'wantToRead':
        selectedShelf = 'Want to Read'
        break
      case 'read':
        selectedShelf = 'Read'
        break
      case 'none':
        alert(book.title + ' has been removed from all shelves')
        break
      default:
        console.log(value)
    }

    value !== 'none' && alert(book.title + ' has been added to your ' + selectedShelf + ' shelf.')

    this.props.updateShelf(book, value)
  }

  render() {
    return (
      <ol className="books-grid">
        {this.props.books.map((book) => (
          <li key={book.id}>
            <div className="book">
            <div className="book-top">
              {
                //If has book cover
                  book.imageLinks ?
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${book.imageLinks.thumbnail}')` }}></div>
                  :
                    <div className="book-cover"></div>
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
                  //Check for array of authors 
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
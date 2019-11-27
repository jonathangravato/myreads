import React, { Component } from 'react'

class ListBooks extends Component {
    render() {
      if(this.props.books){
        return (
          <div>
              {Object.keys(this.props.shelves).map((shelf) =>  (
                <div className="bookshelf" key={shelf.title}>
                  <h2 className="bookshelf-title">{shelf.title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                        {/* {this.props.books.map((book) => (
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
                        ))} */}
                    </ol>
                  </div>
                </div>
              ))}
          </div>
        )
      } else {
        return <div><p>Loadding...</p></div>
      }
    }
  }
  
  export default ListBooks
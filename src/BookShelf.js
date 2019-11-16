import React, { Component } from 'react'
import Book from './Book'

class BookShelf extends Component {
  render() {
    //console.log('Props', this.props)

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <Book books={this.props.books} />
        </div>
      </div>
    )
  }
}

export default BookShelf
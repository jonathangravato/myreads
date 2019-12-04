import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      query: '',
      searchResults: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSearchView = this.updateSearchView.bind(this);
  }

  handleChange(event) {
    this.setState({
      query: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    
    BooksAPI.search(this.state.query).then( results => {
      //Update search view with results from searching the API
      this.updateSearchView(results);
    })
  }

  updateSearchView = (res) => {
    this.setState({
      searchResults: res
    })
  }

  render() {

    const { updateShelf, booksCollection } = this.props
    const { searchResults } = this.state

    let verifiedBooks = []

    if (searchResults.length > 0) {
      verifiedBooks = searchResults.map(book => {
        booksCollection.forEach(bookOnShelf => {
          //check for book on shelf
          book.id === bookOnShelf.id ? (
            book.shelf = bookOnShelf
          ) : (
            book.shelf = 'none'
          )
        })
        return book
      })
    }
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search"> 
            Close 
          </Link>
          <div className="search-books-input-wrapper">
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                value={this.state.query}
                placeholder="Search by title or author"
                onChange={this.handleChange}
              />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">            
            <ListBooks books={verifiedBooks} updateShelf={updateShelf} />
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

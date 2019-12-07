import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      query: '',
      searchResults: [],
      booksCollection: this.props.booksCollection
    };

    this.handleChange = this.handleChange.bind(this);
  }

  //Handle change of search input
  handleChange(event) {
    const { bookSearch, results } = this.props
    const { query} = this.state

    this.setState({
      query: event.target.value
    });

    /**
     * Check if search field is populated then run search method in app root.
     * Set state of search results to modify the UI when results are present
     * or if search field is empty.
     */
    if(query.length > 0 ){
       bookSearch(query)
       results.length > 0 && this.setState({ searchResults: results })
    } else {
      this.setState({ searchResults: [] })
    }

    event.target.value.length === 0 && this.setState({
      searchResults: []
    })

  }

  render() {

    const { booksCollection, updateShelf } = this.props
    const { searchResults } = this.state

    let verifiedBooks = []
    // If search results are present, verify they are not on the book shelves
    if (searchResults.length > 0) {

      verifiedBooks = searchResults.map(book => {
        booksCollection.forEach(bookOnShelf => {
          //Check for book on shelf
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
              <input
                type="text"
                value={this.state.query}
                placeholder="Search by title or author"
                onChange={this.handleChange}
              />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {verifiedBooks.length > 0 && (
              <ListBooks books={verifiedBooks} updateShelf={updateShelf} />
            )}          
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

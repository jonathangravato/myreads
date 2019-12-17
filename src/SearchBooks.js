import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      query: '',
      searchResults: [],
      searchStatus: '',
      booksCollection: this.props.booksCollection
    };

    this.handleChange = this.handleChange.bind(this);
    this.verifyBooks = this.verifyBooks.bind(this);
  }

  //Handle change of search input
  handleChange(event) {
    const { bookSearch, results } = this.props

    let query = event.target.value

    bookSearch(event.target.value)
    
    this.setState({
      query: event.target.value
    });

    /*
     * Check if search field is populated then run search method in app root.
     * Set state of search results to modify the UI when results are present
     * or if search field is empty.
     */

    if(query.length > 0 && results && !results.hasOwnProperty("error")){
       this.setState({
         searchStatus: 'true'
       })
       results.length > 0 && this.verifyBooks(results)
    } else {
      this.setState({ 
        searchResults: [],
        searchStatus: 'false'
       })
    }

    query.length === 0 && this.setState({
      searchResults: []
    })

  }

  verifyBooks = (res) => {
    const { booksCollection } = this.props

    let verifiedBooks = []

    // If search results are present on a shelf, set the value of book.shelf to that of the current shelf.
    if (res.length > 0) {

      verifiedBooks = res.map(book => {
        booksCollection.forEach(bookOnShelf => {
          //Check for book on shelf
          book.id === bookOnShelf.id ? (
            book.shelf = bookOnShelf.shelf
          ) : (
            book.shelf || (
              book.shelf = 'none'
            )
          )
        })
        return book
      })

      this.setState({
        searchResults: verifiedBooks
      })

    }
  }

  render() {

    const { updateShelf } = this.props
    const { searchResults, query, searchStatus } = this.state
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">
            Close 
          </Link>
          <div className="search-books-input-wrapper">
              <input
                type="text"
                value={query}
                placeholder="Search by title or author"
                onChange={this.handleChange}
              />
          </div>
        </div>
        <div className="search-books-results">
            {(searchResults.length > 0 && searchStatus) ? (
              <ListBooks books={searchResults} updateShelf={updateShelf} />
            ) : (
              query.length > 0 && ( <p>No Books Found</p> )
            )}          
        </div>
      </div>
    );
  }
}

export default SearchBooks;

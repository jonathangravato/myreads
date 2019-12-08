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
    this.verifyBooks = this.verifyBooks.bind(this);
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
       results.length > 0 && this.verifyBooks(results)
    } else {
      this.setState({ searchResults: [] })
    }

    event.target.value.length === 0 && this.setState({
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
            book.shelf = 'none'
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
    const { searchResults } = this.state

    console.log(searchResults.length)
    
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
            {searchResults.length > 0 && (
              <ListBooks books={searchResults} updateShelf={updateShelf} />
            )}          
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

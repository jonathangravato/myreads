import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'

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

  handleChange(event) {
    
    const { query } = this.state

    this.setState({
      query: event.target.value
    });

    console.log(query);

    if(query.length > 0 ){
      BooksAPI.search(query)
      .then( books => {
        this.setState({ searchResults: books })
      })
      .catch( error => {
        console.log('There are no matching books.');
      })
    } else {
      this.setState({ searchResults: [] });
    }

  }

  // updateSearchView = (res) => {
  //   this.setState({
  //     searchResults: res
  //   })
  // }

  render() {

    const { booksCollection, updateShelf } = this.props
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
            <ListBooks books={verifiedBooks} updateShelf={updateShelf} />
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

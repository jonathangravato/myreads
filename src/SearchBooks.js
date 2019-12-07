import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import ListBooks from './ListBooks'

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      query: '',
      searchResults: [],
      booksCollection: this.props.booksCollection
    };

    this.handleChange = this.handleChange.bind(this);
    //this.onKeyDown = this.onKeyDown.bind(this);
  }

  handleChange(event) {
    const { bookSearch } = this.props
    const { query, searchResults } = this.state

    this.setState({
      query: event.target.value
    });

    if(query.length > 0 ){
       this.setState({
         searchResults: bookSearch(query)
       })
    } else {
      this.setState({ searchResults: [] });
    }

    console.log(searchResults)

  }

  // onKeyDown(event) {
  //   const { query, searchResults } = this.state
  //   if (event.keyCode === 8) {
  //     if (query.length >= 0){
  //       this.setState({
  //         searchResults: []
  //       })
  //       console.log(searchResults)
  //     }
  //   } 
  // }

  render() {

    // const { booksCollection, updateShelf } = this.props
    // const { searchResults } = this.state

    // let verifiedBooks = []

    // if (searchResults.length > 0) {

    //   verifiedBooks = searchResults.map(book => {
    //     booksCollection.forEach(bookOnShelf => {
    //       //check for book on shelf
    //       book.id === bookOnShelf.id ? (
    //         book.shelf = bookOnShelf
    //       ) : (
    //         book.shelf = 'none'
    //       )
    //     })
    //     return book
    //   })
    // }
    
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
                onKeyDown={this.onKeyDown}
              />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {/* {verifiedBooks.length > 0 && (
              <ListBooks books={verifiedBooks} updateShelf={updateShelf} />
            )}           */}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;

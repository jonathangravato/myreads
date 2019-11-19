import React from 'react';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      showSearchPage: false,
      books: []
    }

    this.toggleSearchPage = this.toggleSearchPage.bind(this)
  }

  toggleSearchPage() {
    this.setState({ showSearchPage: false })
  }

  componentDidMount() {
    //getAll from BooksAPI
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books
      }))
    })
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBooks toggleHandler={this.toggleSearchPage} />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <ListBooks books={this.state.books}/>
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;

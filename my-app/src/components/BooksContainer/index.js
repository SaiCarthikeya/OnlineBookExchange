import {Component} from 'react'
import {Puff} from 'react-loader-spinner'
import {v4} from 'uuid'
import BookItem from '../BookItem'
import './index.css'

class BooksContainer extends Component {
    state={isLoading: true, searchResultsBooks: []}

    searchBooks = async () => {
        const {searchValue} = this.props
        const searchValueUrl = searchValue.replace(' ', '+')
        const apiResponse = await fetch(`https://apis.ccbp.in/book-store?title=${searchValueUrl}`)
        const result = await apiResponse.json()
        const updatedBooksWithId = result.search_results.map((eachResult) => {
            return {...eachResult, id: v4()}
        })
        console.log(updatedBooksWithId)
        this.setState({isLoading: false, searchResultsBooks: updatedBooksWithId})
    }

    componentDidMount() {
        this.searchBooks()
    }

    addBookInner = (book) => {
        const {addBook} = this.props 
        addBook(book)
    }

    componentDidUpdate(prevProps) {
        if (this.props.searchValue !== prevProps.searchValue) {
          this.searchBooks()
        }
      }

    render () {
        const {isLoading, searchResultsBooks} = this.state 
        return(
            <div className="books-items-container">
                {isLoading?  <Puff color="#575e1a" height={550} width={80} />:
                searchResultsBooks.map((eachBook) => <BookItem key={eachBook.id} bookDetails={eachBook} addBookInner={this.addBookInner}/>)}
            </div>
        )
    }
}

export default BooksContainer
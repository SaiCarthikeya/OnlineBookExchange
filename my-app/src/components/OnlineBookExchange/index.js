import {Component} from 'react'
import Header from '../Header'
import HistoryItem from '../HistoryItem'
import BooksContainer from '../BooksContainer'
import './index.css'

class OnlineBookExchange extends Component {
    state = {currentTab: 'home', yourBooksList: [], searchType: 'findBook', 
    requestedBooks: [], searchValue: '', isSearchOn: false, displayAdded: false, historySelector: 'requestedBooks'}

    changeSearchType = () => {
        this.setState((previousState) => {
            if (previousState.searchType === 'findBook') {
                return { searchType: 'addBook' }
            }
            return { searchType: 'findBook' }
        })
    }

    changeHistoryType = () => {
        this.setState((prevState) => {
            if (prevState.historySelector === 'requestedBooks') {
                return { historySelector: 'yourBooks' }
            } else if (prevState.historySelector === 'yourBooks') {
                return { historySelector: 'requestedBooks' }
            }
        })
    }


    addBook = (book) => {
        this.setState((previousState) => {
            if (previousState.searchType === 'findBook') {
                return {requestedBooks: [...previousState.requestedBooks, book], displayAdded: true}
            }
            return {yourBooksList: [...previousState.yourBooksList, book], displayAdded: true}
        })
    }


    changeTab = (value) => {
        this.setState({currentTab: value, displayAdded: false})
    }

    updateSearchValue = (e) => {
        this.setState({searchValue: e.target.value})
    }

    triggerSearchOnEnter = (e) => {
        if (e.key === 'Enter') {
            this.setState({isSearchOn: true})
        }
    }

    removeBook = (id) => {
        this.setState((previousState) => {
            if (previousState.historySelector === 'requestedBooks') {
                return {requestedBooks: previousState.requestedBooks.filter((eachBook) => eachBook.id !== id)}
            }
            return {yourBooksList: previousState.yourBooksList.filter((eachBook) => eachBook.id !== id)}
        })
    }

    renderHome = () => {
        const {searchType, searchValue, isSearchOn, displayAdded} = this.state 
        const buttonContent = searchType === 'findBook' ? 'Add Book' : 'Find Book'
        const addSectionContent = searchType === 'findBook' ? 'Requested the book to the people who added the book.' : 'Added your books for others to find.'
        const headContent = searchType === 'findBook' ? 'Find The Books You Love ...' : 'Add Your Book For Others To Trade ...'
    
        return (
            <div className="home-container">
                {displayAdded ? (
                    <div className="added-container">
                        <h1 className="added-text">{addSectionContent}</h1>
                    </div>
                ) : (
                    <>
                        <div className="operation-area">
                            <button type="button" onClick={this.changeSearchType} className="btn">{buttonContent}</button>
                            <input
                                type="search"
                                value={searchValue}
                                className="input-box"
                                placeholder='Search Books'
                                onChange={this.updateSearchValue}
                                onKeyPress={this.triggerSearchOnEnter}
                            />
                        </div>
                        <h1 className="home-header">{headContent}</h1>
                        {isSearchOn && <BooksContainer searchValue={searchValue} searchType={searchType} addBook={this.addBook}/>}
                    </>
                )}
            </div>
        )
    }

    renderHistory = () => {
        const {yourBooksList, requestedBooks, historySelector} = this.state 
        const requestedBooksClass = historySelector === 'requestedBooks'? 'selected-left': ''
        const yourBooksClass = historySelector === 'yourBooks'? 'selected-right': ''
        let historyContainer
        if (historySelector === 'requestedBooks') {
            historyContainer = requestedBooks.map((eachBook) => <HistoryItem key={eachBook.id} bookDetails={eachBook} removeBook={this.removeBook}/>)
        } else {
            historyContainer = yourBooksList.map((eachBook) => <HistoryItem key={eachBook.id} bookDetails={eachBook} removeBook={this.removeBook}/>)
        }

        return (
            <div className="history-container">
                <div className="l">
                    <button className={`history-btn left ${requestedBooksClass}`} onClick={this.changeHistoryType}>Requested Books</button>
                    <button className={`history-btn right ${yourBooksClass}`} onClick={this.changeHistoryType}>Your Books</button>
                </div>
                <div className='history-elements-container'>
                    {historyContainer}
                </div>
            </div>
        )
    }

    renderAbout = () => {
        return (
            <div className='about-container'>
                <h1 className='about-header'>DTIS PROTOTYPE</h1>
                <h2 className='participants'>Participants:</h2>
                <div className='names-container'>
                    <div className='name-rollno'>
                        <p className='aboutText'>SAI CHAND REDDY</p>
                        <p className='aboutText'>22R01A0575</p>
                    </div>
                    <div className='name-rollno'>
                        <p className='aboutText'>RAKESH</p>
                        <p className='aboutText'>22R01A0584</p>
                    </div>
                    <div className='name-rollno'>
                        <p className='aboutText'>SIDDESHWARI</p>
                        <p className='aboutText'>22R01A0589</p>
                    </div>
                    <div className='name-rollno'>
                        <p className='aboutText'>SAI KARTHIKEYA</p>
                        <p className='aboutText'>22R01A0597</p>
                    </div>
                    <div className='name-rollno'>
                        <p className='aboutText'>ABHIRAMA SURYATEJA</p>
                        <p className='aboutText'>22R01A05A1</p>
                    </div>
                    <div className='name-rollno'>
                        <p className='aboutText'>DURGA DEVI</p>
                        <p className='aboutText'>22R01A05B8</p>
                    </div>
                </div>
            </div>
        )
    }
    

    render () {
        const {currentTab} = this.state
        let component = null 
        if (currentTab === 'home') {
            component = this.renderHome()
        }
        else if (currentTab === 'history') {
            component = this.renderHistory()
        }
        else if (currentTab === 'about') {
            component = this.renderAbout()
        }
        return(
            <div className="bg-container">
                <Header currentTab={currentTab} changeTab={this.changeTab}/>
                {component}
            </div>
        )
    }
}

export default OnlineBookExchange
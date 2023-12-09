import './index.css'

const BookItem = (props) => {
    const {bookDetails, addBookInner} = props
    const {author, title, imageLink} = bookDetails

    const addCurrentBook = () => {
        addBookInner(bookDetails)
    } 

    return (
        <div className="book-item-container" onClick={() => addCurrentBook()}>
            <img src={imageLink} alt={title} className="book-image" />
            <p className="title">{title}</p>
            <p className="author">{author}</p>
        </div>
    )
}

export default BookItem
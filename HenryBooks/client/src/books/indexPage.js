import React from "react"
import { Modal, Button, Alert, Table } from "react-bootstrap";

export default class extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            showDeleteConfirm: false,
            bookToDelete: null,
            showDeleteError: false
        }

        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.closeDeleteConfirm = this.closeDeleteConfirm.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
        this.closeDeleteErrorAlert = this.closeDeleteErrorAlert.bind(this)
    }
    componentDidMount() {
        fetch(this.props.getUrl).then(response => response.json())
        .then(r => {
            this.setState({ books: r })
        })
        .catch(err => { console.log(err) })
    }

    onDeleteClick(bookId) {
        this.setState({ showDeleteConfirm: true, bookToDelete: bookId })
    }

    closeDeleteConfirm() {
        this.setState({ showDeleteConfirm: false, bookToDelete: null })
    }

    closeDeleteErrorAlert() {
        this.setState({ showDeleteError: false })
    }

    buildTable() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.books.map((book) => (
                            <tr>
                                <td>{book.Title}</td>
                                <td>{book.Author}</td>
                                <td>{book.Description}</td>
                                <td>{book.Price}</td>
                                <td><Button bsStyle="primary" href={`/books/${book.ID}`}>Details</Button></td>
                                <td><Button bsStyle="default" href={`/books/${book.ID}/edit`}>Edit</Button></td>
                                <td><Button bsStyle="danger" onClick={() => {
                                    this.onDeleteClick(book.ID)
                                }}>Delete</Button></td>
                            </tr>
                        )                  
                    )}
                </tbody>
            </Table>
        )
    }

    confirmDelete() {
        fetch(`${this.props.deleteUrl}/${this.state.bookToDelete}`, {
            method: "DELETE"
        })
        .then(r => {
            if (r.status !== 200) {
                this.setState({ showDeleteError: true, showDeleteConfirm: false })
            }
            else {
                let books = this.state.books.filter(b => b.ID != this.state.bookToDelete)
                this.setState({ books: books, bookToDelete: null, showDeleteConfirm: false })
            }
            return r.json()
        })
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Manage Books</h2>
                <br/>
                <br/>
                {
                    this.state.showDeleteError && 
                    <Alert bsStyle="danger" onDismiss={this.closeDeleteErrorAlert}>
                        <h4>Uh oh!</h4>
                        <p>There was a problem deleting that book, try again later.</p>
                    </Alert>
                }

                <Modal show={this.state.showDeleteConfirm} onHide={this.closeDeleteConfirm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Really Delete?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button onClick={this.closeDeleteConfirm}>Cancel</Button>
                        <Button onClick={this.confirmDelete}>Confirm</Button>
                    </Modal.Footer>
                </Modal>

                {
                    this.state.books !== undefined &&
                    this.buildTable()
                }
                {
                    this.state.books === undefined &&
                    <h2 className="text-center">Loading...</h2>
                }
                <div className="text-center">
                    <Button bsStyle="success" className="btn-lg" href="/books/create">Create New</Button>
                    <br/>
                    <br/>
                </div>
            </div>
        )           
    }
}
import React from "react"
import * as getter from "../api/getter"
import * as saver from "../api/saver"
import { Alert, Modal, Button, Table } from "react-bootstrap";

export default class extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            showDeleteConfirm: false,
            invToDelete: null,
            showDeleteError: false
        }

        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.closeDeleteConfirm = this.closeDeleteConfirm.bind(this)
        this.confirmDelete = this.confirmDelete.bind(this)
        this.closeDeleteErrorAlert = this.closeDeleteErrorAlert.bind(this)
        this.getBooks = this.getBooks.bind(this)
        this.getBranches = this.getBranches.bind(this)
    }

    componentDidMount() {
        getter.getInvs()
        .then(r => {
            this.setState({ inventories: r })
        })
        .catch()
        this.getBooks()
        this.getBranches()
    }

    getBooks() {
        getter.getBooks()
        .then(r => {
            this.setState({ books: r })
        })
        .catch()
    }

    getBranches() {
        getter.getBranches()
        .then(r => {
            this.setState({ branches: r })
        })
        .catch()
    }

    onDeleteClick(id) {
        this.setState({ showDeleteConfirm: true, invToDelete: id })
    }

    closeDeleteConfirm() {
        this.setState({ showDeleteConfirm: false, invToDelete: null })
    }

    closeDeleteErrorAlert() {
        this.setState({ showDeleteError: false })
    }

    confirmDelete() {
        saver.delInv(this.state.invToDelete)
        .then(r => {
            let inventories = this.state.inventories.filter(i => i.ID !== this.state.invToDelete)
            this.setState({ inventories: inventories, invToDelete: null, showDeleteConfirm: false })
        })
        .catch(() => {
            this.setState({ showDeleteError: true, showDeleteConfirm: false })
        })
    }

    buildTable(books, branches) {
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Branch Name</th>
                        <th>Book Title</th>
                        <th>Quantity</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.inventories.map(i => {
                        let branch = branches.filter(b => b.ID === i.BranchID)
                        let book = books.filter(b => b.ID === i.BookID)

                        let branchName = branch.length < 1 ? "N/A" : branch[0].Name
                        let bookName = book.length < 1 ? "N/A" : book[0].Title
                        return (
                            <tr>
                                <td>{branchName}</td>
                                <td>{bookName}</td>
                                <td>{i.Quantity}</td>
                                <td>
                                    <Button bsStyle="primary"
                                        href={`/inventories/${i.ID}`}>
                                        Details
                                    </Button>
                                </td>
                                <td>
                                    <Button bsStyle="default"
                                        href={`/inventories/${i.ID}/edit`}>
                                        Edit
                                    </Button>
                                </td>
                                <td>
                                    <Button bsStyle="danger"
                                        onClick={() => { this.onDeleteClick(i.ID) }}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        )             
                    })}
                </tbody>
            </Table>
        )
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Manage Inventory</h2>
                <br/>
                <br/>
                {
                    this.state.showDeleteError &&
                    <Alert bsStyle="danger" onDismiss={this.closeDeleteErrorAlert}>
                        <h4>Uh oh!</h4>
                        <p>There was a problem deleting that inventory, try again later.</p>
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
                    this.state.books !== undefined && this.state.branches !== undefined && this.state.inventories !== undefined &&
                    this.buildTable(this.state.books, this.state.branches)
                }
                {
                    this.state.books === undefined || this.state.branches === undefined &&
                    <h4 className="text-center">Loading...</h4>
                }
                <Button bsStyle="success" block href="/inventories/create">
                    Add Inventory
                </Button>
                <br/>
                <br/>
            </div>
        )
    }
}
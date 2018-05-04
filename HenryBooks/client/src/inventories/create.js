import React from "react"
import * as saver from "../api/saver"
import * as getter from "../api/getter"
import { Alert, ControlLabel, Button, FormGroup, FormControl } from "react-bootstrap";

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSaveError: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.createInventory = this.createInventory.bind(this)
        this.closeError = this.closeError.bind(this)
        this.getBooks = this.getBooks.bind(this)
        this.getBranches = this.getBranches.bind(this)
    }

    componentDidMount() {
        this.getBooks()
        this.getBranches()
    }

    handleChange(e) {
        let state = {}
        state[e.target.id] = e.target.value
        this.setState(state)
    }

    createInventory() {
        saver.saveInv({
            BranchID: Number(this.state.branchId),
            BookID: Number(this.state.bookId),
            Quantity: Number(this.state.quantity)
        })
        .then(r => {
            window.location="/inventories/index"
        })
        .catch(() => {
            this.setState({ showSaveError: true })
        })
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

    closeError() {
        this.setState({ showSaveError: false })
    }

    render() {
        return (
            <main className="container">
                <h2 className="text-center">Create Inventory Record</h2>
                <Button href="/inventories/index" bsStyle="default">Back to List</Button>
                <br/>
                <hr/>
                <br/>
                {
                    this.state.showSaveError &&
                    <Alert bsStyle="danger" onDismiss={this.closeError}>
                        <h4>Uh oh!</h4>
                        <p>There was a problem saving that one, try again later.</p>
                    </Alert>
                }
                {
                    this.state.books === undefined || this.state.branches === undefined &&
                    <h4 className="text-center">Loading...</h4>
                }
                {
                    this.state.books && this.state.branches &&
                    <form>
                        <FormGroup>
                            <ControlLabel>Branch</ControlLabel>
                            <FormControl componentClass="select"
                                placeholder="Select Branch..."
                                id="branchId"
                                onChange={this.handleChange}>
                                <option value={0}>Select Branch...</option>
                                {this.state.branches.map(b => (
                                    <option value={b.ID}>{b.Name}</option>
                                ))}
                            </FormControl>

                            <ControlLabel>Book</ControlLabel>
                            <FormControl componentClass="select"
                                placeholder="Select Book..."
                                id="bookId"
                                onChange={this.handleChange}>
                                <option value={0}>Select Book... </option>
                                {this.state.books.map(b => (
                                    <option value={b.ID}>{b.Title}</option>
                                ))}
                            </FormControl>

                            <ControlLabel>Quantity</ControlLabel>
                            <FormControl type="number" min="1" step="1"
                                id="quantity" onChange={this.handleChange} />
                        </FormGroup>

                        <Button onClick={this.createInventory} bsStyle="success" bsSize="large" block>
                            Create
                        </Button>
                    </form>
                }
                <br/>
            </main>
        )
    }
}
import React from "react"
import { FormGroup, ControlLabel, Button, FormControl, Alert } from "react-bootstrap"
import * as getter from "../api/getter"
import * as saver from "../api/saver"

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSaveError: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.createInventory = this.createInventory.bind(this)
        this.closeError = this.closeError.bind(this)
    }

    componentDidMount() {
        getter.getInv(this.props.invId)
        .then(r => {
            this.setState({
                inventory: r,
                bookId: r.BookID,
                branchId: r.BranchID,
                quantity: r.Quantity
            })
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

    handleChange(e) {
        let state = {}
        state[e.target.id] = e.target.value
        this.setState(state)
    }

    createInventory() {
        saver.saveInv({
            ID: Number(this.state.inventory.ID),
            BranchID: Number(this.state.branchId),
            BookID: Number(this.state.bookId),
            Quantity: Number(this.state.quantity)
        }, this.state.inventory.ID)
        .then(r => {
            window.location="/inventories/index"
        })
        .catch(() => {
            this.setState({ showSaveError: true })
        })
    }

    closeError() {
        this.setState({ showSaveError: false })
    }

    render() {
        return (
            <main className="container">
                <h2 className="text-center">Edit Inventory Record</h2>
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
                                onChange={this.handleChange}
                                value={this.state.branchId}>
                                <option value={0}>Select Branch...</option>
                                {this.state.branches.map(b => (
                                    <option value={b.ID}>{b.Name}</option>
                                ))}
                            </FormControl>

                            <ControlLabel>Book</ControlLabel>
                            <FormControl componentClass="select"
                                placeholder="Select Book..."
                                id="bookId"
                                onChange={this.handleChange}
                                value={this.state.bookId}>
                                <option value={0}>Select Book... </option>
                                {this.state.books.map(b => (
                                    <option value={b.ID}>{b.Title}</option>
                                ))}
                            </FormControl>

                            <ControlLabel>Quantity</ControlLabel>
                            <FormControl type="number" min="1" step="1"
                                id="quantity" onChange={this.handleChange} 
                                value={this.state.quantity}/>
                        </FormGroup>

                        <Button onClick={this.createInventory} bsStyle="success" bsSize="large" block>
                            Save
                        </Button>
                    </form>
                }
                <br/>
            </main>
        )
    }
}
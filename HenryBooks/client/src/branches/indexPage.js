import React from "react"
import { Modal, Button, Alert, Table } from "react-bootstrap";

export default class extends React.Component {
    constructor(props) {
        super(props)
        
        this.state = {
            showDeleteConfirm: false,
            branchToDelete: null,
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
            this.setState({ branches: r })
        })
        .catch(err => { console.log(err) })
    }

    onDeleteClick(id) {
        this.setState({ showDeleteConfirm: true, branchToDelete: id })
    }

    closeDeleteConfirm() {
        this.setState({ showDeleteConfirm: false, branchToDelete: null })
    }

    closeDeleteErrorAlert() {
        this.setState({ showDeleteError: false })
    }

    buildTable() {
        return (
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Street Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Zip Code</th>
                        <th>Phone Number</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.branches.map((branch) => (
                            <tr>
                                <td>{branch.Name}</td>
                                <td>{branch.StreetAddress}</td>
                                <td>{branch.City}</td>
                                <td>{branch.State}</td>
                                <td>{branch.ZipCode}</td>
                                <td>{branch.PhoneNumber}</td>
                                <td><Button bsStyle="primary" href={`/branches/${branch.ID}`}>Details</Button></td>
                                <td><Button bsStyle="default" href={`/branches/${branch.ID}/edit`}>Edit</Button></td>
                                <td><Button bsStyle="danger" onClick={() => {
                                    this.onDeleteClick(branch.ID)
                                }}>Delete</Button></td>
                            </tr>
                        )                  
                    )}
                </tbody>
            </Table>
        )
    }

    confirmDelete() {
        fetch(`${this.props.deleteUrl}/${this.state.branchToDelete}`, {
            method: "DELETE"
        })
        .then(r => {
            if (r.status !== 200) {
                this.setState({ showDeleteError: true, showDeleteConfirm: false })
            }
            else {
                let branches = this.state.branches.filter(b => b.ID !== this.state.ranchToDelete)
                this.setState({ branches: branches, branchToDelete: null, showDeleteConfirm: false })
            }
            return r.json()
        })
    }

    render() {
        return (
            <div className="container">
                <h2 className="text-center">Manage Branches</h2>
                <br/>
                <br/>
                {
                    this.state.showDeleteError && 
                    <Alert bsStyle="danger" onDismiss={this.closeDeleteErrorAlert}>
                        <h4>Uh oh!</h4>
                        <p>There was a problem deleting that branch, try again later.</p>
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
                    this.state.branches !== undefined &&
                    this.buildTable()
                }
                {
                    this.state.branches === undefined &&
                    <h2 className="text-center">Loading...</h2>
                }
                <div className="text-center">
                    <Button bsStyle="success" className="btn-lg" href="/branches/create">Create New</Button>
                    <br/>
                    <br/>
                </div>
            </div>
        )           
    }
}
import React from "react"
import { Row, Col, Button } from "react-bootstrap"
import * as getter from "../api/getter"

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}

        this.getBook = this.getBook.bind(this)
        this.getBranch = this.getBranch.bind(this)
    }

    componentDidMount() {
        getter.getInv(this.props.invId)
        .then(r => {
            this.setState({ inventory: r })
            this.getBook(r.BookID)
            this.getBranch(r.BranchID)
        })
        .catch(() => {
            
        })
        
    }

    getBook(id) {
        getter.getBook(id)
        .then(r => {
            this.setState({ book: r })
        })
        .catch()
    }

    getBranch(id) {
        getter.getBranch(id)
        .then(r => {
            this.setState({ branch: r })
        })
        .catch()
    }

    render() {
        return (
            <main className="container">
                <Row>
                    <Col md={2}>
                        <Button href="/inventories/index" bsStyle="default">
                            Back to List
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col mdOffset={2} md={6}>
                        <h2 className="text-center">Details</h2>
                        <br/>
                        <hr/>
                        <br/>
                        {
                            this.state.inventory === undefined || this.state.book === undefined || this.state.branch === undefined &&
                            <p className="text-center">Loading...</p>
                        }
                        {
                            this.state.inventory && this.state.book && this.state.branch &&
                            <div>
                                <p><b>Branch: </b>{this.state.branch.Name}</p>
                                <p><b>Book: </b>{this.state.book.Title}</p>
                                <p><b>Quantity: </b>{this.state.inventory.Quantity}</p>
                                <hr/>
                            </div>
                        }
                        <br/>
                        <Button href={`/inventories/${this.props.invId}/edit`}
                            bsStyle="primary">
                            Edit
                        </Button>
                    </Col>
                </Row>
            </main>
        )
    }
}
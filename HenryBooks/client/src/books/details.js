import React from "react"
import { Row, Col, Button } from "react-bootstrap"
import * as getter from "../api/getter"

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        getter.getBook(this.props.bookId)
        .then(r => {
            this.setState({ book: r })
        })
        .catch(err => { console.log(err) })
    }

    render() {
        return (
            <main className="container">
                <Row>
                    <Col md={2}>
                        <Button href="/books/index" bsStyle="default">Back to List</Button>
                    </Col>
                </Row>
                <Row>
                    <Col mdOffset={2} md={6}>
                        <h2 className="text-center">Details</h2>
                        <br/>
                        <hr/>
                        <br/>
                        {
                            this.state.book === undefined &&
                            <p className="text-center">Loading...</p>
                        }
                        {
                            this.state.book !== undefined &&
                            <div>
                                <p><b>Title:</b> {this.state.book.Title}</p>
                                <p><b>Author:</b> {this.state.book.Author}</p>
                                <p><b>Description:</b> {this.state.book.Description}</p>
                                <p><b>Price: </b> {this.state.book.Price}</p>
                                <img src={this.state.book.ThumbnailUrl} alt="book thumbnail" width="80%"/>
                                <hr />
                            </div>
                        }
                        <Button href={`/books/${this.props.bookId}/edit`} bsStyle="primary">Edit</Button>
                    </Col>                  
                </Row>
            </main>
        )
        
    }
}
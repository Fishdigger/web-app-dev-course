import React from "react"
import { Row, Col, Button } from "react-bootstrap"

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        fetch(this.props.getUrl).then(res => res.json())
        .then(r => {
            this.setState({ branch: r })
        })
        .catch(err => { console.log(err) })
    }

    render() {
        return (
            <main className="container">
                <Row>
                    <Col md={2}>
                        <Button href="/branches/index" bsStyle="default">Back to List</Button>
                    </Col>
                </Row>
                <Row>
                    <Col mdOffset={2} md={6}>
                        <h2 className="text-center">Details</h2>
                        <br/>
                        <hr/>
                        <br/>
                        {
                            this.state.branch === undefined &&
                            <p className="text-center">Loading...</p>
                        }
                        {
                            this.state.branch !== undefined &&
                            <div>
                                <p><b>Name:</b> {this.state.branch.Name}</p>
                                <p><b>Address:</b>
                                    {`${this.state.branch.StreetAddress}\n
                                    ${this.state.branch.City},
                                    ${this.state.branch.State} ${this.state.branch.ZipCode}
                                    `}
                                </p>
                                <p><b>Phone Number:</b> {this.state.branch.PhoneNumber}</p>
                                <hr />
                            </div>
                        }
                        <Button href={`/branches/${this.props.branchId}/edit`} bsStyle="primary">Edit</Button>
                    </Col>                  
                </Row>
            </main>
        )
        
    }
}
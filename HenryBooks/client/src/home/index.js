import React from "react"
import { Row, Col } from "react-bootstrap"

export default () => {
    return (
        <main className="container">
            <Row>
                <Col md={10} mdOffset={1}>
                    <img src="/img/wallpaper.jpg" width="100%" alt="Woman reading in bookstore"/>
                </Col>
            </Row>
        </main>
    )
}
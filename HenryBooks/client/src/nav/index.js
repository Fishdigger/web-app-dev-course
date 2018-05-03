import React from "react"
import { Navbar, Nav, NavDropdown, MenuItem } from "react-bootstrap"

export default () => {

    return (
        <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="/">Henry's Books</a>
                </Navbar.Brand>
            </Navbar.Header>
            <Nav>
                <NavDropdown title="Books" id="bookDropdown">
                    <MenuItem href="/books/index">Manage</MenuItem>
                    <MenuItem>Create New</MenuItem>
                </NavDropdown>
                <NavDropdown title="Branches" id="branchDropdown">
                    <MenuItem>Manage</MenuItem>
                    <MenuItem>Create New</MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar>
    )
}
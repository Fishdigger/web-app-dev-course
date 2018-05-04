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
                    <MenuItem href="/books/create">Create New</MenuItem>
                </NavDropdown>
                <NavDropdown title="Branches" id="branchDropdown">
                    <MenuItem href="/branches/index">Manage</MenuItem>
                    <MenuItem href="/branches/create">Create New</MenuItem>
                </NavDropdown>
            </Nav>
        </Navbar>
    )
}
import { Route, Switch } from "react-router-dom"
import React from "react"
import Home from "../home"
import BookIndex from "../books/indexPage"
import * as config from "../config"
import BookDetails from "../books/details"
import BookCreate from "../books/create"
import BookEdit from "../books/edit"
import BranchIndex from "../branches/indexPage"
import BranchDetails from "../branches/details"
import BranchEdit from "../branches/edit"
import BranchCreate from "../branches/create"

export default () => {
    return (
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/books/index" render={props => (
                <BookIndex 
                    getUrl={`${config.serverUrl}/books`}
                    deleteUrl={`${config.serverUrl}/books`}
                />
            )} />
            <Route path="/books/:id/edit" render={props => (
                <BookEdit
                    getUrl={`${config.serverUrl}/books/${props.match.params.id}`}
                    saveUrl={`${config.serverUrl}/books/${props.match.params.id}`}
                />
            )}/>
            <Route path="/books/create" render={props => (
                <BookCreate saveUrl={`${config.serverUrl}/books`} />
            )} />
            <Route exact path="/books/:id" render={props => (
                <BookDetails getUrl={`${config.serverUrl}/books/${props.match.params.id}`} bookId={props.match.params.id} />
            )} />
            <Route path="/branches/index" render={props => (
                <BranchIndex 
                    getUrl={`${config.serverUrl}/branches`}
                    deleteUrl={`${config.serverUrl}/branches`}
                />
            )} />
            <Route path="/branches/:id/edit" render={props => (
                <BranchEdit
                    getUrl={`${config.serverUrl}/branches/${props.match.params.id}`}
                    saveUrl={`${config.serverUrl}/branches/${props.match.params.id}`}
                />
            )}/>
            <Route path="/branches/create" render={props => (
                <BranchCreate saveUrl={`${config.serverUrl}/branches`} />
            )} />
            <Route exact path="/branches/:id" render={props => (
                <BranchDetails getUrl={`${config.serverUrl}/branches/${props.match.params.id}`} branchId={props.match.params.id} />
            )} />
        </Switch>
    )
}
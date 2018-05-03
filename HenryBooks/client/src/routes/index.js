import { Route, Switch } from "react-router-dom"
import React from "react"
import Home from "../home"
import BookIndex from "../books/indexPage"
import * as config from "../config"
import BookDetails from "../books/details"

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
            <Route path="/books/:id" render={props => (
                <BookDetails getUrl={`${config.serverUrl}/books/${props.match.params.id}`} bookId={props.match.params.id} />
            )} />
        </Switch>
    )
}
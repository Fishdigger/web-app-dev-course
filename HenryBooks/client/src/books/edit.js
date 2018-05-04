import React from "react"
import { FormGroup, ControlLabel, Button, FormControl, Alert } from "react-bootstrap";

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showSaveError: false,
        }
        this.titleChange = this.titleChange.bind(this)
        this.authorChange = this.authorChange.bind(this)
        this.priceChange = this.priceChange.bind(this)
        this.descriptionChange = this.descriptionChange.bind(this)
        this.thumbnailChange = this.thumbnailChange.bind(this)
        this.createBook = this.createBook.bind(this)
        this.closeError = this.closeError.bind(this)
    }

    componentDidMount() {
        fetch(this.props.getUrl).then(response => response.json())
        .then(r => {
            this.setState({
                book: r,
                title: r.Title,
                author: r.Author,
                price: r.Price,
                description: r.Description,
                thumbnailUrl: r.ThumbnailUrl
            })
        })
        .catch(err => { console.log(err) })
    }

    titleChange(e){
        this.setState({ title: e.target.value })
    }
    authorChange(e) {
        this.setState({ author: e.target.value })
    }
    priceChange(e) {
        this.setState({ price: e.target.value })
    }
    descriptionChange(e) {
        this.setState({ description: e.target.value })
    }
    thumbnailChange(e) {
        this.setState({ thumbnailUrl: e.target.value })
    }

    createBook() {
        return fetch(this.props.saveUrl, {
            method: "POST",
            body: JSON.stringify({
                ID: this.state.book.ID,
                Title: this.state.title,
                Author: this.state.author,
                Description: this.state.description,
                Price: Number(this.state.price),
                ThumbnailUrl: this.state.thumbnailUrl
            })
        })
        .then(res => {
            window.location="/books/index"
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
                <h2 className="text-center">Edit Book</h2>
                <Button href="/books/index" bsStyle="default">Back To List</Button>
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
                    this.state.book === undefined &&
                    <h4 className="text-center">Loading...</h4>
                }
                {
                    this.state.book !== undefined &&
                    <form>
                        <FormGroup>
                            <ControlLabel>Title</ControlLabel>
                            <FormControl type="text" 
                            onChange={this.titleChange} 
                            id="title"
                            value={this.state.title}/>
                            <FormControl.Feedback/>
                            
                            <ControlLabel>Author</ControlLabel>
                            <FormControl type="text" onChange={this.authorChange}
                            id="author"
                            value={this.state.author}/>
                            <FormControl.Feedback/>

                            <ControlLabel>Description</ControlLabel>
                            <FormControl type="textarea" onChange={this.descriptionChange} 
                            id="description"
                            value={this.state.description}/>
                            <FormControl.Feedback/>

                            <ControlLabel>Price</ControlLabel>
                            <FormControl type="number" min="0.01" step="0.01" onChange={this.priceChange} id="price" value={this.state.price}/>
                            <FormControl.Feedback/>

                            <ControlLabel>Thumbnail Url</ControlLabel>
                            <FormControl type="text" onChange={this.thumbnailChange}
                            id="thumbnailUrl" value={this.state.thumbnailUrl}/>
                            <FormControl.Feedback/>
                            <hr/>
                            <div className="text-center">
                                <Button bsStyle="success" 
                                    bsSize="large" 
                                    onClick={this.createBook}
                                    block
                                >
                                    Save
                                </Button>
                            </div>
                        </FormGroup>
                    </form>
                }                
            </main>
        )
    }
}
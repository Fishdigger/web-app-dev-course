import React from "react"
import { FormGroup, ControlLabel, Button, FormControl, Alert } from "react-bootstrap";

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = { showSaveError: false }
        this.nameChange = this.nameChange.bind(this)
        this.addressChange = this.addressChange.bind(this)
        this.stateChange = this.stateChange.bind(this)
        this.cityChange = this.cityChange.bind(this)
        this.zipChange = this.zipChange.bind(this)
        this.phoneChange = this.phoneChange.bind(this)
        this.createBranch = this.createBranch.bind(this)
        this.closeError = this.closeError.bind(this)
    }

    nameChange(e){
        this.setState({ name: e.target.value })
    }
    addressChange(e) {
        this.setState({ streetAddress: e.target.value })
    }
    stateChange(e) {
        this.setState({ state: e.target.value })
    }
    cityChange(e) {
        this.setState({ city: e.target.value })
    }
    zipChange(e) {
        this.setState({ zipCode: e.target.value })
    }
    phoneChange(e) {
        this.setState({ phoneNumber: e.target.value })
    }

    createBranch() {
        return fetch(this.props.saveUrl, {
            method: "POST",
            body: JSON.stringify({
                Name: this.state.name,
                StreetAddress: this.state.streetAddress,
                City: this.state.city,
                State: this.state.state,
                ZipCode: this.state.zipCode
            })
        })
        .then(res => {
            window.location="/branches/index"
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
                <h2 className="text-center">Create New Branch</h2>
                <Button href="/branches/index" bsStyle="default">Back To List</Button>
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

                <form>
                    <FormGroup>
                        <ControlLabel>Name</ControlLabel>
                        <FormControl type="text" 
                        onChange={this.nameChange} 
                        id="name"/>
                        <FormControl.Feedback/>
                        
                        <ControlLabel>Street Address</ControlLabel>
                        <FormControl type="text" onChange={this.addressChange} id="streetAddress"/>
                        <FormControl.Feedback/>

                        <ControlLabel>City</ControlLabel>
                        <FormControl type="text" onChange={this.cityChange} id="city"/>
                        <FormControl.Feedback/>

                        <ControlLabel>State</ControlLabel>
                        <FormControl type="text" onChange={this.stateChange} id="state"/>
                        <FormControl.Feedback/>

                        <ControlLabel>Zip Code</ControlLabel>
                        <FormControl type="text" onChange={this.zipChange} id="zipCode"/>
                        <FormControl.Feedback/>

                        <ControlLabel>Phone Number</ControlLabel>
                        <FormControl type="text" onChange={this.phoneChange}/>
                        <FormControl.Feedback/>

                        <hr/>
                        <div className="text-center">
                            <Button bsStyle="success" 
                                bsSize="large" 
                                onClick={this.createBranch}
                                block
                            >
                                Create
                            </Button>
                        </div>
                    </FormGroup>
                </form>
            </main>
        )
    }
}
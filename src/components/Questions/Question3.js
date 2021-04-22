import React, {Component} from 'react';
import "./Questions.css";
import {withRouter} from "react-router";

class Question3 extends Component {

    constructor(){
        super();
        this.state = {
            shape: ""
        }
        this._updateShape = this._updateShape.bind(this);
    }

    _updateShape(event){
        console.log(event.target.value, 'Checked input')
        
        let url = `http://localhost:5000/create/${this.props.id}/updateShape`;
        let shape = "";

        if (event.target.value === "city") {
            shape = "rectangle";
        }
        else if (event.target.value === "mountains") {
            shape = "triangle";
        }
        else if (event.target.value === "ocean") {
            shape = "hline";
        }
        else if (event.target.value === "forest") {
            shape = "vline";
        }

        const message = {
            shape: shape
        };

        console.log(message)

        const fetchOptions = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(message)
        }
    
        // send the message body
        fetch(url, fetchOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
        })
        .catch()
    }

    render(){
        return(
            <div className="questions">
                <form className="question-form">
                    <h4>What environment are you drawn to?</h4>
                    <div>
                        <input className="radio" type="radio" id="city" name="environment" value="city" onChange={this._updateShape}/>
                        <label htmlFor="city">City</label><br></br>
                        <input className="radio" type="radio" id="mountains" name="environment" value="mountains" onChange={this._updateShape}/>
                        <label htmlFor="mountains">Mountains</label><br></br>
                        <input className="radio" type="radio" id="ocean" name="environment" value="ocean" onChange={this._updateShape}/>
                        <label htmlFor="ocean">Ocean</label><br></br>
                        <input className="radio" type="radio" id="forest" name="environment" value="forest" onChange={this._updateShape}/>
                        <label htmlFor="forest">Forest</label>
                    </div>
                </form>
            </div>
        );
        
    }

}

export default withRouter(Question3);
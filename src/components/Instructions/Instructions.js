import React, {Component} from 'react';
import "./Instructions.css";
import {withRouter} from "react-router";

class Instructions extends Component {

    constructor(){
        super();
        this._createShape = this._createShape.bind(this);
    }

    /*
    _clicked(){
        this._createShape();
        // change the url to match the url for Home Route
        window.location.href = `/create`;
    }
    */

    _createShape() {
        
        const url = `http://localhost:5000/instructions/newShape`;

        const message = {
            color: "",
            opacity: 1,
            shape: "",
            width: 0,
            height: 0,
            positioned: false,
            x: 0,
            y: 0,
            complete: false
        };

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
        .then(response => response.json())
        .then(result => {
            
            const id = result._id.toString();
            console.log(id);
            // change the url to match the url for Home Route
            window.location.href = `/create/${id}`;
        })
    }

    render(){
        return(
            <div className="instructions">
                <div className="instructions-body">
                    <div>
                        <h1>Instructions</h1>
                        <h6>You will be given a series of simple questions to answer.</h6>
                        <h6>At the end, you will be provided with a shape.</h6>
                        <h6>This shape will contribute to a dynamic canvas.</h6>
                        <button onClick={this._createShape} className="btn btn-outline-secondary">BEGIN</button>
                    </div>
                </div>
            </div>
        );
        
    }

}

export default withRouter(Instructions);
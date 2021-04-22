import React, {Component} from 'react';
import "./Questions.css";
import {withRouter} from "react-router";

class Question5 extends Component {

    constructor(){
        super();
        this.state = {
            x: 0,
            y: 0
        }
        this._updatePosition = this._updatePosition.bind(this);
    }

    _updatePosition(event){
        console.log(event.target.value, 'Checked input')
        
        let url = `http://localhost:5000/create/${this.props.id}/updatePosition`;
        let positioned = false;
        let x = 0;
        let y = 0;

        if (event.target.value === "structure") {
            positioned = true;
            x = Math.floor(Math.random() * 1150)+20;
            y = Math.floor(Math.random() * 600)+20;
        }
        else {
            positioned = false;
            x = 0;
            y = 0;
        }

        const message = {
            positioned: positioned,
            x: x,
            y: y
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
                    <h4>What do you need more of in your life right now?</h4>
                    <div>
                        <input className="radio" type="radio" id="freedom" name="placement" value="freedom" onChange={this._updatePosition}/>
                        <label htmlFor="freedom">Freedom</label><br></br>
                        <input className="radio" type="radio" id="structure" name="placement" value="structure" onChange={this._updatePosition}/>
                        <label htmlFor="structure">Structure</label>
                    </div>
                </form>
            </div>
        );
        
    }

}

export default withRouter(Question5);
import React, {Component} from 'react';
import "./Questions.css";
import {withRouter} from "react-router";

class Question2 extends Component {

    constructor(){
        super();
        this._updateOpacity = this._updateOpacity.bind(this);
    }

    _updateOpacity(event){
        console.log(event.target.value, 'Checked input')
        
        let url = `http://localhost:5000/create/${this.props.id}/updateOpacity`;
        let opacity = "";

        if (event.target.value === "yes") {
            opacity = 1;
        }
        else {
            opacity = 0.5;
        }

        const message = {
            opacity: opacity
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
            <div className="question">
                <form className="question-form">
                    <h4>Strongly?</h4>
                    <div>
                        <input className="radio" type="radio" id="yes" name="moodStrength" value="yes" onChange={this._updateOpacity}/>
                        <label htmlFor="yes">Yes</label><br></br>
                        <input className="radio" type="radio" id="no" name="moodStrength" value="no" onChange={this._updateOpacity}/>
                        <label htmlFor="no">Not particularly</label>
                    </div>
                </form>
            </div>
        );
        
    }

}

export default withRouter(Question2);
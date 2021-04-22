import React, {Component} from 'react';
import "./Questions.css";
import {withRouter} from "react-router";

class Question1 extends Component {

    constructor(){
        super();
        this._updateColor = this._updateColor.bind(this);
    }

    _updateColor(event){
        console.log(event.target.value, 'Checked input')
        
        let url = `http://localhost:5000/create/${this.props.id}/updateColor`;
        let color = "";

        console.log(this.props.id)

        if (event.target.value === "happy") {
            color = "#FFF241";
        }
        else if (event.target.value === "sad") {
            color = "#015AFC";
        }
        else if (event.target.value === "angry") {
            color = "#ED1A2D";
        }
        else if (event.target.value === "neutral") {
            color = "#7E7E7E";
        }

        const message = {
            color: color
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

    /*
    _selectColor(event){
        console.log(event.target.value, 'Checked input')

        if (event.target.value !== "") {
            this._updateColor(event)
        }
        else {
            console.log("missing field")
        }
    }
    */

    render(){

        // const id = this.props.id
        // console.log(id)

        return(
            <div className="question">
                <form className="question-form">
                    <h4>How are you feeling today?</h4>
                    <div>
                        <input className="radio" type="radio" id="happy" name="mood" value="happy" onChange={this._updateColor}/>
                        <label htmlFor="happy">Happy/Content/Excited</label><br></br>
                        <input className="radio" type="radio" id="sad" name="mood" value="sad" onChange={this._updateColor}/>
                        <label htmlFor="sad">Sad/Upset</label><br></br>
                        <input className="radio" type="radio" id="angry" name="mood" value="angry" onChange={this._updateColor}/>
                        <label htmlFor="angry">Angry/Frustrated/Stressed</label><br></br>
                        <input className="radio" type="radio" id="neutral" name="mood" value="neutral" onChange={this._updateColor}/>
                        <label htmlFor="neutral">Neutral</label>
                    </div>
                </form>
            </div>
        );
        
    }

}

export default withRouter(Question1);
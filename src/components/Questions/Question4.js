import React, {Component} from 'react';
import "./Questions.css";
import {withRouter} from "react-router";

class Question4 extends Component {

    constructor(){
        super();
        this.state = {
            opacity: ""
        }
        this._updateSize = this._updateSize.bind(this);
    }

    _updateSize(event){
        console.log(event.target.value, 'Checked input')
        
        let url = `http://localhost:5000/create/${this.props.id}/updateSize`;
        let width = 0;
        let height = 0;

        if (event.target.value === "more") {
            width = 180;
            height = 180;
        }
        else {
            width = 120;
            height = 120;
        }

        const message = {
            width: width,
            height: height
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
                    <h4>What is better: More or Less?</h4>
                    <div>
                        <input className="radio" type="radio" id="more" name="size" value="more" onChange={this._updateSize}/>
                        <label htmlFor="more">More</label><br></br>
                        <input className="radio" type="radio" id="less" name="size" value="less" onChange={this._updateSize}/>
                        <label htmlFor="less">Less</label>
                    </div>
                </form>
            </div>
        );
        
    }

}

export default withRouter(Question4);
import React, {Component} from 'react';
import "./Questions.css";
import {withRouter} from "react-router";

import Question1 from "./Question1"
import Question2 from "./Question2"
import Question3 from "./Question3"
import Question4 from "./Question4"
import Question5 from "./Question5"

class Questions extends Component {

    constructor(){
        super();
        this.state = {
            number: 1,
        }
        this._createShape = this._createShape.bind(this);
        this.firstRef = React.createRef() 
        this.secondRef = React.createRef() 
        this.thirdRef = React.createRef() 
        this.fourthRef = React.createRef()
        this._clicked = this._clicked.bind(this); 
    }

    _clicked() {
        let url = `http://localhost:5000/create/${this.props.match.params.id}/markComplete`;

        const fetchOptions = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }

        // send the message body
        fetch(url, fetchOptions)
        .then(response => response.text())
        .then(result => {
            const id = this.props.match.params.id;
            console.log(result);
            console.log(id);
            window.location.href = `/display/${id}`;
        })
        .catch()
    }

    _createShape(){
        console.log(this.state.color)
        console.log(this.state.opacity)
        console.log(this.state.shape)
        console.log(this.state.size)
    }

    executeFirstScroll = () => this.firstRef.current.scrollIntoView()
    executeSecondScroll = () => this.secondRef.current.scrollIntoView()
    executeThirdScroll = () => this.thirdRef.current.scrollIntoView()
    executeFourthScroll = () => this.fourthRef.current.scrollIntoView()

    render(){
        
        const id = this.props.match.params.id;
        console.log(id);
        
        return(
            <div className="questions">
                <div className="questions-body">
                       <div className="questions-question">
                            <div><Question1 id={id}/></div>
                            <button type="button" onClick={this.executeFirstScroll} className="btn btn-outline-secondary">NEXT</button>
                       </div>
                       <div className="questions-question" ref={this.firstRef}>
                            <div><Question2 id={id}/></div>
                            <button type="button" onClick={this.executeSecondScroll} className="btn btn-outline-secondary">NEXT</button>
                       </div>
                       <div className="questions-question" ref={this.secondRef}>
                            <div><Question3 id={id}/></div>
                            <button type="button" onClick={this.executeThirdScroll} className="btn btn-outline-secondary">NEXT</button>
                       </div>
                       <div className="questions-question" ref={this.thirdRef}>
                            <div><Question4 id={id}/></div>
                            <button type="button" onClick={this.executeFourthScroll} className="btn btn-outline-secondary">NEXT</button>
                       </div>
                       <div className="questions-question" ref={this.fourthRef}>
                            <div><Question5 id={id}/></div>
                            <button type="button" onClick={this._clicked} className="btn btn-outline-secondary">FINISH</button>
                       </div>
                </div>
            </div>
        );
        
    }

}

export default withRouter(Questions);
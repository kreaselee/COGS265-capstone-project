import React, {Component} from 'react';
import "./Home.css";
import {withRouter} from "react-router";

class Home extends Component {

    _clicked(){
        // change the url to match the url for Home Route
        window.location.href = `/instructions`;
    }

    render(){
        return(
            <div className="home">
                <div className="home-body">
                    <div>
                        <h1>Welcome</h1>
                        <button onClick={this._clicked} class="btn btn-outline-secondary">ENTER</button>
                    </div>
                </div>
            </div>
        );
        
    }

}

export default withRouter(Home);
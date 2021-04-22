import React, { Component } from 'react';
import "./ShapeDisplay.css";
import {withRouter} from "react-router";
import {Layer, Line, Rect, RegularPolygon, Stage} from 'react-konva';

class ShapeDisplay extends Component {

    constructor(){
        super();
        this.state = {
            shapeComponent: undefined,
            positioned: undefined,
            setX: 0,
            setY: 0
        }
        this._setPosition = this._setPosition.bind(this);
        this._finish = this._finish.bind(this);
    }

    componentDidMount(){
        const id = this.props.match.params.id;

        fetch(`http://localhost:5000/display/${id}`) 
        .then(response => response.json())
        .then(result => {
            console.log(result[0]);

            const ShapeComponent = result.map(shape => {
                console.log(shape.shape);

                let created = undefined;

                if (shape.shape === "rectangle") {
                    if (shape.positioned === true) {
                        created = <Rect key={id} x={shape.x} y={shape.y} width={shape.width} height={shape.height} 
                            fill={shape.color} opacity={shape.opacity} draggable={false}/>
                    }
                    else {
                        created = <Rect key={id} x={shape.x+20} y={shape.y+20} width={shape.width} height={shape.height} 
                            fill={shape.color} opacity={shape.opacity} draggable={true} 
                            onDragEnd={(e) => this._setPosition(e)}/>
                    }
                }
                else if (shape.shape === "triangle") {
                    if (shape.positioned === true) {
                        created = <RegularPolygon key={id} x={shape.x} y={shape.y} sides={3} radius={shape.width/1.5} 
                            fill={shape.color} opacity={shape.opacity} draggable={false}/>
                    }
                    else {
                        created = <RegularPolygon key={id} x={shape.x+150} y={shape.y+150} sides={3} radius={shape.width/1.5} 
                            fill={shape.color} opacity={shape.opacity} draggable={true}
                            onDragEnd={(e) => this._setPosition(e)}/>
                    }
                }
                else if (shape.shape === "hline") {
                    if (shape.positioned === true) {
                        created = <Line key={id} points={[shape.x, shape.y, shape.x+shape.width*2, shape.y]} 
                            stroke={shape.color} strokeWidth={2} opacity={shape.opacity} draggable={false}/>
                    }
                    else {
                        created = <Line key={id} points={[shape.x+20, shape.y+20, shape.x+20+shape.width*2, shape.y+20]} 
                            stroke={shape.color} strokeWidth={2} opacity={shape.opacity} draggable={true}
                            onDragEnd={(e) => this._setPosition(e)}/>
                    }
                }
                else if (shape.shape === "vline") {
                    if (shape.positioned === true) {
                        created = <Line key={id} points={[shape.x, shape.y, shape.x, shape.y+shape.height*2]} 
                            stroke={shape.color} strokeWidth={2} opacity={shape.opacity} draggable={false}/>
                    }
                    else {
                        created = <Line key={id} points={[shape.x+20, shape.y+20, shape.x+20, shape.y+20+shape.height*2]} 
                            stroke={shape.color} strokeWidth={2} opacity={shape.opacity} draggable={true}
                            onDragEnd={(e) => this._setPosition(e)}/>
                    }
                }

                return created;
            })

            this.setState({
                shapeComponent: ShapeComponent,
                positioned: result[0].positioned
            });
        })
    }

    _setPosition(e) {
        console.log(e.target.x());
        console.log(e.target.y());

        const id = this.props.match.params.id;

        let url = `http://localhost:5000/create/${id}/updatePosition`;
        let x = e.target.x();
        let y = e.target.y();

        const message = {
            positioned: false,
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
            this.setState({
                setX: e.target.x(),
                setY: e.target.y()
            })
        })
        .catch()
    }

    _finish() {
        window.location.href = `/canvas`;
    }

    render(){
        
        console.log(this.state.positioned)
        
        return(
            <div className="shape-display">
                <div className="canvas-body">
                    <div className="canvas-header">
                        {(this.state.positioned === false) ?
                            <div id="header-freedom">
                                <h2>Below you will find your shape.</h2><br></br>
                                <h5>For the last question, you chose freedom as your answer.</h5>
                                <h5>Thus, you will be given the chance to choose where on the canvas you would like to place your shape.</h5>
                                <h5>To do so, simply click and drag the shape to your desired position.</h5>
                                <h5>When you are satisfied, click the button below to set your shape and see the finished piece.</h5><br></br>
                                <button onClick={this._finish} className="btn btn-outline-secondary">FINISH</button>
                            </div> : 
                                <div id="header-structure">
                                    <h2>Below you will find your shape.</h2><br></br>
                                    <h5>For the last question, you chose structure as your answer.</h5>
                                    <h5>Thus, the position of your shape on the canvas has been predetermined for you.</h5>
                                    <h5>When you are ready, click the button below to set your shape and see the finished piece.</h5><br></br>
                                    <button onClick={this._finish} className="btn btn-outline-secondary">FINISH</button>
                                </div> 
                        }
                    </div>
                    <div className="canvas-stage">
                        {(this.state.shapeComponent === undefined) ?
                            "" :
                            <div className="shape">
                                <Stage width={1300} height={700} fill="white">
                                    <Layer>
                                        <Rect width={1300} height={700} fill="white" opacity={0.7}/>
                                        <Rect x={500} y={20} width={150} height={150} fill="blue"
                                            draggable={true} onDragEnd={(e) => this._setPosition(e)}/>
                                        <RegularPolygon x={150} y={150} sides={3} radius={100} 
                                            fill="blue" draggable={false}/>
                                        <Line points={[20, 20, 320, 20]} 
                                            stroke="black" draggable={true}/>
                                        {this.state.shapeComponent}
                                    </Layer>
                                </Stage> 
                            </div>
                        }
                    </div>
               </div>
            </div>
        );
    }
}

export default withRouter(ShapeDisplay);
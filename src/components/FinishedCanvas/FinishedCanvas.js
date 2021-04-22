import React, { Component } from 'react';
import "./FinishedCanvas.css";
import {withRouter} from "react-router";
import {Layer, Line, Rect, RegularPolygon, Stage} from 'react-konva';

class FinishedCanvas extends Component {

    constructor(){
        super();
        this.state = {
            shapeComponent: undefined,
        }
        this._backHome = this._backHome.bind(this);
    }

    componentDidMount(){
        fetch(`http://localhost:5000/canvas`) 
        .then(response => response.json())
        .then(result => {
            console.log(result);

            const ShapeComponent = result.map(shape => {
                console.log(shape.shape);

                let created = undefined;

                // finish these later
                const id = shape._id;
                const opacity = shape.opacity;
                const width = shape.width;
                const height = shape.height;
                const x = shape.x;
                const y = shape.y;

                if (shape.complete === true) {
                    if (shape.shape === "rectangle") {
                        created = <Rect key={id} x={shape.x} y={shape.y} width={shape.width} height={shape.height} 
                            fill={shape.color} opacity={opacity} draggable={false}/>
                    }
                    else if (shape.shape === "triangle") {
                        created = <RegularPolygon key={id} x={shape.x} y={shape.y} sides={3} radius={shape.width/1.5} 
                            fill={shape.color} opacity={opacity} draggable={false}/>
                    }
                    else if (shape.shape === "hline") {
                        created = <Line key={id} points={[shape.x, shape.y, shape.x+shape.width*2, shape.y]} 
                            stroke={shape.color} strokeWidth={2} opacity={opacity} draggable={false}/>
                    }
                    else if (shape.shape === "vline") {
                        created = <Line key={id} points={[shape.x, shape.y, shape.x, shape.y+shape.height*2]} 
                            stroke={shape.color} strokeWidth={2} opacity={opacity} draggable={false}/>
                    }
                }
                

                return created;
            })

            this.setState({
                shapeComponent: ShapeComponent
            });
        })
    }

    _backHome() {
        window.location.href = `/`;
    }

    _refresh() {
        window.location.reload();
    }

    render(){
        return(
            <div className="finished-canvas">
                <div className="canvas-body">
                    <div className="canvas-header">
                        <h2>Below you will find the finished canvas.</h2><br></br>
                        <h5>Feel free to view it for however long you please.</h5>
                        <h5>As this is a dynamic canvas, if desired, you may refresh to view an updated canvas.</h5>
                        <h5>When you are ready, click the home button below to return home or simply exit.</h5><br></br>
                        <div className="header-buttons">
                            <button onClick={this._refresh} className="btn btn-outline-secondary">REFRESH</button>
                            <button onClick={this._backHome} className="btn btn-outline-secondary">BACK HOME</button>
                        </div>
                    </div>
                    <div className="canvas-stage">
                        {(this.state.shapeComponent === undefined) ?
                            "" :
                            <div className="shape">
                                <Stage width={1300} height={700} fill="white">
                                    <Layer>
                                        <Rect width={1300} height={700} fill="white" opacity={0.7}/>
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

export default withRouter(FinishedCanvas);
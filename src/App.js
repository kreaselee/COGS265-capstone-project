import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Home from "./components/Home/Home"
import Instructions from "./components/Instructions/Instructions"
import Questions from "./components/Questions/Questions"
import ShapeDisplay from './components/ShapeDisplay/ShapeDisplay';
import FinishedCanvas from './components/FinishedCanvas/FinishedCanvas';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path ="/instructions">
            <Instructions/>
          </Route>
          <Route exact path ="/create/:id">
            <Questions/>
          </Route>
          <Route exact path ="/display/:id">
            <ShapeDisplay/>
          </Route>
          <Route exact path ="/canvas">
            <FinishedCanvas/>
          </Route>
          <Route exact path ="/">
            <Home/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

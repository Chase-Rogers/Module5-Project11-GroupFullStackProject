import React from 'react';
import {Link, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import ChangeHolder from './components/changeItems/ChangeHolder'

function App() {
  return (
    <div className="App flex-col">
      <h1>Burger Joint Ordering Application</h1>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/changeItem">
          <ChangeHolder />
        </Route>
      </Switch>
      <div className="btnHolder">
        <Link className="btn" to="/">Home</Link>
        <Link className="btn" to="/changeItem">Manager View: Add, Change or Delete Item</Link>
      </div>
    </div>
  );
}

export default App;

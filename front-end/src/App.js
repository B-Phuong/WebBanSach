import React from 'react';
import './App.css';
import Home from './containers/Home';
import Book from './containers/Book';
import BookDetail from './containers/BookDetail/detail';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <PrivateRoute path="/" exact component={Home} /> */}
          <Route path="/" exact component={Book} />
          <Route path="/book/:id" component={BookDetail} />
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

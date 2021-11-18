import React, { useEffect } from 'react';
import './App.css';
import Home from './containers/Home';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions';
import { Sach } from './containers/Sach';
import Donhang from './containers/Donhang';
import Book from './containers/Book';
import BookDetail from './containers/BookDetail/detail';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, []);
  return (
    <div className="App">

      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/orders" component={Donhang} />
        <Route path="/book/:id" component={BookDetail} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
      </Switch>

    </div>
  );
}

export default App;

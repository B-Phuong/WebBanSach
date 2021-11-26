import React, { useEffect } from 'react';
import './App.css';
import Home from './containers/Home';

import Signin from './containers/Signin';
import Signup from './containers/Signup';
import PrivateRoute from './components/HOC/PrivateRoute';
import { Route, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from './actions';

import Book from './containers/Book';
import BookDetail from './containers/BookDetail/detail';
import BookControl from './containers/Admin/BookControl/bookcontrol';
import BookList from './containers/Admin/BookControl/listbook';
import BookEdit from './containers/Admin/BookControl/editbook';
import BookAdd from './containers/Admin/BookControl/addbook';
import BookByGenres from './containers/Book/bookbygenres';
import User from './containers/User/user';
import UserInfo from './containers/User/userinfo';

import Donhang from './containers/Donhang/';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
  }, [auth.authenticate]);


  return (
    <div className="App">

      <Switch>
        <Route path="/" exact component={Book} />
        <Route path="/book/:id" component={BookDetail} />
        <Route path="/user/:id" exact component={UserInfo} />


        <PrivateRoute path="/admin" exact component={Home} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/admin/book/:id/edit" component={BookEdit} />
        <PrivateRoute path="/admin/book/add" component={BookAdd} />
        <PrivateRoute path="/admin/book/all" component={BookList} />
        <PrivateRoute path="/admin/book" component={BookControl} />
       
        <PrivateRoute path="/admin/orders" component={Donhang}/>
        <Route path="/:theLoai" component={BookByGenres} />
      </Switch>
    </div>
  );
}

export default App;

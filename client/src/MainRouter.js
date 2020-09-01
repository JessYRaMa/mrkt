import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Menu from './core/Menu'
import Signup from './user/Signup';
import Signin from './user/Signin';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import FindPeople from './user/FindPeople';
import PrivateRoute from './auth/PrivateRoute';
import NewPost from './post/NewPost';
import SinglePost from './post/SinglePost';
import EditPost from './post/EditPost';
import Cart from './post/Cart';
import Appy from './post/Chat';


const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path = "/allposts" component = {Home}></Route>
            <PrivateRoute exact path = "/post/create" component = {NewPost}></PrivateRoute>
            <Route exact path = "/post/:postId" component = {SinglePost}></Route>
            <PrivateRoute exact path = "/post/edit/:postId" component = {EditPost}></PrivateRoute>
            <Route exact path = "/users" component = {Users}></Route>
            <Route exact path = "/signup" component = {Signup}></Route>
            <Route exact path = "/" component = {Signin}></Route>
            <PrivateRoute exact path = "/user/:userId" component = {Profile}></PrivateRoute>
            <PrivateRoute exact path = "/user/edit/:userId" component = {EditProfile}></PrivateRoute>
            <PrivateRoute exact path = "/findpeople" component = {FindPeople}></PrivateRoute>
            <PrivateRoute exact path = "/cart" component = {Cart}></PrivateRoute>
            <PrivateRoute exact path = "/chat" component = {Appy}></PrivateRoute>
        </Switch>
    </div>
)

export default MainRouter;
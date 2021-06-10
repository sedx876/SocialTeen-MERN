import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Menu from './core/Menu'
import Footer from './core/Footer'
import Home from './core/Home'
import TOS from './core/TOS'
import Links from './core/Links'
import Signup from './user/Signup'
import Signin from './user/Signin'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import PrivateRoute from './auth/PrivateRoute'
import Users from './user/Users'
import NewPost from "./post/NewPost"
import Posts from './post/Posts'
import EditPost from "./post/EditPost"
import SinglePost from "./post/SinglePost"
import FindPeople from "./user/FindPeople"
import ForgotPassword from "./user/ForgotPassword"
import ResetPassword from "./user/ResetPassword"


const MainRouter = () => {
  return (
    <div>
			<Menu/>
			<Switch>
				<Route exact path='/' component={Home}/>
				<Route path='/TOS' component={TOS}/>
				<Route path='/links' component={Links}/>
				<Route path='/signup' component={Signup}/>
				<Route path='/signin' component={Signin}/>
				<PrivateRoute exact path='/user/:userId' component={Profile}/>
				<PrivateRoute exact path='/user/edit/:userId' component={EditProfile}/>
				<PrivateRoute exact path="/post/create" component={NewPost} />
				<Route exact path='/users' component={Users}/>
				<Route path='/posts' component={Posts}/>
				<PrivateRoute exact path="/post/edit/:postId" component={EditPost}/>
				<Route exact path="/post/:postId" component={SinglePost} />
				<PrivateRoute exact path="/findpeople" component={FindPeople} />
				<Route exact path="/forgot-password" component={ForgotPassword} />
				<Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword}/>
			</Switch>
			<Footer/>
    </div>
    )
}

export default MainRouter
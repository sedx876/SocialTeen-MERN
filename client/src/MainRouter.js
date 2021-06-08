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
import PrivateRoute from './auth/PrivateRoute'


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
			</Switch>
			<Footer/>
    </div>
    )
}

export default MainRouter
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {signup} from '../auth/index'

class Signup extends Component{

	constructor(){
		super()
		this.state = {
			name: '',
			email: '',
			password: '',
			error: '',
			open: false
		}
	}

	clickSubmit = event => {
		event.preventDefault()
		const { name, email, password } = this.state
		const user = {
			name,
			email,
			password
		}
		signup(user)
			.then(data => {
				if(data.error) this.setState({ error: data.error })
				else this.setState({
					error: '',
					name: '',
					email: '',
					password: '',
					open: true
				})
			})
	}

	handleChange = name => event => {
		this.setState({ error: '' })
		this.setState({ [name]: event.target.value })
	}

	signupForm = (name, email, password) => (
		<div className="auth-card col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4 pink lighten-1">
    <form className="col s12">
      <div>
        <div className="input-field col s6">
          <i className="material-icons prefix">account_circle</i>
          <input id="icon_prefix" 
						onChange={this.handleChange('name')} 
						type='text' 
						className='validate'
						value={name}
					/>
          <label for="icon_prefix">UserName</label>
        </div>
				<div className="input-field col s6">
          <i className="material-icons prefix">email</i>
          <input id="icon_prefix" 
						onChange={this.handleChange('email')} 
						type='text' 
						className='validate'
						value={email}
					/>
          <label for="icon_prefix">Email</label>
        </div>
				<div className="input-field col s6">
          <i className="material-icons prefix">priority_high</i>
          <input id="icon_prefix" 
						onChange={this.handleChange('password')} 
						type='password' 
						className='validate'
						value={password}/>
          <label for="icon_password">Password</label>
        </div>
      </div>
			<button onClick={this.clickSubmit} 
        className='btn waves-effect waves-light pink lighten-4 black-text center pulse'>Register</button>
    </form>
  </div>
	)

	render(){
		const { name, email, password, error, open } = this.state 
		return(
			<div>
				<h2 className='center'>SignUp</h2>
				<div 
        	className='alert alert-danger'
        	style={{ display: error ? '' : 'none'}}>
          {error}
      	</div>
				<div 
        	className='alert alert-info'
        	style={{ display: open ? '' : 'none'}}>
          NEW ACCOUNT WAS SUCCESSFULLY CREATED!! PLEASE <Link to='/signin'>Log In</Link>
      </div>
				{this.signupForm(name, email, password)}
			</div>
		)
	}
}

export default Signup
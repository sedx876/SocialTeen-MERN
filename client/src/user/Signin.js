import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom"
import { signin, authenticate } from "../auth"

class Signin extends Component{
	constructor(){
		super()
		this.state = {
			email: '',
      password: '',
      error: '',
      redirectToReferer: false,
      loading: false
		}
	}

	clickSubmit = event => {
    event.preventDefault()
    this.setState({loading: true})
    const { email, password } = this.state
    const user = {
      email,
      password
    }
    console.table(user)
    signin(user)
    .then(data => {
      if(data.error) {
        this.setState({ error: data.error, loading: false })
      }else{ 
        authenticate(data, () => {
          this.setState({ redirectToReferer: true })
        })
      }
    })
  }

	handleChange = name => event => {
    this.setState({ error: "" })
    this.setState({ [name]: event.target.value })
  }

	signinForm = (email, password) => (
		<div className="auth-card col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4 pink lighten-1">
			<form>
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
				<button onClick={this.clickSubmit} 
        	className='btn waves-effect waves-light pink lighten-4 black-text center pulse'>
					Log In
				</button>
		</form>
		</div>
	)

	render(){
		const { email, password, error, redirectToReferer, loading } = this.state
    if (redirectToReferer) {
      return <Redirect to="/TOS" />;
    }
    return(
      <div className='container'>
        <h2 className='center'>LogIn</h2>
      <div 
        className='alert alert-danger'
        style={{ display: error ? '' : 'none'}}>
          {error}
      </div>
      {loading ? (
      <div className='jumbotron text-center'><h2>Loading...</h2></div>
      ):(
        ''
      )}
        {this.signinForm(email, password)}
        <p className='center'>
          <Link to="/forgot-password" className="center">
            {" "}
            Forgot Password
          </Link>
        </p>
      </div>
    )
	}
}

export default Signin
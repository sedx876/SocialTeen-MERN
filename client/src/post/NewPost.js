import React, { Component } from "react"
import { isAuthenticated } from "../auth"
import { create } from "./apiPost"
import { Redirect } from "react-router-dom"

class NewPost extends Component{
	constructor() {
    super()
    this.state = {
      title: "",
      body: "",
      photo: "",
      error: "",
      user: {},
      fileSize: 0,
      loading: false,
      redirectToProfile: false
    }
  }

	componentDidMount(){
		this.postData = new FormData()
		this.setState({ user: isAuthenticated().user })
	}

	isValid = () => {
    const { title, body, fileSize } = this.state
    if (fileSize > 100000) {
      this.setState({
        error: "File size should be less than 100kb",
        loading: false
      })
        return false
      }
    if (title.length === 0 || body.length === 0) {
      this.setState({ error: "All fields are required", loading: false })
      return false
    }
      return true
  }

	handleChange = name => event => {
    this.setState({ error: "" })
    const value =
    name === "photo" ? event.target.files[0] : event.target.value
    const fileSize = name === "photo" ? event.target.files[0].size : 0
    this.postData.set(name, value)
    this.setState({ [name]: value, fileSize })
  }

	clickSubmit = event => {
    event.preventDefault()
    this.setState({ loading: true })
      if (this.isValid()) {
        const userId = isAuthenticated().user._id
        const token = isAuthenticated().token
        create(userId, token, this.postData).then(data => {
      if (data.error) this.setState({ error: data.error })
        else {
          this.setState({
          loading: false,
          title: "",
          body: "",
          redirectToProfile: true
      })
    }
  })
  }
  }

	newPostForm = (title, body) => (
		<form>

			<div class="file-field input-field">
      	<div class="btn waves-effect waves-light pink lighten-4 black-text center">
        	<span>Select File to Upload</span>
        	<input 
						onChange={this.handleChange("photo")}
          	type="file"
          	accept="image/*"/>
      	</div>
      	<div class="file-path-wrapper">
        	<input class="file-path validate" type="text"/>
      	</div>
    	</div>

		<div class="row">
        <div class="input-field col s12">
          <textarea id="textarea1" 
						class="materialize-textarea"
						onChange={this.handleChange("title")}
          	type="text"
          	value={title}></textarea>
          <label className='black-text' for="textarea1">Title</label>
        </div>
    </div>

		<div class="row">
        <div class="input-field col s12">
          <textarea 
						id="textarea1" 
						class="materialize-textarea"
						onChange={this.handleChange("body")}
          	type="text"
          	value={body}></textarea>
          <label className='black-text' for="textarea1">Body</label>
        </div>
    </div>
    
		<div className='center'>
		<button onClick={this.clickSubmit} 
			style={{ margin: '5px'}}
      className='btn waves-effect waves-light pink lighten-4 black-text center'>
        Submit Post
    </button>
		</div>
		
		</form>
	)



	render() {
    const {
      title,
      body,
      photo,
      user,
      error,
      loading,
      redirectToProfile
    } = this.state

      if (redirectToProfile) {
        return <Redirect to={`/user/${user._id}`} />
      }
      return (
        <div>
          <h2 className="darkPink center">Create a New Post</h2>
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
        </div>
          {loading ? (
              <div className="jumbotron text-center">
                <h2>Loading...</h2>
              </div>
            ) : (
              ""
            )}
              {this.newPostForm(title, body)}
        </div>
      )
  }
}

export default NewPost
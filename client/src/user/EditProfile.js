import React, { Component } from "react"
import { isAuthenticated } from "../auth"
import { read, update, updateUser } from "./apiUser"
import { Redirect } from "react-router-dom"
import DefaultProfile from "../images/avatar.jpg"

class EditProfile extends Component {
    constructor() {
      super();
      this.state = {
        id: "",
        name: "",
        email: "",
        password: "",
        redirectToProfile: false,
        error: "",
        fileSize: 0,
        loading: false,
        about: ""
      }
    }
  
    init = userId => {
      const token = isAuthenticated().token;
      read(userId, token).then(data => {
        if (data.error) {
          this.setState({ redirectToProfile: true })
        } else {
          this.setState({
            id: data._id,
            name: data.name,
            email: data.email,
            error: "",
            about: data.about
          })
        }
      })
    }
  
    componentDidMount() {
      this.userData = new FormData()
      const userId = this.props.match.params.userId
      this.init(userId)
    }
  
    isValid = () => {
      const { name, email, password, fileSize } = this.state
      if (fileSize > 1000000) {
        this.setState({
          error: "File size should be less than 100kb",
          loading: false
        })
        return false
      }
      if (name.length === 0) {
        this.setState({ error: "Name is required", loading: false })
        return false
      }
      // email@domain.com
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        this.setState({
          error: "A valid Email is required",
          loading: false
        })
        return false
      }
      if (password.length >= 1 && password.length <= 5) {
        this.setState({
          error: "Password must be at least 6 characters long",
          loading: false
        });
        return false
      }
      return true
    }
  
    handleChange = name => event => {
      this.setState({ error: "" })
      const value = name === "photo" ? event.target.files[0] : event.target.value
      const fileSize = name === "photo" ? event.target.files[0].size : 0
      this.userData.set(name, value)
      this.setState({ [name]: value, fileSize })
    }
  
    clickSubmit = event => {
      event.preventDefault()
      this.setState({ loading: true })
      if (this.isValid()) {
        const userId = this.props.match.params.userId
        const token = isAuthenticated().token
        update(userId, token, this.userData).then(data => {
          if (data.error) {
            this.setState({ error: data.error })
          } else if (isAuthenticated().user.role === "admin") {
            this.setState({
              redirectToProfile: true
            })
          } else {
            updateUser(data, () => {
              this.setState({
                redirectToProfile: true
              })
            })
          }
        })
      }
    }
  
    editForm = (name, email, password, about) => (
        <>
      <form class="col s12">

       <div class="file-field input-field">
        <div class="btn waves-effect waves-light pink lighten-4 black-text center">
        <span>File</span>
        <input onChange={this.handleChange("photo")}
            type="file"
            accept="image/*"
            className="form-control"/>
        </div>
        <div class="file-path-wrapper">
        <input class="file-path validate" type="text"/>
      </div>
     </div>
  
        <div className="input-field col s6 center">
          
          <input
            onChange={this.handleChange("name")}
            type="text"
            className="validate"
            value={name}
          />
					{/* <label id="name" className="black-text">Name</label> */}
        </div>
  
        <div className="input-field col s6">
          {/* <label className="black-text">Email</label> */}
          <input
            onChange={this.handleChange("email")}
            type="email"
            className="validate"
            value={email}
          />
        </div>
  
        <div className="form-group">
          <label className="black-text">About</label>
          <textarea
            onChange={this.handleChange("about")}
            type="text"
            className="validate"
            value={about}
          />
        </div>
  
        <div className="input-field col s6">
          <label className="black-text">Password</label>
          <input
            onChange={this.handleChange("password")}
            type="password"
            className="validate"
            value={password}
          />
        </div>
  
      </form>
      <button onClick={this.clickSubmit} 
      className='btn waves-effect waves-light pink lighten-4 black-text center'>
        Update Profile
    </button>
    </>
    )
  
    render(){
      const {
        id,
        name,
        email,
        password,
        redirectToProfile,
        error,
        loading,
        about
      } = this.state
  
      if (redirectToProfile) {
        return <Redirect to={`/user/${id}`} />;
      }
  
      const photoUrl = id
        ? `${
            process.env.REACT_APP_API_URL
          }/user/photo/${id}?${new Date().getTime()}`
        : DefaultProfile
  
      return(
      <div className='container'>
        <h2 className='black-text center'>
          <strong>Update Profile</strong>
        </h2>
  
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
  
          <img
            style={{ height: "200px", width: "auto" }}
            className="img-thumbnail"
            src={photoUrl}
            onError={i => (i.target.src = `${DefaultProfile}`)}
            alt={name}
          />
  
          {isAuthenticated().user.role === "admin" &&
            this.editForm(name, email, password, about)}
  
          
      </div>
      )
    }
  }
  
  export default EditProfile
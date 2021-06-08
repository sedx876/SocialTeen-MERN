import React, { Component } from "react"
import { isAuthenticated } from "../auth"
import { Redirect, Link } from "react-router-dom"
import { read } from "./apiUser"
import { listByUser } from "../post/apiPost"
import DefaultProfile from "../images/avatar.jpg"

class Profile extends Component{
	constructor() {
    super();
    this.state = {
      user: { following: [], followers: [] },
      redirectToSignin: false,
      following: false,
      error: "",
      posts: []
    }
  }

	checkFollow = user => {
    const jwt = isAuthenticated()
    const match = user.followers.find(follower => {
    // one id has many other ids (followers) and vice versa
    return follower._id === jwt.user._id
  })
    return match
  }

	init = userId => {
    const token = isAuthenticated().token
    read(userId, token).then(data => {
    if (data.error) {
      this.setState({ redirectToSignin: true })
    } else {
      let following = this.checkFollow(data)
      this.setState({ user: data, following })
      this.loadPosts(data._id)
    }
  })
  }

	loadPosts = userId => {
    const token = isAuthenticated().token
    listByUser(userId, token).then(data => {
    if (data.error) {
      console.log(data.error)
    } else {
      this.setState({ posts: data })
    }
  })
  }

	componentDidMount() {
    const userId = this.props.match.params.userId
    this.init(userId)
  }

  UNSAFE_componentWillReceiveProps(props) {
    const userId = props.match.params.userId
    this.init(userId)
  }

	render(){
		const { redirectToSignin, user, posts } = this.state
		return(
			<div>
				<h4 className='center'>
					{`${isAuthenticated().user.name} Profile`}
				</h4>
				<div className='profile-card'>
    			<div className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4 pink lighten-2">
      			<div className="card large pink lighten-1">
        			<div className="card-image center">
							<p className='center'><strong>Hello {user.name}</strong></p>
          			<img src={DefaultProfile}/>
        			</div>
        	<div className="card-content center">
					<p className='pt-3'><strong>Email:</strong> {user.email}</p>
        	<p>
          	<strong>Joined: </strong> 
          	{`${new Date(user.created).toDateString()}`}
        	</p>
					<p className="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4 pink lighten-2"
                style={{width: '30rem'}}>
                <h5 style={{textDecoration: 'underline'}}><strong>About Me:</strong></h5>
                <strong>{user.about}</strong></p>
        	</div>
        <div className="card-action center">
				<Link
    			className='btn waves-effect waves-light pink lighten-4 black-text center'
    			to={`/user/edit/${user._id}`}
  			>
    		Edit Profile
  			</Link>
        </div>
      </div>
    </div>
  </div>

	
	</div>
		)
	}
}

export default Profile
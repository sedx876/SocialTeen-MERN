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
		if (redirectToSignin) return <Redirect to="/signin" />
    const photoUrl = user._id
      ? `${process.env.REACT_APP_API_URL}/user/photo/${
          user._id
        }?${new Date().getTime()}`
      : DefaultProfile
		return(
			<>
				<div>
				<h4 className='center'>
					{`${isAuthenticated().user.name} Profile`}
				</h4>
				<div className='profile-card'>
    			<div className="profile-card col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4 pink lighten-1">
      			<div className="card large pink lighten-1">
        			<div className="card-image center">
							<p className='center'><strong>Hello {user.name}</strong></p>
							<img
          			style={{ height: "auto", maxWidth: "100%" }}
          			className="img-thumbnail center-align responsive-img"
          			src={photoUrl}
          			onError={i => (i.target.src = `${DefaultProfile}`)}
          			alt={user.name}
        			/>
        			</div>
        	<div className="card-content center">
					<p className='pt-3'><strong>Email:</strong> {user.email}</p>
        	<p>
          	<strong>Joined: </strong> 
          	{`${new Date(user.created).toDateString()}`}
        	</p>
					
					<div className="col hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4 pink lighten-1">
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
		{isAuthenticated().user &&
					<div>
    <div class="col about-card hoverable">
      <div class="card pink lighten-1">
        <div class="card-content black-text">
          <span class="card-title about-cardTitle">About Me:</span>
          <p>
						<strong>{user.about}</strong>
					</p>
        </div>
        
      </div>
    </div>
  </div>
					}
  </div>

	
	</div>
			</>
			
		)
	}
}

export default Profile
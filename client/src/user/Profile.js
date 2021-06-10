import React, { Component } from "react"
import { isAuthenticated } from "../auth"
import { Redirect, Link } from "react-router-dom"
import { read } from "./apiUser"
import DefaultProfile from "../images/avatar.jpg"
import DeleteUser from "./DeleteUser"
import FollowProfileButton from "./FollowProfileButton"
import ProfileTabs from "./ProfileTabs"
import { listByUser } from "../post/apiPost"

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

	// check follow
  checkFollow = user => {
    const jwt = isAuthenticated()
    const match = user.followers.find(follower => {
    // one id has many other ids (followers) and vice versa
    return follower._id === jwt.user._id
  })
    return match
  }

  clickFollowButton = callApi => {
    const userId = isAuthenticated().user._id
    const token = isAuthenticated().token
    callApi(userId, token, this.state.user._id).then(data => {
      if (data.error) {
        this.setState({ error: data.error })
      } else {
        this.setState({ user: data, following: !this.state.following })
    }
  })
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
					<div className='center'>
						<h4 className=' darkPink center'>
							{`${user.name} Profile`}
						</h4>
						<div class="profile-card center">
    					<div class="col card hoverable pink lighten-2">
      					<div class="center large col card hoverable  pink lighten-2">
								<span className="center darkPink">
									Hello {user.name}
								</span>
        					<div>
									<img
          					style={{ height: "400px", maxWidth: "400px" }}
          					className="responsive-img center"
          					src={photoUrl}
          					onError={i => (i.target.src = `${DefaultProfile}`)}
          					alt={user.name}
        					/>
        					</div>
        				<div class="card-content">
          			<p></p>
        			</div>
        		<div class="card-action">
						<p className='darkPink'><strong>Email:</strong> {user.email}</p>
							<p className='darkPink'>
								<strong>Joined: </strong> 
								{`${new Date(user.created).toDateString()}`}
							</p>
        		</div>
      		</div>
    		</div>

				<div class="col about-card hoverable pink lighten-2">
      		<div class="card pink lighten-2">
        		<div class="card-content darkPink">
          		<span class="card-title about-cardTitle">About Me:</span>
          		<p>
								<strong>{user.about}</strong>
							</p>
        		</div>
      		</div>
    		</div>

  		</div>

			<div className='center'>
				{isAuthenticated().user &&
					isAuthenticated().user._id === user._id ? (
						<div style={{margin: '10px'}}>
							<Link
                className="btn waves-effect waves-light pink lighten-4 darkPink center"
                to={`/post/create`}
              >
                Create Post
              </Link>

							<DeleteUser userId={user._id} />

							<Link
                  className="btn waves-effect waves-light pink lighten-4 darkPink center"
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>

						</div>
					): (
						<FollowProfileButton
							following={this.state.following}
							onButtonClick={this.clickFollowButton}
						/>)}

				<div className='col-md-6'>
          {isAuthenticated().user && 
          isAuthenticated().user.role === "admin" && (
            <div class="col card hoverable s10 pull-s1 m6 pull-m3 l4 pull-l4 pink lighten-2">
              <div className="card-body">
                <h5 className="card-title darkPink">Admin</h5>
                <p className="darkPink">
                  Edit/Delete as an Admin
                </p>
                <Link
								style={{margin: '10px'}}
                  className="btn waves-effect waves-light pink lighten-4 darkPink center"
                  to={`/user/edit/${user._id}`}
                >
                  Edit Profile
                </Link>
                <DeleteUser />
              </div>
            </div>
            )}
        </div>

				<div class="center">
    			<div class="col s12 m6 center">
      			<div class="card hoverable center  pink lighten-2">
        			<div class="card-content center">
							<ProfileTabs
              followers={user.followers}
              following={user.following}
              posts={posts}
            	/>
        		</div>
      	</div>
    	</div>
  	</div>

				</div>

			</div>
			</>
		)
		
	
	}
}

export default Profile
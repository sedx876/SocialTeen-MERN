import React, { Component } from "react"
import { list } from "./apiPost"
import DefaultPost from "../images/gaycat.png"
import { Link } from "react-router-dom"

class Posts extends Component{
	constructor() {
    super();
    this.state = {
      posts: [],
      page: 1
    }
  }

	loadPosts = page => {
    list(page).then(data => {
    if (data.error) {
      console.log(data.error)
    } else {
      this.setState({ posts: data })
    }
  })
  }

	componentDidMount() {
    this.loadPosts(this.state.page)
  }

  loadMore = number => {
    this.setState({ page: this.state.page + number })
    this.loadPosts(this.state.page + number)
  }

  loadLess = number => {
    this.setState({ page: this.state.page - number })
    this.loadPosts(this.state.page - number)
  }

	renderPosts = posts => {
    return (
			<div>
				{posts.map((post, i) => {

					const posterId = post.postedBy
					? `/user/${post.postedBy._id}` : ''

					const posterName =post.postedBy
					? post.postedBy.name : ' Unknown'

					return(
						<div class="hoverable card pink lighten-1 member-card">
						<div class="card-content">
							<div className="card-image center">
							<img
                src={`${
                	process.env.REACT_APP_API_URL
                }/post/photo/${post._id}`}
			 					alt={post.title}
			 					onError={i =>
                  (i.target.src = `${DefaultPost}`)
                }
                className="responsive-img center"
                style={{ height: "100%", maxWidth: "100%" }}
              />
							<div className="card-body">
							<h6 className="darkPink">{post.title}</h6>
							<p className="card-text">
                {post.body.substring(0, 100)}...
              </p>
							<br/>
							<p>
                Posted by{" "}
                <Link to={`${posterId}`}
								className='black-text'>
                  {posterName}{" "}
                </Link>
                  on {new Date(post.created).toDateString()}
              </p>
							<Link
                to={`/post/${post._id}`}
                className="btn waves-effect waves-light pink lighten-4 darkPink center"
              >
                Read more
              </Link>
         
       		</div>
							</div>
							
				</div>
			</div>
					)
				})}
			</div>

        )
    }

	render(){
		const { posts, page } = this.state;
      return (
        <div className="center">
          <h2 className="darkPink center">
            {!posts.length ? 
            "You have reached the end of the posts!!" 
            : 
            <h3 className='darkPink center'>
              <strong>Recent Posts</strong>
            </h3>}
          </h2>
            {this.renderPosts(posts)}
              {page > 1 ? (
              <button
							style={{margin: '10px'}}
                className="btn waves-effect waves-light pink lighten-4 darkPink center"
                onClick={() => this.loadLess(1)}
              >
                Previous ({this.state.page - 1})
              </button>
              ) : (
                ""
              )}
                {posts.length ? (
                  <button
									style={{margin: '10px'}}
                    className="btn waves-effect waves-light pink lighten-4 darkPink center"
                    onClick={() => this.loadMore(1)}
                  >
                    Next ({page + 1})
                  </button>
                ) : (
                  ""
              )}
          </div>
        )
	}
}

export default Posts 
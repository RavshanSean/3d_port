import React from 'react'
import { Link } from 'react-router-dom'

const BlogPosts = (props) => {
  return (
    <>
      <div className='body'>
        <div className='box'>
          <h2>Blog</h2>
          <ul>
            {props.blogPosts.map((post) => (
              <li key={post._id} >
                <Link to={`/posts/${post._id}`} >{post.title}</Link>

              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default BlogPosts
import React from 'react'
import { Link } from 'react-router-dom'

const BlogPosts = (props) => {
  return (
    <>
      <h1>Blog</h1>
      <ul>
        {props.blogPosts.map((post) => (
          <li key={post._id} >
            <Link to={`/posts/${post._id}`} >{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default BlogPosts
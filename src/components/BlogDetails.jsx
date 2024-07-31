import React from 'react';
import CommentForm from './CommentForm';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const BlogDetails = (props) => {
    const { blogPostId } = useParams();

  return (
    <>
      <h1>BlogDetails</h1>
      <CommentForm />
      <Link to={`/posts/${blogPostId}/edit`}>Edit</Link>
      <button>delete</button>
    </>
  )
}

export default BlogDetails
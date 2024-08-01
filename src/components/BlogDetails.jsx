import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as authService from '../services/authService'

const BlogDetails = (props) => {
  const { blogPostId } = useParams();

  const [currentBlogPost, setCurrentBlogPost] = useState([]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      const blogPostData = await authService.show(blogPostId);
      console.log(blogPostData);
      setCurrentBlogPost(blogPostData);
    }
    fetchBlogPost();
  }, []);

  return (
    <>
      <h1>{currentBlogPost.title}</h1>
      <p>{currentBlogPost.text}</p>
      <p>Category: {currentBlogPost.category}</p>
      <CommentForm />
      <Link to={`/posts/${blogPostId}/edit`}>Edit</Link>
      <button>delete</button>
    </>
  )
}

export default BlogDetails
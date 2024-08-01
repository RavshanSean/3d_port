import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as authService from '../services/authService'
import './Signin.css'; 


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
    
    <div className='body'>
      <div className='box'>
      <h2>{currentBlogPost.title}</h2>
      <h2>{currentBlogPost.text}</h2>
      <h2>Category: {currentBlogPost.category}</h2>
      <CommentForm />
      
      <button className='button'><Link to={`/posts/${blogPostId}/edit`}>Edit</Link></button>
      <button className='button'>delete</button>
      </div>
      </div>
      
    </>
  )
}

export default BlogDetails
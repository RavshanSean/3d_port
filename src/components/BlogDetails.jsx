import React, { useEffect, useState } from 'react';
import CommentForm from './CommentForm';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as authService from '../services/authService'
import './Signin.css'; 


const BlogDetails = (props) => {
  const { blogPostId } = useParams();
  const [currentBlogPost, setCurrentBlogPost] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      const blogPostData = await authService.show(blogPostId);
      console.log(blogPostData);
      setCurrentBlogPost(blogPostData);
      setComments(blogPostData.comments || []);
    }
    fetchBlogPost();
  }, []);

  const handleAddComment = async (commentFormData) => {
    const newComment = await authService.createComment(blogPostId, commentFormData);
    setComments([...comments, newComment]);
  };

  return (
    <>
    <main>
      <section className='section'>
        <div className='kaka'>
        <div className='lala'>
          <div className='h4'></div>
             <h4>{currentBlogPost.title}</h4> 
             
               <p>{currentBlogPost.text}</p>
               <p>Category: {currentBlogPost.category}</p>
               <div className='Form'>
                 <CommentForm handleAddComment={handleAddComment} />
                    {comments.map((comment, index) => (
               <p key={index}>{comment.text}</p>
                 ))}</div>
               <button className='button1'><Link to={`/posts/${blogPostId}/edit`}>Edit</Link></button>
               <button className='button2'>Delete</button>
            </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default BlogDetails
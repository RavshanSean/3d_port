import React, { useEffect, useState, useContext } from 'react';

import { AuthedUserContext } from '../App';

import CommentForm from './CommentForm';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import * as authService from '../services/authService';


const BlogDetails = (props) => {

  const user = useContext(AuthedUserContext);

  const { blogPostId } = useParams();
  const [currentBlogPost, setCurrentBlogPost] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchBlogPost = async () => {
      const blogPostData = await authService.show(blogPostId);
      setCurrentBlogPost(blogPostData);
      setComments(blogPostData.comments || []);
    }
    fetchBlogPost();
  }, []);
  const handleAddComment = async (commentFormData) => {
    const newComment = await authService.createComment(blogPostId, commentFormData);
    setComments([...comments, newComment]);
  };
  const userId = props.user ? props.user._id : null;

  return (
    <>
      <main>
        <section className='section'>
          <div className='kaka'>
            <div className='lala'>
              <div className='h4'></div>
              <h4>{currentBlogPost.title} by {currentBlogPost.author?.username}</h4>
              <p>{currentBlogPost.text}</p>
              <p>Category: {currentBlogPost.category}</p>
              <div className='Form'>
                <CommentForm handleAddComment={handleAddComment} />
                {comments.map((comment, index) => (
                  <p key={index}>{comment.text}</p>
                ))}</div>
              {userId == currentBlogPost.author?._id ? <button className='button1'><Link to={`/posts/${blogPostId}/edit`}>Edit Post</Link></button> : null}
              {userId == currentBlogPost.author?._id ? <button onClick={() => props.handleDeleteBlogPost(blogPostId)} className='button2'>Delete Post</button> : null}
              {/* I believe we learned about optional chaining, but I got help from this website https://refine.dev/blog/common-usestate-mistakes-and-how-to-avoid/#updating-usestate-directly */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default BlogDetails











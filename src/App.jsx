import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './main.css';
import Navbar from './components/Navbar';
import Home from './components/Home'
import BlogPosts from './components/BlogPosts';
import BlogDetails from './components/BlogDetails';
import BlogForm from './components/BlogForm';

import SignupForm from './components/SignupForm';
import SigninForm from './components/SigninForm';
import * as authService from './services/authService';




export const AuthedUserContext = createContext(null);

const App = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(authService.getUser());

  const [blogPosts, setBlogPosts] = useState([]);

  const handleAddPost = async (formData) => {
    const newBlogPost = await authService.create(formData);
    setBlogPosts([newBlogPost, ...blogPosts]);
    navigate('/posts');
  };


  const handleDeleteBlogPost = async (blogPostId) => {
    const deletedBlogPost = await authService.deleteBlogPost(blogPostId);

    setBlogPosts(blogPosts.filter((blogPost) => blogPost._id !== deletedBlogPost._id));
    navigate('/posts');
    //glenn helping 
    fetchAllBlogPosts();
  };


  const handleUpdateBlogPost = async (blogPostId, formData) => {
    const updateBlogPost = await authService.update(blogPostId, formData);

    setBlogPosts(blogPosts.map((blogPost) => (blogPostId === blogPost._id ? updateBlogPost : blogPost)))
    console.log(blogPostId, formData);
    navigate(`/posts/${blogPostId}`);
  };


  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  //Glenn helping to fix bugs
  const fetchAllBlogPosts = async () => {
    const blogPostsData = await authService.index();
    setBlogPosts(blogPostsData);
  }


  useEffect(() => {
    fetchAllBlogPosts();
  }, []);

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <Navbar user={user} handleSignout={handleSignout} />
        <Routes>
          {user ? (
            <>
              <Route path='/' element={<Home />} />
              <Route path='/posts' element={<BlogPosts blogPosts={blogPosts} />} />
              <Route path='/posts/:blogPostId' element={<BlogDetails user={user} handleDeleteBlogPost={handleDeleteBlogPost} />} />
              <Route path='/posts/new' element={<BlogForm handleAddPost={handleAddPost} />} />
              <Route path="/posts/:blogPostId/edit" element={<BlogForm handleUpdateBlogPost={handleUpdateBlogPost} />} />
            </>
          ) : (
            <>
              <Route path='/' element={<Home />} />
              <Route path='/posts' element={<BlogPosts blogPosts={blogPosts} />} />
              <Route path='/posts/:blogPostId' element={<BlogDetails />} />
            </>
          )}

          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
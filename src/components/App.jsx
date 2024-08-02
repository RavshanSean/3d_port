import { useState, createContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home'
import User from './components/User'
import BlogPosts from './components/BlogPosts';
import BlogDetails from './components/BlogDetails';
import BlogForm from './components/BlogForm';

import SignupForm from './components/SignupForm';
import SigninForm from './components/SigninForm';
import * as authService from '../src/services/authService'; // import the authservice




export const AuthedUserContext = createContext(null);

const App = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(authService.getUser()); // using the method from authservice

  const [blogPosts, setBlogPosts] = useState([]);

  const handleAddPost = async (formData) => {
    const newBlogPost = await authService.create(formData);
    setBlogPosts([newBlogPost, ...blogPosts]);
    navigate('/posts');
  };



const handleUpdateBlogPost = async (blogPostId, formData) => {
  const updateBlogPost = await authService.update (blogPostId, formData);

  setBlogPosts(blogPosts.map((blogPost) => (blogPostId === blogPost._id ? updateBlogPost : blogPost)))
  console.log(blogPostId, formData);
  navigate(`/posts/${blogPostId}`);
};


  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  useEffect(() => {
    const fetchAllBlogPosts = async () => {
      const blogPostsData = await authService.index();
      console.log(blogPostsData);
      setBlogPosts(blogPostsData);
    }
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
              <Route path='/user' element={<User />} />
              <Route path='/posts' element={<BlogPosts blogPosts={blogPosts} />} />
              <Route path='/posts/:blogPostId' element={<BlogDetails />} />
              <Route path='/posts/new' element={<BlogForm handleAddPost={handleAddPost} />} />
              <Route path="/posts/:blogPostId/edit" element={<BlogForm handleUpdateBlogPost={handleUpdateBlogPost} />} />
            </>
          ) : (
            <>
              <Route path='/' element={<Home />} />
              <Route path='/user' element={<User />} />
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
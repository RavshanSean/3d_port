import { useState, createContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
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
  const [user, setUser] = useState(authService.getUser()); // using the method from authservice

  const handleSignout = () => {
    authService.signout();
    setUser(null);
  };

  return (
    <>
      <AuthedUserContext.Provider value={user}>
        <Navbar user={user} handleSignout={handleSignout} />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/user' element={<User />}/>

          <Route path='/posts' element={<BlogPosts />}/>
          <Route path='/posts/:blogPostId' element={<BlogDetails />}/>
          <Route path='/posts/new' element={<BlogForm />}/>
          <Route path="/posts/:blogPostId/edit" element={<BlogForm />} />


          <Route path="/signup" element={<SignupForm setUser={setUser} />} />
          <Route path="/signin" element={<SigninForm setUser={setUser} />} />
        </Routes>
      </AuthedUserContext.Provider>
    </>
  );
};

export default App;
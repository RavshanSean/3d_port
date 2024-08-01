// src/components/HootForm/HootForm.jsx

import { useState } from 'react';
import './Signin.css'; 

const BlogForm = (props) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    category: 'News',
  });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    props.handleAddPost(formData);
  };

  return (
    <main>
      <div className='wrapper'>
        <h1>Blog Post</h1>
      <form onSubmit={handleSubmit}>
        
        <div className='input-box'>
        <input
        placeholder='Title'
          required
          type="text"
          name="title"
          id="title-input"
          value={formData.title}
          onChange={handleChange}
        />
        </div>
      
      
        <div className='input-box'>    
        <input
        placeholder='Text'
          required
          type="text"
          name="text"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        />
        </div>
         
        
        <div className='select-container'>
        <label htmlFor="category-input">Category:</label>
        <select
  
          className='select-box'
          required
          name="category"
          id="category-input"
          value={formData.category}
          onChange={handleChange}
        >
         
          <option value="News">News</option>
          <option value="Games">Games</option>
          <option value="Music">Music</option>
          <option value="Movies">Movies</option>
          <option value="Sports">Sports</option>
          <option value="Television">Television</option>
        </select>
        </div>
        <button type="submit">SUBMIT</button>
      </form>
      </div>
    </main>
  );
};

export default BlogForm;

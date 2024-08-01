import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';
import './Signin.css'; 




const SigninForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    updateMessage('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      console.log(user);
      props.setUser(user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  return (
    <main>
      <div className='wrapper'>
      <h1>Log In</h1>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className='input-box'>
          
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            name="username"
            onChange={handleChange}
            placeholder='Username'
          />
        </div>
        <div className='input-box'>
          
          <input
            type="password"
            autoComplete="off"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            placeholder='Password'
          />
        </div>
        <div>
          <button>Log In</button>
          <Link to="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
     </div>
    </main>
    
  );
};

export default SigninForm;


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';



const SignupForm = (props) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(['']);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const updateMessage = (msg) => {
    setMessage(msg);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUserResponse = await authService.signup(formData);
      props.setUser(newUserResponse.user);
      navigate('/');
    } catch (err) {
      updateMessage(err.message);
    }
  };

  const { username, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main>
      <div className='wrapper'>
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className='input-box'>


            <input
              type="text"
              id="name"
              value={username}
              name="username"
              onChange={handleChange}
              placeholder='Username'
            />
          </div>
          <div className='input-box'>

            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              placeholder='Password:'
            />
          </div>
          <div className='input-box'>

            <input
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              placeholder='Confirm Password:'
            />
          </div>
          <div>
            <button disabled={isFormInvalid()}>Sign Up</button>
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignupForm;
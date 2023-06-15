import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

const Login = ({userhandleLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };




  const Googleuserlogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        // Send a POST request to the server to log in the user with Google
        const response = await axios.post('http://localhost:3001/user/login/google', {codeResponse})      
           
        localStorage.setItem('User', response.data[0].id);
        localStorage.setItem('Username', response.data[0].username);

        userhandleLogin();
        // Navigate the user to the home page

        navigate('/about-cat');



      } catch (error) {
        // If there's an error, set the error state to display the error message to the user
        setError(error.response.data.error);
      }
    },
    onFailure: (error) => {
      // If there's an error, set the error state to display the error message to the user
      setError(error);
    }
  });
  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Send a POST request to the server to log in the user
      const response = await axios.post('http://localhost:3001/user/login', {
        username,
        password
      });   
      localStorage.setItem('User', response.data.id);
      localStorage.setItem('Username', response.data.username);
  
      userhandleLogin();
      // Navigate the user to the home page
      navigate('/about-cat');
    } catch (error) {
      if (error.response) {
        // If there's an error response from the server, set the error state to display the error message to the user
        setError(error.response.data.error);
      } else {
        // If there's no error response from the server, display a generic error message
        setError('An error occurred while logging in. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>User Login</h3>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter username"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter password"
        />
      </div>

      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Forgot <a href="/forgot-password">password?</a>
      </p>
      <div className='spacer'></div>

      <div id="SignInButton">
      <button onClick={(event) => {
      event.preventDefault();
      Googleuserlogin();
    }}>
        Log In Using Google
      </button>
      </div>
    </form>



  );
};

export default Login;
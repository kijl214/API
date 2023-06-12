import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

const Login = ({userhandleLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = (event) => {
    setRememberMe(event.target.checked);
  };


  const Googleuserlogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        // Send a POST request to the server to log in the user with Google
        const response = await axios.post('http://localhost:3001/user/login/google', {
          codeResponse
        });
  
        // If the login is successful, save the token and user data to local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
  
        // If the "remember me" checkbox is checked, save the token and user data to session storage
        if (rememberMe) {
          sessionStorage.setItem('token', response.data.token);
          sessionStorage.setItem('user', JSON.stringify(response.data.user));
        }
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

      // If the login is successful, save the token and user data to local storage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // If the "remember me" checkbox is checked, save the token and user data to session storage
      if (rememberMe) {
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
      }
      userhandleLogin();
      // Navigate the user to the home page
      navigate('/about-cat');
    } catch (error) {
      // If there's an error, set the error state to display the error message to the user
      setError(error.response.data.error);
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
      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <label className="custom-control-label" htmlFor="rememberMe">
            Remember me
          </label>
        </div>
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
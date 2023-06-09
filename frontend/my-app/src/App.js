import React, { useState } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './page/Login';
import SignUp from './page/SignUp';
import Create from './page/create_cat';
import About from './page/About_cat';
import Update from './page/Update_cat';
import Delete from './page/Delete_cat';


function App() {
  
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

  // Update the state of loggedIn and also store it in localStorage
  const handleLogin = () => {
    setLoggedIn(true);
    localStorage.setItem('loggedIn', 'true');
  };
  
  // Clear the state of loggedIn and also remove it from localStorage
  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('loggedIn');
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/about-cat'}>
              Home
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                {loggedIn ? (
                  <React.Fragment>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/create-cat'}>
                        Create Cat
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/update-cat'}>
                        Update Cat
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/delete-cat'}>
                        Delete Cat
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link btn btn-link" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/sign-in'}>
                        Staff Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to={'/sign-up'}>
                        Staff Sign up
                      </Link>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/" element={<Login handleLogin={handleLogin} />} />
              <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
              <Route path="/about-cat" element={<About />} />
              <Route path="/sign-up" element={<SignUp />} />
              {loggedIn ? (
                <React.Fragment>
                  <Route path="/create-cat" element={<Create />} />
                  <Route path="/update-cat" element={<Update />} />
                  <Route path="/delete-cat" element={<Delete />} />
                </React.Fragment>
              ) : (
                <Route path="*" element={<Login handleLogin={handleLogin} />} />
              )}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
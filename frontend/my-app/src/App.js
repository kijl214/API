import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './page/Login'
import SignUp from './page/SignUp'
import Create from './page/create_cat'
import About from './page/About_cat'
function App() {
  return (
    <Router>
      <div className="App"> 
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/sign-in'}>
              Home
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-in'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/about-cat'}>
                    About Cat
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/create-cat'}>
                    Create Cat
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route path="/sign-in" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/create-cat" element={<Create />} />
              <Route path="/about-cat" element={<About />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App
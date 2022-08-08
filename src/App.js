import './App.css';
import * as React from "react";
import axios from 'axios';
import {
  HashRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import UserBar from './components/UserBar'

import Home from "./components/Home";
import PalsPage from './components/PalsPage';
import Profile from './components/Profile';
import Meetings from './components/Meetings';
import Contact from './components/Contact';




class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      error: "",
      isAuthenticated: false,
    };
  }

  

  componentDidMount = () => {
    // alert(JSON.stringify(this.state.isAuthenticated))
  }

  navHome = () => {
    useNavigate('/')
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleUserNameChange = (event) => {
    this.setState({ username: event.target.value });
  }

  isResponseOk(res) {
    if (res.status >= 200 && res.status <= 299) {
      return res;
    } else {
      this.setState({ error: true })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.username === '' || this.state.password === '') this.setState({ error: true })
    else {
      try {
        axios.post('api/login/', {
          username: this.state.username,
          password: this.state.password,
        }
        ).then(this.isResponseOK)
          .then((data) => {
            localStorage.setItem('user', data.data.id)
            this.setState({ username: "", password: "", error: "" });
          })
      }
      catch (e) {
        alert('Invalid login information. Please try again.')
      }
    }
  };

  render() {
    if (!localStorage.getItem('user')) {
      return (
        <Router basename={process.env.PUBLIC_URL}>
          <div>

            <div className="Home">
              <div class="flex-container">
                <div class="banner">
                  
                    <NavLink to='/'><img src="../logo.png" alt="banner" class="center"/></NavLink>
                  
                </div>
                <div className="container mt-3">
                  <h2>Login</h2>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.handleUserNameChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="username">Password</label>
                      <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                      <div>
                      </div>
                      {/* <div>
                {this.state.error &&
                  <small className="text-danger">
                    {this.state.error}
                  </small>
                }
              </div> */}
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                  </form>
                </div>
              </div>
              <div class="profile"><Profile></Profile></div>

            </div>


            <UserBar></UserBar>

            <Routes basename={process.env.PUBLIC_URL}>
              <Route path="/" element={<Home />} />
              <Route path="/pals" element={<PalsPage />} />
              <Route path="/meetings" element={<Meetings />} />
              <Route path="/contact" element={<Contact />} />
            </Routes >

          </div>

        </Router>


      )

    }

    else {
      return <Router basename={process.env.PUBLIC_URL}>
        <div className="Home">
          <div class="flex-container">
            <div class="banner">
            <NavLink to='/'><img src="../logo.png" alt="banner" class="center"/></NavLink>
            </div>
          </div>
        </div>
        <br></br><br></br>
        <UserBar></UserBar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pals" element={<PalsPage />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    }

  }
}


export default App;

import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import React, { useState, useEffect, useContext } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Logout from './components/Logout';
import NoteContext from './context/notes/NoteContext';

function App() {
  const [alert, setAlert] = useState(null)




  // const context = useContext(NoteContext);
  // const { login, fetchUser } = context;

  // useEffect(() => {
  //   fetchUser()
  // }, [fetchUser])

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }



  return (
    <div className="App">
      {/* <Home /> */}

      <NoteState>

        <Router>
          <Nav />
          {alert && <Alert message={alert.msg} />}
          <div className="">
            <Routes>

              <Route path="/" element={<Home showAlert={showAlert} />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />

            </Routes>
          </div>
        </Router>


      </NoteState>
    </div>
  );
}

export default App;

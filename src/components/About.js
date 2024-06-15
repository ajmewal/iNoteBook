import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/notes/NoteContext'
import { useNavigate } from 'react-router-dom';


export default function About() {
  const navigate = useNavigate()
  const context = useContext(NoteContext);

  const { user, login, setlogin,fetchUser } = context;

  useEffect(() => {
    console.log(login)
    if (login==='null') {
      navigate('/login', { state: { message: 'Login First' } });
    }
    // Add login as a dependency so the effect runs when login changes
  }, [login, navigate]);

  if (login==="null") {
    return null; // Render nothing if not logged in to prevent UI flickering
  }


  return (
    <div className='container d-flex justify-content-center my-5'>
      <div class="card" style={{width: "18rem"}}>
        <div class="card-body">
          <h5 class="card-title">User: {user.name}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Email: {user.email}</h6>
        </div>
      </div>
    </div>
  )
}

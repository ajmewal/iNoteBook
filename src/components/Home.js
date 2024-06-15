import React, { useContext, useEffect, useState } from 'react'
import Notes from './Notes'
import AddNote from './AddNote'
import NoteContext from '../context/notes/NoteContext'
import { useNavigate } from 'react-router-dom';
import SIdebar from './SIdebar';

export default function Home(props) {
  const navigate = useNavigate()

  const context = useContext(NoteContext);
  const { login, fetchUser } = context;

  const [click, setclick] = useState('none')

  useEffect(() => {
    if (login === 'null') {

      navigate('/login')
    }

  }, [login])

  if (login === 'null') {

    return null
  }


  return (
    <div className=''>
      <SIdebar click={click} setclick={setclick} />
      <AddNote showAlert={props.showAlert} click={click} setclick={setclick} />
      <Notes showAlert={props.showAlert} click={click} />



      

    </div>
  )

}

import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState([])
  const [user, setuser] = useState([])
  const [login, setlogin] = useState("null")
  
  
  const fetchUser = async ()=>{
    try {
      
      const data = await fetch('http://localhost:5000/api/auth/check', {
        method: 'POST',
        credentials: 'include',
      })
      if(!data.ok){
        setlogin("null")
      }else{
  
        setlogin("true")
      }
      const user = await data.json()
      setuser({"id":user._id,"email":user.email,"name":user.name})
    } catch (error) {
      setlogin(null)
    }

  }


  

  const fetchNotes = async () => {
      const data = await fetch('http://localhost:5000/api/notes/fetchallnotes', {
      method: 'GET',
      credentials: 'include'
      }).then(response => response.json())
      setNotes(data)

  }

  const addNote = async (title, description, tag) => {
    const note = {
      "title": title,
      "description": description,
      "tag": tag
    }
    const date = new Date();
    const formattedDate = `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;

    const data = await fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        "title": title,
        "description": description,
        "tag": tag,
      }),
      headers: { "Content-Type": "application/json" }
    }).then(response => response.json())

    note._id = data._id
    note.date=formattedDate
    const lst=[note]
    setNotes(lst.concat(notes))
  }



  const deleteNote = async (id) => {
    const data = await fetch(`http://localhost:5000/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    }).then(response => response.json())

    id = data.note._id
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }
  const editNote = async (id, title, description, tag) => {
    const data = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
      method: 'PUT',
      credentials: 'include',
      body: JSON.stringify({
        "title": title,
        "description": description,
        "tag": tag,
      }),
      headers: { "Content-Type": "application/json" }
    })
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote.concat(element))

      }


    }
  }


  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, fetchNotes,fetchUser,user,login,setlogin }}>

      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;
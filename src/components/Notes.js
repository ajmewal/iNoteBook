import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import Noteitem from './Noteitem';


export default function Notes(props) {
  const context = useContext(NoteContext);

  const { notes, fetchNotes, editNote } = context;


  const [note, setnote] = useState({ "_id": "", 'title': "", "description": "", "tag": "" })



  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line 
  }, []);

  const ref = useRef(null)
  const refClose = useRef(null)
  const [display, setdisplay] = useState('none')

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const ref1 = useRef(null)
  const ref1Close = useRef(null)
  const [desc, setdesc] = useState({})

  const modal1Des = (id) => {
    setdisplay('block')
    notes.map((note) => {
      if (note._id === id) {
        setdesc({ "title": note.title, "description": note.description })
      }
    })
  }

  const modalOpen = (id) => {
    ref1.current.click()

    modal1Des(id)
  }

  const modalClose = () => {
    ref1Close.current.click()
    setdisplay('none')
  }

  const update = (id, title, description, tags) => {
    setnote({ "_id": id, 'title': title, "description": description, "tag": tags })
    ref.current.click()
  }
  const handleOnClick = (e) => {
    // e.preventDefault();
    editNote(note._id, note.title, note.description, note.tag);
    props.showAlert("Note Edited")
    refClose.current.click()
  }
  const onChange = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <div className={`container  row my-3 ${props.click === 'none' ? "d-flex" : "d-none"}`}>


      <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">

      </button>

      <div className="modal fade" id="exampleModal" tableindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form action="" method="post">
              <div className="container modal-body w-50">
                {/* <input type="text"  style={{display:"none"}} value={note._id} /> */}
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input onChange={onChange} type="text" name='title' className="form-control" id="title" value={note.title} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter Description</label>
                  <textarea onChange={onChange} value={note.description} className="form-control" name='description' id="exampleFormControlTextarea1" minLength={5} required rows="3"></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Tags</label>
                  <input onChange={onChange} value={note.tag} className="form-control" name='tag' id="exampleFormControlTextarea1" rows="1" />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button disabled={note.title.length < 5 || note.description.length < 5} onClick={() => { handleOnClick() }} type="button" className="btn btn-primary">Save changes</button>
              </div>
            </form>
          </div>
        </div>
      </div>


      <h2>Your Notes</h2>
      {notes.length === 0 && <div className='container'>No Notes to display</div>}
      {/* {notes.map((notes) => {
        return <Noteitem showAlert={props.showAlert} key={notes._id} update={update} notes={notes} />
      })} */}
      {notes
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort notes by editedDate in descending order
        .map((note) => (
          <Noteitem showAlert={props.showAlert} key={note._id} update={update} modalOpen={modalOpen} modalClose={modalClose} notes={note} />
        ))}

      <div class={`box position-absolute d-${display}`} style={{width:"90vw",height:"90vh",zIndex:"50"}}>
        <a href="#m1-o" class="link-1 d-none" ref={ref1} id="m1-c">Modal 1</a>

          <div class="modal2 w-100 h-100">
            <h1 class="modal__title">{desc.title}</h1>
            <div  style={{ overflowY: "scroll",height:"90%"}}>
            <p class="modal__text text-pritty" style={{scrollbarColor:"white transparents"}}>{desc.description}</p>
          </div>
          <a href="#" onClick={()=>{setdisplay('none')}} ref={ref1Close} class="link-2"></a>
      </div>
    </div>

    </div >
  )
}

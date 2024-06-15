import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'


const AddNote = (props) => {
    const context = useContext(NoteContext);

    const { addNote } = context;
    const [note, setnote] = useState({ 'title': "", "description": "", "tag": "" })
    const handleOnClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
        props.showAlert("Note Addedd success fully")
        setnote({ 'title': "", "description": "", "tag": "" })
        props.setclick('none')
    }
    const onChange = (e) => {
        setnote({ ...note, [e.target.name]: e.target.value })
    }

    

    return (

<>
            <div className={`modal1 position-absolute d-${props.click}`}  tableindex="-1" role="dialog" aria-labelledby="examplemodal1Label" aria-hidden="true" style={{backgroundColor:"#edf7fa",width:"95vw"}}>
                    <div className="modal1-content">
                            <div className="container modal1-body w-75">
                            <h1>Add a Note</h1>
                                <form action="" className='text-start' method="post">
                            <div className="container w-75">
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input onChange={onChange} value={note.title} minLength={5} required={true} type="text" name='title' className="form-control" id="title" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter Description</label>
                                        <textarea onChange={onChange} minLength={5} required className="form-control" name='description' value={note.description} id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Tags</label>
                                        <input onChange={onChange} value={note.tag} className="form-control" name='tag' id="exampleFormControlTextarea1" rows="1" />
                                    </div>
                                    <div className='d-flex gap-3'>
                                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" onClick={handleOnClick} className='btn btn-primary'>Submit</button>

                                    <button type="submit" onClick={()=>{props.setclick('none')}} className='btn btn-light'>Close</button>
                                    </div>
                            </div>
                                </form>
                    </div>
                
            </div>





        </div>
        </>
    )
}

export default AddNote

import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext';

export default function Noteitem(props) {
    const context = useContext(NoteContext);
    let description = ""
    const desc = () => {
        const a = props.notes.description.split(" ")
        for (let i = 0; i < 15; i++) {
            if (a[i] === undefined) {
                return
            } else {
                description += a[i] + " "
            }
        }
    }

    desc()

    const { deleteNote } = context;
    const handleOnClick = () => {
        deleteNote(props.notes._id)
        props.showAlert("Note Deleted")
    }
    const date = new Date(props.notes.date)
    const formattedDate = `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;

    return (
        <>
            <div className='col-md-3 my-3 text-start' style={{ height: "fit-content", cursor: "pointer" }} id={`${props.notes._id}`}>
                <div className="card p-4"  style={{ height: "250px" }}>
                    {/* <div className="card-body d-flex text-start row"> */}
                        <div  onClick={()=>{props.modalOpen(props.notes._id)}} style={{ height: "165px" }} >
                        <h5 className="card-title">{props.notes.title}</h5>
                        <p className="card-text my-2">{description}...</p>
                        </div>
                        {/* </div> */}
                        <div className='d-flex justify-content-start align-items-center position-absolute'  style={{left:'14px',bottom:"20px",zIndex:"10"}}>
                            <span onClick={handleOnClick} className="material-symbols-outlined mx-2">
                                delete
                            </span>
                            <span onClick={() => { props.update(props.notes._id, props.notes.title, props.notes.description, props.notes.tag) }} className="material-symbols-outlined mx-2">
                                edit
                            </span>
                            <p className='m-auto'>{formattedDate}</p>

                    </div>

                </div>
            </div>
        </>
    )
}

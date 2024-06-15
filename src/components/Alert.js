import React from 'react'

export default function Alert(props) {
    return (
        <div  className='position-absolute' style={{zIndex:20, width:"95vw",right:"0"}}>
            <div className="alert alert-success" role="alert">
                <b>{props.message}</b>
            </div>
        </div>
    )
}

import React,{useEffect,useContext, useState} from 'react'
import {Link,useLocation} from 'react-router-dom'
import NoteContext from '../context/notes/NoteContext'

export default function Nav() {
    const context = useContext(NoteContext);
    const { login,fetchUser } = context;
    const [display1, setdisplay1] = useState('block')
    const [display2, setdisplay2] = useState('none')


    let location = useLocation();
    useEffect(()=>{
        fetchUser()
      },[login])
    // console.log(login)
    useEffect(() => {
        // fetchUser()
        if(login==='null'){

            setdisplay1("block")
            setdisplay2("none")
            }else{
            setdisplay1("none")
            setdisplay2("block")

        }
        
    }, [login]);

    return (
        <div>
            <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/'?'active':""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/about'?'active':""}`}  to="/about">About</Link>
                            </li>
                        </ul>
                        <div className="d-flex gap-2">
                                <button style={{display:display1}} className="btn btn-primary"><Link className='nav-link' to='/login'>Login</Link></button>
                                <button style={{display:display1}} className="btn btn-primary"><Link className='nav-link' to='/signup'>Signup</Link></button>
                                <button style={{display:display2}} className="btn btn-primary"><Link className='nav-link' to='/about'>Profile</Link></button>
                                <button style={{display:display2}} className="btn btn-primary"><Link className='nav-link' to='/logout'>Log Out</Link></button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

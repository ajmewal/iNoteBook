import React, { useState,useEffect,useContext } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'
import { useLocation } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext'
import { useNavigate } from 'react-router-dom';


function Login(props) {

    const context = useContext(NoteContext);
    const navigate = useNavigate()

    const { fetchUser,user,setlogin,login } = context;

    // if(fetchUser()){
    //     console.log(user)
    // }

    const location = useLocation();
    const { state } = location;
    const message = state?.message || "";
    useEffect(() => {
        if(message){
            props.showAlert(message)
        }
    },[])

    useEffect(() => {
        if(login){

            if(!user){
            fetchUser("Login")
            }
        }
    }, [])
    
    

    const [cred, setcred] = useState({"email":"","password":""})
    const [cookies, setCookie] = useCookies(['JwtToken'])

    const handleSubmit= async(e)=>{
        e.preventDefault();
        const data = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            credentials: 'same-origin',
            body: JSON.stringify({
              "email": cred.email,
              "password": cred.password
            }),
            headers: { "Content-Type":"application/json", Accept: 'application/json', }
          })
          if(!data.ok){
            // console.log(data.status)
          }else{
            const token = await data.json()
            setlogin("true")
            setCookie('JwtToken', token.jwtData, { path: '/' })
            navigate('/')
          }
    }

    const onChange = (e)=>{
        setcred({...cred,[e.target.name]:e.target.value})
    }

    return (
        <div className='container my-3 w-25'>
            <div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} type="password" name='password' className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
            </div>
        </div>
    )
}

export default Login

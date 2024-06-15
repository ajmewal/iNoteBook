import React,{useState} from 'react'
import  { Navigate } from 'react-router-dom'
import { CookiesProvider, useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom';


function Signup() {
    const navigate = useNavigate()

    const [cred, setcred] = useState({ "name": "", "email": "", "password": "" })
    const [cookies, setCookie] = useCookies(['JwtToken'])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await fetch('http://localhost:5000/api/auth/createuser', {
            method: 'POST',
            body: JSON.stringify({
                "name": cred.name,
                "email": cred.email,
                "password": cred.password
            }),
            headers: { "Content-Type": "application/json", Accept: 'application/json', }
        })
        if (!data.ok) {
            // console.log(data.status)
        } else {
            // const token = await data.json()
            // setCookie('JwtToken', token.jwtData, { path: '/' })
            navigate('/login', { state: { message: 'Account Created successfully ! Login with your credentials' } })
         }
        }
        
    

    const onChange = (e) => {
        setcred({ ...cred, [e.target.name]: e.target.value })
    }

    return (
        <div className='container w-25'>
            <div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Email address</label>
                    <input type="text" onChange={onChange} className="form-control" name='name' id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" onChange={onChange} className="form-control" name='email' id="exampleInputEmail2" aria-describedby="emailHelp" />
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

export default Signup

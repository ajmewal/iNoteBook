import React,{useEffect,useContext} from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import NoteContext from '../context/notes/NoteContext'


function Logout() {
    const [cookies, setCookie,removeCookie] = useCookies(['JwtToken'])
    const navigate = useNavigate()

    const context = useContext(NoteContext);
    const { login,fetchUser } = context;
  useEffect(() => {
    removeCookie('JwtToken',{path:'/'});
    fetchUser()
    navigate('/login')
  }, [])
  
  return null

  return (
    <div>
      
    </div>
  )
}

export default Logout

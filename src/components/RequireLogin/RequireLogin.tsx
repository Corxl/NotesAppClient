import React, { useContext, useEffect } from 'react'
import { LoginContext } from '../../context/LoginContext.tsx';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin.tsx';
import axios from 'axios';

type Props = { 
    children: React.ReactNode
} 
axios.defaults.withCredentials = true; 


export default function RequireLogin({children}: Props) { 
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext); 
    const navigator = useNavigate(); 
    const { checkAuth } = useLogin();

    useEffect(() => { 
        (async ()=>{
            try {
                const isAuth = await checkAuth();
                setIsLoggedIn(isAuth);
                console.log(isAuth)
                if (!isAuth) {
                    navigator('/login');
                }
            } catch (err) {
                console.log(err);
            }
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 
    

  return (isLoggedIn && children );
}

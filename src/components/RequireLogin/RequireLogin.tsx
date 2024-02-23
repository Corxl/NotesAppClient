import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext.tsx';
import { useLogin } from '../../hooks/useLogin.tsx';

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
                if (!isAuth) {
                    navigator('/login');
                }
            } catch (err) {
                // show server offline error to user.
                console.log(err);
            }
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); 
    

  return (isLoggedIn && children );
}

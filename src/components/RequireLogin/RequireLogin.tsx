import React, { useContext, useEffect } from 'react'
import { LoginContext } from '../../context/LoginContext.tsx';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin.tsx';

type Props = { 
    children: React.ReactNode
}

export default function RequireLogin({children}: Props) { 
    const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext); 
    const navigator = useNavigate(); 
    const { checkAuth } = useLogin();

    useEffect(() => { 
        (async ()=>{
            const isAuth = await checkAuth();
            setIsLoggedIn(isAuth);
            console.log(isAuth)
            if (!isAuth) {
                navigator('/login');
            } 
        })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!isLoggedIn) {
        return null;
    }

  return ( children );
}

import React, { useContext, useEffect } from 'react'
import { LoginContext } from '../../context/LoginContext.tsx';
import { useNavigate } from 'react-router-dom';

type Props = { 
    children: React.ReactNode
}

export default function RequireLogin({children}: Props) { 
    const { isLoggedIn } = useContext(LoginContext); 
    const navigator = useNavigate(); 

    useEffect(() => {
    if (!isLoggedIn) {
        navigator('/login');
    } 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (!isLoggedIn) {
        return null;
    }

  return ( children );
}

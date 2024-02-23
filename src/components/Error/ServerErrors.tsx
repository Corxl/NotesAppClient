import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/useLogin.tsx';


export enum ServerError {
    SERVER_OFFLINE = 'Server is offline. Please try again later.',
}

type ServerErrorsProps = {
    error: ServerError;
}

export default function ServerErrors(props: ServerErrorsProps) { 
  const { pingServer } = useLogin();
  const navigator = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await pingServer();
        navigator('/');
      } catch (err) {
        console.log(err);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="server-offline" style={{color: "white"}}> 
      {props.error} 
    </div>
  )
}

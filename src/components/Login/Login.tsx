import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext.tsx';

export default function Login() {
  const { setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  return (
		<div>
			<button
				onClick={() => {
					navigate('/dashboard');
					setIsLoggedIn(true);
				}}>
				Log In
			</button>
		</div>
	);
}

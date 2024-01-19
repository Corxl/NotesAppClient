import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext.tsx';
import Navbar from '../NavBar/Navbar.tsx';

export default function Login() {
  const { setIsLoggedIn } = useContext(LoginContext);
  const navigate = useNavigate();
  return (
			<div className="login-container">
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

import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../context/LoginContext.tsx';
import { useLogin } from '../../hooks/useLogin.tsx';
import './Login.css';

export default function Login() {
	const { setIsLoggedIn } = useContext(LoginContext);
	const { login } = useLogin();
	const navigate = useNavigate(); 
	const username = useRef<HTMLInputElement>(null);
	const password = useRef<HTMLInputElement>(null);
	async function handleLogin() {
		if (!username.current?.value || !password.current?.value) return;
		const isAuth = await login(username.current.value, password.current.value);
		if (isAuth) {
			setIsLoggedIn(true);
			navigate('/dashboard');
		} 
	}

  	return (
	<div className="login-container">
		<input type="text" placeholder="Username" ref={username}/>
		<input type="password" placeholder="Password" ref={password}/> 
		<button
			onClick={handleLogin}>
			Log In
		</button>
	</div> 
	);
}

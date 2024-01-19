 import axios from 'axios';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { useEffect, useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AccountPage } from './components/Account';
import Login from './components/Login/Login.tsx';
import { NotesPage } from './components/Notes/NotesPage';
import { LoginContext } from './context/LoginContext.tsx';

export async function checkAuth() {
	let auth = true;
	await axios
		.get('http://localhost:3001/users/isAuth')
		.then((res) => { 
			console.log(res);
			auth = true;
		})
		.catch((err) => {
			console.log(err);
			auth = false;
		});
	return auth;
}

function App() { 

	const [isLoggedIn, setIsLoggedIn] = useState(false); 
	axios.defaults.withCredentials = true; 
	// async function handleLogin() {
	// 	await axios.post('http://localhost:3001/users/login',
	// 		{ 
	// 			username: 'test',
	// 			password: 'test', 
	// 		}).then((res) => {
	// 		console.log(res);
	// 		setIsLoggedIn(true);
	// 	}
	// 	).catch((err) => {
	// 		console.log(err);
	// 		setIsLoggedIn(false);
	// 	});
	// } 
	// async function handleProtected() {
	// 	await axios.get('http://localhost:3001/users/protected').then((res) => {
	// 		console.log(res);
	// 		// setIsLoggedIn(true);
	// 	}
	// 	).catch((err) => {
	// 		console.log(err);
	// 		// setIsLoggedIn(false);
	// 	});
	// }
	// useEffect(() => {
	// 	handleLogin();
// 	handleProtected();
	// }, []); 
	useEffect(() => {
		checkAuth();
	} , []);

    return (
			<LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
				<HashRouter>
					<div className="App">
						<Routes>
							<Route index element={<Navigate to={'/login'} />} />
							<Route path="/login" element={<Login />} />
							<Route path="/dashboard" element={<NotesPage />} />
							<Route path="/account" element={<AccountPage />} />
						</Routes> 
					</div>  
				</HashRouter>
			</LoginContext.Provider>
		);
}

export default App;

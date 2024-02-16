 import axios from 'axios';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AccountPage } from './components/Account';
import Login from './components/Login/Login.tsx';
import { NotesPage } from './components/Notes/NotesPage';
import { LoginContext } from './context/LoginContext.tsx';
import RequireLogin from './components/RequireLogin/RequireLogin.tsx';
import { useLogin } from './hooks/useLogin.tsx';



function App() { 

	const [isLoggedIn, setIsLoggedIn] = useState(false); 
	axios.defaults.withCredentials = true; 
	const { checkAuth } = useLogin();  

    return (
			<LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
				<BrowserRouter>
					<div className="App">
						<Routes>
							<Route index element={<Navigate to={'/dashboard'} />} />
							<Route path="/login" element={<Login />} />
							{/*TODO: refactor dashboard to be note specific. /dashboard/<noteId>*/}
							<Route path="/dashboard" element={
								<RequireLogin children ={<NotesPage /> }/>
							}/>
							<Route path="/account" element={
								<RequireLogin children={<AccountPage />} />
							}/>
						</Routes> 
					</div>  
				</BrowserRouter>
			</LoginContext.Provider>
		);
}

export default App;

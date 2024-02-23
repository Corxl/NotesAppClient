 import axios from 'axios';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AccountPage } from './components/Account';
import ServerErrors, { ServerError } from './components/Error/ServerErrors.tsx';
import Login from './components/Login/Login.tsx';
import { NotesPage } from './components/Notes/NotesPage';
import RequireLogin from './components/RequireWrappers/RequireLogin.tsx';
import RequireServer from './components/RequireWrappers/RequireServer.tsx';
import { LoginContext } from './context/LoginContext.tsx';


function App() { 

	const [isLoggedIn, setIsLoggedIn] = useState(false); 
	axios.defaults.withCredentials = true; 
    return (
			<LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
				<BrowserRouter>
					<div className="App">
						<RequireServer element={
							<Routes>
								<Route index element={<Navigate to={'/dashboard'} />} />
								<Route path="/login" element={<Login />} />
								{/*TODO: refactor dashboard to be note specific. /dashboard/<noteId>*/}
								<Route
									path="/dashboard/:noteId?"
									element={<RequireLogin element={<NotesPage />} />}
								/>
								<Route
									path="/account"
									element={<RequireLogin element={<AccountPage />} />}
								/>

								<Route
									path="/server-offline"
									element={<ServerErrors error={ServerError.SERVER_OFFLINE} />}
								/>
							</Routes> 
						} />
					</div>
				</BrowserRouter>
			</LoginContext.Provider>
		);
}

export default App;

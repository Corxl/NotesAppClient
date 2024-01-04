 import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { useState } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { AccountPage } from './components/Account';
import Login from './components/Login/Login.tsx';
import { Navbar } from './components/NavBar';
import { NotesPage } from './components/Notes/NotesPage';
import { LoginContext } from './context/LoginContext.tsx';


function App() { 

	const [isLoggedIn, setIsLoggedIn] = useState(true); 

  return (
		<LoginContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
			<HashRouter>
				<div className="App">
					{isLoggedIn ? (
						<>
							<Navbar />
							<Routes>
								<Route index element={<Navigate to={'/dashboard'} />} />
								<Route path="/dashboard" element={<NotesPage />} />
								<Route path="/account" element={<AccountPage />} />
							</Routes>
						</>
					) : (
						<Routes>
							<Route index element={<Navigate to={'/login'} />} />
							<Route path="/login" element={<Login />} />
						</Routes>
					)}
					{/* <>
					<Navbar />
					<Routes> 
						<Route path="/" element={<NotesPage />} />
						<Route path="/account" element={<AccountPage />} />
					</Routes>
				</> */}
				</div>
			</HashRouter>
		</LoginContext.Provider>
	);
}

export default App;

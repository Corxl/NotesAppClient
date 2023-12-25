
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { AccountPage } from './components/Account';
import { Navbar } from './components/NavBar';
import { NotesPage } from './components/Notes/NotesPage';

function App() { 
  return (
	<HashRouter>
		<div className='App'>
			<Navbar />
			<Routes>
				<Route path="/" element={<NotesPage />} />
				<Route path="/account" element={<AccountPage />} />
			</Routes>
		</div>
	</HashRouter>
	);
}

export default App;

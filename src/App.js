
import './App.css';
import { AccountPage } from './components/Account';
import { Navbar } from './components/NavBar';
import { NotesPage } from './components/NotesPage';
import { Routes, Route, HashRouter } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

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

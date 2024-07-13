import Auth from './components/Pages/Auth/authpage'
import Main from './components/Pages/Main/mainpage'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

function App() {
	return (
		<>
			<Auth />
			{/* <BrowserRouter>
				<Routes>
					<Route path='/' element={<Main />} />
					<Route path='Auth' element={<Auth />} />
				</Routes>
			</BrowserRouter> */}
		</>
	)
}

export default App

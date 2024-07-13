import Auth from './components/Pages/Auth/authpage'
import Main from './components/Pages/Main/mainpage'
import { Routes, Route, useNavigate } from 'react-router-dom'
import PrivateRoute from './router/privateRoute'

function App() {
	return (
		<>
			<Routes>
				<Route element={<PrivateRoute />}>
					<Route path='main' element={<Main />} />
				</Route>
				<Route path='/' element={<Auth />} />
			</Routes>
		</>
	)
}

export default App

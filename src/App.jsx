import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './router/privateRoute.jsx'
import 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import AuthNew from './components/BootStrapPages/AuthNew/authpageNew.jsx'
import DirectionsNew from './components/BootStrapPages/DirectionsNew/directionspageNew.jsx'
import NaviBar from './components/helpers/navibar.jsx'

function App() {
	return (
		<>
			<NaviBar />
			<Routes>
				<Route element={<PrivateRoute />}>
					<Route path='directions' element={<DirectionsNew />} />
				</Route>
				<Route path='/' element={<AuthNew />} />
			</Routes>
		</>
	)
}

export default App

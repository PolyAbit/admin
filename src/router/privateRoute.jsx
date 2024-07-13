import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
	const auth = true
	return auth ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoute

import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./router/privateRoute.jsx";
import "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import AuthNew from "./pages/Auth/AuthPage.jsx";
import DirectionsNew from "./pages/Directions/DirectionsPage.jsx";
import NavBar from "./components/Navbar.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="directions" element={<DirectionsNew />} />
        </Route>
        <Route path="/" element={<AuthNew />} />
      </Routes>
    </>
  );
}

export default App;

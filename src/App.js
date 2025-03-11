import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth } from './auth/AuthContext';
import Navbar from './nav/NavBar';
import LoggedOutNavbar from './nav/NavBarLoggedOut';
import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import Favorites from './pages/Favorites';
import Performances from './pages/Performances';

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="App">
      <BrowserRouter>
        {isAuthenticated ? <Navbar/> : <LoggedOutNavbar/>} 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protect these routes */}
          <Route path="/favorites" element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          } />
          
          <Route path="/performances" element={
            <PrivateRoute>
              <Performances />
            </PrivateRoute>
          } />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import 'react-toastify/ReactToastify.css';
import { useState } from 'react';
import RefrshHandler from './RefrshHandler';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to='/login' />;
  };

  return (
    <Router> {/* Wrap everything inside the Router component */}
      <div className="App">
        <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/profile' element={<PrivateRoute element={<Profile />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

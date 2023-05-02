import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import { Routes,Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  return (
    <div className="App">
      <Routes>
      <Route path='/login' element={<Login />} />
       <Route
          path='/'
          exact
          element={
            isLoggedIn ? <Navigate to='/home' /> : <Navigate to='/login' />
          }
        />
      </Routes>
      
    </div>
  );
}

export default App;

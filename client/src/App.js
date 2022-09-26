import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import './App.css';
import Login from './components/auth/Login';
import Home from './components/layout/Home';
import Register from './components/auth/Register';
import AuthContextProvider from './contexts/AuthContext';
import DashBoard from './views/DashBoard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './views/About';
import PostContextProvider from './contexts/PostContext';


function App() {

  return (
    <AuthContextProvider>
      <PostContextProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />       
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
             
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route index element = {<DashBoard />} />  
              <Route path="about" element={<About />} />           
            </Route>    
            {/* <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route index element = {<DashBoard />} />  
            </Route>    */}
          </Routes>
        </Router>
      </div>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;

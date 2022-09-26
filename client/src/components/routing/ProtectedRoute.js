import React from 'react';
import{Outlet, useNavigate} from 'react-router-dom';
import { useContext } from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner';
import NavbarMenu from '../layout/NavbarMenu'
// import DashBoard from '../../views/DashBoard';



const ProtectedRoute = () => {

  const navigate = useNavigate();

  const {state: {authLoading, isAuthenticated}} = useContext(AuthContext);

  if(authLoading) {
    return (
      <div className="d-flex justify-content-center mt-2">
				<Spinner animation='border' variant='info' />
			</div>
    )
  }

  return (
   <div>
        <NavbarMenu />
      {
        isAuthenticated ? <Outlet /> : navigate('/login')
      }

   </div>
    // <Route {...rest} render={props => isAuthenticated 
    //   ? (<Component {...rest} {...props} />)
    //   : (navigate('/login'))
    
    // }/>
  )
}

export default ProtectedRoute
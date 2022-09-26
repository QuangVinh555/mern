import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link, useNavigate} from 'react-router-dom';

import {useState, useContext} from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Spinner from 'react-bootstrap/Spinner';
import AlertMessage from '../layout/AlertMessage';


const Login = () => {

  const[login, setLogin] = useState({
    username: '',
    password: ''
  })


  // Alert message
  const[alert, setAlert] = useState(null);

  const {username, password} = login;

  const onChangeLogin = (e) => setLogin({...login, [e.target.name]: e.target.value});

  // context
  const {loginUser, state:{authLoading, isAuthenticated}} = useContext(AuthContext);
  
  // route
  const navigate = useNavigate()

  // submit form
    const loginSubmit = async e => {
      // e.preventDefault();
      try {
        const loginData = await loginUser(login);
        if(loginData.success) {
          navigate('/dashboard');
        }else{
          setAlert({type: 'error', message:loginData.message});
          setTimeout(() =>{
            setAlert(null);
          }, 3000)
        }
      } catch (error) {
        console.log(error);
      }
    }


  // Nếu loading: false -> chưa load xong
  if(authLoading) {
    return (
      <div className="d-flex justify-content-center mt-2">
				<Spinner animation='border' variant='info' />
			</div>
    )
  } 
  // Nếu như được xác thực: true
  else if(isAuthenticated){
    return navigate('/dashboard');
  }
  else
  return (
    <div className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1>LearnIt</h1>
					<h4>Keep track of what you are learning</h4>
          <Form className='my-4' onSubmit={loginSubmit}>
            <AlertMessage info={alert} />
            <Form.Group>
              <Form.Control
                type='text'
                placeholder='Username'
                name='username'
                value={username}
                onChange={onChangeLogin}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type='password'
                placeholder='Password'
                name='password'
                value = {password}
                onChange={onChangeLogin}
                required
              />
            </Form.Group>
            <Button variant='success' type='submit'>
              Login
            </Button>
          </Form>
          <p>
            Don't have an account?
            <Link to='/register'>
              <Button variant='info' size='sm' className='ml-2'>
                Register
              </Button>
            </Link>
          </p>
				</div>
			</div>
		</div>
  )
}

export default Login
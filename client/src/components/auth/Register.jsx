import React, {useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';
import Spinner from 'react-bootstrap/Spinner'

const Register = () => {

  // alert thong bao loi trung username
  const [alert, setAlert] = useState(null);

  // useContext registerUser
  const {registerUser, state: {authLoading ,isAuthenticated}} = useContext(AuthContext);

  // navigate dashboard
  const navigate = useNavigate();

  // state form register
  const[register, setRegister] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const {username, password, confirmPassword} = register;

  // set state from register
  const onChangeRegister = (e) => {
    setRegister({...register, [e.target.name]: e.target.value});
  }

  // submit form
  const registerSubmit = async e => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setAlert({type: 'error', message: 'Passwords do not match.'});
      setTimeout(() =>{
        setAlert(null);
      }, 3000)
    }
    try {
      const registerData = await registerUser(register);
      console.log(registerData);
      if(registerData.success) {
        navigate('/dashboard')
      }else{
        setAlert({type: 'error', message: registerData.message})
        setTimeout(() => {
          setAlert(null);
        }, 3000)
        setRegister({username: '', password: '', confirmPassword: ''})
      }
    } catch (error) {
      console.log(error);
    }
  }

  if(authLoading){
    return (
      <div className="d-flex justify-content-center mt-2">
				<Spinner animation='border' variant='info' />
			</div>
    )
  }else if(isAuthenticated){
    return navigate('/dashboard')
  }
  else

  return (
    <div className='landing'>
			<div className='dark-overlay'>
				<div className='landing-inner'>
					<h1>LearnIt</h1>
					<h4>Keep track of what you are learning</h4>
          <Form className='my-4' onSubmit = {registerSubmit}>
            <AlertMessage info={alert} />
            <Form.Group>
              <Form.Control
                value = {username}
                type='text'
                placeholder='Username'
                name='username'  
                required
                onChange = {onChangeRegister}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                value = {password}
                type='password'
                placeholder='Password'
                name='password'
                required
                onChange = {onChangeRegister}

              />    
            </Form.Group>
            <Form.Group>
              <Form.Control
                value = {confirmPassword}
                type='password'
                placeholder='Confirm Password'
                name='confirmPassword'
                required
                onChange = {onChangeRegister}

              />    
            </Form.Group>
            <Button variant='success' type='submit'>
              Register 
            </Button>
          </Form>
          <p>
            Already have an account?
            <Link to='/login'>
              <Button variant='info' size='sm' className='ml-2'>
                Login
              </Button>
            </Link>
          </p>
				</div>
			</div>
		</div>
  )
}

export default Register
import React, { useState, useContext} from 'react'
import loginpic from '../images/login.jpg'

import { NavLink, useHistory } from 'react-router-dom'
import { UserContext } from '../App';

const Login = () => {
 
  const {state, dispatch} = useContext(UserContext);

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
      e.preventDefault();

      const res = await fetch('/signin', {
          method:"POST",
          headers:{
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              email,
              password
          })
      });

      const data = res.json();

      if (res.status === 400 || !data) {
          window.alert("Invalid Credentials");
      } else {
        dispatch({type:"USER", payload:true})
          window.alert("Login Successfull");
          history.push("/");
      }
  }
  
  return (
    <>
    <section className='signup'>
        <div className="container mt-5">
          <div className='signup-content'>

           
              <div className='signup-form'>
                <h2 className='form-title'>Sign Up</h2>
                <form method='POST' className='resister-form' id='resister-form'>
                    

                    <div className='form-group'>
                        <label htmlFor='email'>
                          <i className="zmdi zmdi-email material-icons-name"></i>
                        </label>
                        <input type='email' name='email' id='email' value={email}
                        onChange={(e) => setEmail(e.target.value)} autoComplete='off'  placeholder='Enter Your Email'  />
                    </div>


                    <div className='form-group'>
                        <label htmlFor='password'>
                          <i className="zmdi zmdi-lock material-icons-name"></i>
                        </label>
                        <input type='password' name='password' id='password' value={password}
                        onChange={(e) => setPassword(e.target.value)} autoComplete='off' placeholder='Enter Your Password' />
                    </div>

                    

                    <div className='form-group form-button'>
                        <input type='submit' name='signup' id='signup' onClick={loginUser} className='form-submit' />
                    </div>
                </form>
                </div>
                <div className='signup-image'>
                    <figure>
                      <img src={loginpic} alt="img" />
                    </figure>
                    <NavLink to='/Signup' className='signup-image-link'>Create An Account </NavLink>
                </div>
              
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
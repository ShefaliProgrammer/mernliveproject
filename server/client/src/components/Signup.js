import React from 'react'
import signpic from '../images/signup.jpg'
import { NavLink , useHistory} from 'react-router-dom'


const Signup = () => {

const history = useHistory()
const [user, setUser] = React.useState({
   name:'', email:'',phone:'',work:'',password:'',cpassword:''
});

let name, value;
const handleInputs = (e)=>{
 
   name = e.target.name;
        value = e.target.value;
   
   setUser({...user, [name]:value})

}

const datasubmit = async (e)=>{
   e.preventDefault()

   const { name, email, phone, work, password, cpassword } = user;

   const res = await fetch("/register", {
       method: "POST",
       headers: {
           "Content-Type": "application/json"
           
       },
       body: JSON.stringify({
           name, email, phone, work, password, cpassword
       })
   });

   const data = await res.json();
     
   // I need to change the data to res 
   if (res.status === 422 || !data) {
       window.alert("INvalid Registration");
       console.log("INvalid Registration");
   } else {
        window.alert(" Registration Successfull");
       console.log("Successfull Registration");

       history.push("/login");
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
                        <label htmlFor='name'>
                           <i className="zmdi zmdi-account material-icons-name"></i>
                        </label>
                        <input type='text' name='name' id='name' autoComplete='off' value={user.name} onChange={handleInputs} placeholder='Enter Your Name' />
                     </div>

                     <div className='form-group'>
                        <label htmlFor='email'>
                           <i className="zmdi zmdi-email material-icons-name"></i>
                        </label>
                        <input type='email' name='email' id='email' autoComplete='off' value={user.email} onChange={handleInputs} placeholder='Enter Your Email' />
                     </div>

                     <div className='form-group'>
                        <label htmlFor='number'>
                           <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                        </label>
                        <input type='number' name='phone' id='phone' autoComplete='off' value={user.phone} onChange={handleInputs} placeholder='Enter Your Number' />
                     </div>

                     <div className='form-group'>
                        <label htmlFor='work'>
                           <i className="zmdi zmdi-slideshow material-icons-name"></i>
                        </label>
                        <input type='text' name='work' id='work' autoComplete='off' value={user.work} onChange={handleInputs} placeholder='Enter Your Work' />
                     </div>

                     <div className='form-group'>
                        <label htmlFor='password'>
                           <i className="zmdi zmdi-lock material-icons-name"></i>
                        </label>
                        <input type='password' name='password' id='password' value={user.password} onChange={handleInputs} autoComplete='off' placeholder='Enter Your Password' />
                     </div>

                     <div className='form-group'>
                        <label htmlFor='cpassword'>
                           <i className="zmdi zmdi-lock material-icons-name"></i>
                        </label>
                        <input type='password' name='cpassword' id='cpassword' value={user.cpassword} onChange={handleInputs} autoComplete='off' placeholder='Enter Your Confirm Password' />
                     </div>

                     <div className='form-group form-button'>
                        <input type='submit' name='signup' id='signup' className='form-submit' value='Resister' onClick={datasubmit} />
                     </div>
                 </form>
                 </div>
                 <div className='signup-image'>
                    <figure>
                      <img src={signpic} alt="img" />
                    </figure>
                    <NavLink to='/Login' className='signup-image-link'>I Am Already Resister </NavLink>
                 </div>
              
           </div>
        </div>
     </section>
    </>
  )
}

export default Signup
import './Register.scss'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
const Register =(props)=>{
  let history =useHistory()
  const handleLogin=()=>{
  history.push("/login")
  }
  return(
    <div className="register-container mt-3">
      <div className="container">
        <div className="row px-3 px-sm-0">
           <div className="content-left col-12 d-none col-sm-7 d-sm-block">
             <div className="brand">
              VUONG LE
             </div>
             <div className="detail">
               Learning everything
             </div>
           </div>
           <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3 ">
           <div className="brand d-sm-none">
              VUONG LE
             </div>
             <div className='form-group'>
              <label>Email:</label>
            <input className='form-control' type="text" placeholder='Email address '/>
            </div>
            <div>
              <label> Phone:</label>
            <input className='form-control' type="text" placeholder='phone number'/>
            </div>
            <div>
              <label> Username:</label>
            <input className='form-control' type="text" placeholder='Username'/>
            </div>
            <div className='form-group'>
              <label>password:</label>
            <input className='form-control' type="password" placeholder='Password'/>
            </div>
            <div className='form-group'>
              <label>Re-enter password:</label>
            <input className='form-control' type="password" placeholder='Password'/>
            </div>
            <button className='btn btn-primary'>Register</button>
            <span className='text-center'><a className='forgot-password' href='#'>Forgot your password?</a></span>
            <hr/>
            <div className='text-center'>
            <button className='btn btn-success'onClick={()=>handleLogin()}>Already an account.Login</button>
            </div>
           </div>
        </div>
      </div>
    </div>
  )
}
export default Register
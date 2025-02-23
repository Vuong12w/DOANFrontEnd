import './Register.scss'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { registerNewUser } from '../../services/userService'
const Register =(props)=>{
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState("")
  const [username,setUsername]=useState("")
  const [password,setPassword]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const defaultValidInput ={
    isValidEmail:true,
    isValidPhone:true,
    isValidPassword:true,
    isValidConfirmPassword:true
  }
  const [objCheckInput,setObjCheckInput]=useState(defaultValidInput)
  let history =useHistory()
  const handleLogin=()=>{
  history.push("/login")
  }
  const isValidInput=()=>{
    setObjCheckInput(defaultValidInput)
    if(!email){
      setObjCheckInput({...defaultValidInput,isValidEmail:false})
      toast.error("Email is required")
      return false
    }
    let regx =/\S+@\S+\.\S+/
    if(!regx.test(email)){
      setObjCheckInput({...defaultValidInput,isValidEmail:false})
      toast.error("please enter a vaild email address")
      return false
    }
    if(!phone){
      setObjCheckInput({...defaultValidInput,isValidPhone:false})
      toast.error("Phone is required")
      return false
    }
    if(!password){
      setObjCheckInput({...defaultValidInput,isValidPassword:false})
      toast.error("Password is required")
      return false
    }
    if(password != confirmPassword){
      setObjCheckInput({...defaultValidInput,isValidConfirmPassword:false})
      toast.error("Your password is not the same")
      return false
    }
   
    return true
  }
  const handleRegister=async()=>{
    let check = isValidInput()
    if(check===true){
    let response=  await registerNewUser(email,phone,username,password)
    let serverData = response.data
    if(+serverData.EC===0){
      toast.success(serverData.EM)
      history.push("/login")
    }else{
      toast.error(serverData.EM)
    }
    }
    let userData = {email,phone,username,password}
    console.log(userData)
  }
  
  useEffect(()=>{
    // axios.get("http://localhost:8080/api/v1/test-api").then(data=>{{
    //   console.log(data)
    // }})
  },[])
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
            <input className={objCheckInput.isValidEmail?'form-control':'form-control is-invalid'} type="text" placeholder='Email address' 
            value={email} onChange={(event)=>setEmail(event.target.value)}/>
            </div>
            <div>
              <label> Phone:</label>
            <input className={objCheckInput.isValidPhone?'form-control':'form-control is-invalid'} type="text" placeholder='phone number'
            value={phone} onChange={(event)=>setPhone(event.target.value)}/>
            </div>
            <div>
              <label> Username:</label>
            <input className='form-control' type="text" placeholder='Username'
            value={username} onChange={(event)=>setUsername(event.target.value)}/>
            </div>
            <div className='form-group'>
              <label>password:</label>
            <input className={objCheckInput.isValidPassword?'form-control':'form-control is-invalid'} type="password" placeholder='Password'
            value={password} onChange={(event)=>setPassword(event.target.value)}/>
            </div>
            <div className='form-group'>
              <label>Re-enter password:</label>
            <input className={objCheckInput.isValidConfirmPassword?'form-control':'form-control is-invalid'}type="password" placeholder='Password'
            value={confirmPassword} onChange={(event)=>setConfirmPassword(event.target.value)}/>
            </div>
            <button className='btn btn-primary' onClick={()=>handleRegister()}>Register</button>
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
import { useEffect, useState } from 'react'
import './login.scss'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { toast } from 'react-toastify'
import { loginUser } from '../../services/userService'
const Login =(props)=>{
  const [valueLogin,setValueLogin]=useState("")
  const [password,setPassword]=useState("")
  const defaultObjValidInput={
    isValidValueLogin:true,
    isValidValuePassword:true
  }
  const [objValidInput,setObjValidInput]=useState(defaultObjValidInput)
  const handleLogin =async()=>{
    setObjValidInput(defaultObjValidInput)
    if(!valueLogin){
      setObjValidInput({...defaultObjValidInput,isValidValueLogin:false})
      toast.error("Please enter your email address or phone number")
      return
    }
    if(!password){
      setObjValidInput({...defaultObjValidInput,isValidValuePassword:false})
      toast.error("Please enter your password")
      return
    }
    await loginUser(valueLogin,password)
     let response = await loginUser(valueLogin,password)
     if(response &&+response.EC ===0){
      let data ={
        isAuthenticated: true,
        token: 'fake token'
      }
      sessionStorage.setItem('account',JSON.stringify(data))
      history.push('/users')
      window.location.reload()
       toast.success(response.EM)
     }
     if(response&&response.data && +response.EC !==0){
      toast.error(response.EM)
     }
     console.log(response.data)
  }
  let history =useHistory()
  const handleCreateNewAccount=()=>{
  history.push("/register")
  }
  const handlePressEnter=(event)=>{
    if(event.charCode ===13 && event.code==="Enter"){
      handleLogin()
    }
  }
  useEffect(()=>{
    let session = sessionStorage.getItem('account')
    if(session){
      history.push("/")
      window.location.reload()
    }
  },[])
  return(
    <div className="login-container mt-3">
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
            <input className={objValidInput.isValidValueLogin ? 'form-control':'is-invalid form-control'} type="text" placeholder='Email address or phone number'
            value={valueLogin} onChange={(event)=>{setValueLogin(event.target.value)}}
            />
            <input className={objValidInput.isValidValuePassword ? 'form-control':'is-invalid form-control'}  type="password" placeholder='Password'
             value={password} onChange={(event)=>{setPassword(event.target.value)}}
            onKeyPress={(event)=>handlePressEnter(event)}
            />
            <button className='btn btn-primary'onClick={()=>handleLogin()}>Login</button>
            <span className='text-center'><a className='forgot-password' href='#'>Forgot your password?</a></span>
            <hr/>
            <div className='text-center'>
            <button className='btn btn-success'onClick={()=>handleCreateNewAccount()}>Create new accout</button>
            </div>
           </div>
        </div>
      </div>
    </div>
  )
}
export default Login
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState,useEffect } from 'react';
import './Users.scss'
import { fetchGroup,creatNewUser } from '../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash'
const ModalUser =(props)=>{
  const [userGroups,setUserGroups]=useState([])
  const defaultUserData={
    email:'',
    phone:'',
    username:'',
    password:'',
    address:'',
    sex:'',
    group:''
  }
  const validInputsDefault ={
    email:true,
    phone:true,
    username:true,
    password:true,
    address:true,
    sex:true,
    group:true
  }
  const [userData,setUserData]=useState(defaultUserData)
  const [validInput,setValidInput]=useState(validInputsDefault)
  useEffect(()=>{
    getGroups()
  },[])
  const getGroups =async()=>{
   let res = await fetchGroup()
   if(res&& res.data&&res.data.EC===0){
    setUserGroups(res.data.DT)
    if(res.data.DT && res.data.DT.length>0){
      let groups=res.data.DT
      setUserData({...userData,group:groups[0].id})
    }
   }else{
    toast.error(res.data.EM)
   }
  }
  const handleOnchangeInput =(value,name)=>{
    let _userData=_.cloneDeep(userData)
    _userData[name]=value
    setUserData(_userData)
  }
  const checkValidateInput=()=>{
    setValidInput(validInputsDefault)
    let arr=['email','phone','password','group']
    let check = true
    for(let i=0;i<arr.length;i++){
      if(!userData[arr[i]]){
        let _validInputs =_.cloneDeep(validInputsDefault)
        _validInputs[arr[i]]=false
        setValidInput(_validInputs)
        toast.error(`Empty input ${arr[i]}`)
        check = false;
        break;
      }
    }
    return check;
  }
  const handleConfirmUser=async()=>{
    let check =checkValidateInput()
    if(check===true){
      let res = await creatNewUser({...userData,groupId:userData['group']})
      if(res.data && res.data.EC===0){
        props.onhide()
        setUserData({...defaultUserData,group:userGroups[0].id})
      }else{
        toast.error(`error create user...`)
      }
    }
  }
return (
  <>
  <Modal size="lg"show={props.show} className='modal-user' onHide={props.onhide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span>{props.title}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className='content-body row'>
        <div className='col-12 col-sm-6 form-group'>
           <label>Email adress (<span className='red'>*</span>) :</label>
           <input className={validInput.email ? 'form-control':'form-control is-invalid'} type='email' value={userData.email}
           onChange={(event)=>handleOnchangeInput(event.target.value,"email")}
           />
        </div>
        <div className='col-12 col-sm-6 form-group'>
           <label>Phone Number (<span className='red'>*</span>) :</label>
           <input className={validInput.phone ? 'form-control':'form-control is-invalid'} type='text' value={userData.phone}
           onChange={(event)=>handleOnchangeInput(event.target.value,"phone")}
           />
        </div>
        <div className='col-12 col-sm-6 form-group'>
           <label>Username :</label>
           <input className={validInput.username ? 'form-control':'form-control is-invalid'}  type='text' value={userData.username}
           onChange={(event)=>handleOnchangeInput(event.target.value,"username")}
           />
        </div>
        <div className='col-12 col-sm-6 form-group'>
           <label>Password (<span className='red'>*</span>) :</label>
           <input className={validInput.password ? 'form-control':'form-control is-invalid'}  type='password' value={userData.password}
           onChange={(event)=>handleOnchangeInput(event.target.value,"password")}
           />
        </div>
        <div className='col-12 col-sm-12 form-group'>
           <label>Address (<span className='red'>*</span>) :</label>
           <input className='form-control' type='text' 
           onChange={(event)=>handleOnchangeInput(event.target.value,"address")}
           />
        </div>
        <div className='col-12 col-sm-6 form-group'>
        <label>Gender :</label>
           <select className='form-select' onChange={(event)=>handleOnchangeInput(event.target.value,"sexl")}>
            <option defaultValue="Male">Male</option>
            <option value="Femake">Female</option>
            <option value="Other">Other</option>
            </select>
        </div>
        <div className='col-12 col-sm-6 form-group'>
           <label>Group: (<span className='red'>*</span>) :</label>
           <select className={validInput.group ? 'form-select':'form-select is-invalid'}  onChange={(event)=>handleOnchangeInput(event.target.value,"group")}>
            {userGroups.length>0 && userGroups.map((item,index)=>{
              return(
                <option key={`group-${index}`} value={item.id}>{item.name}</option>
              )
            })}
            </select>
        </div>
      </div>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={props.onhide}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleConfirmUser()}>
            Save
          </Button>
      </Modal.Footer>
    </Modal>
  </>
)
}
export default ModalUser
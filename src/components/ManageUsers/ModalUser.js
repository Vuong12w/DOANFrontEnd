import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState,useEffect } from 'react';
import './Users.scss'
import { fetchGroup,creatNewUser,updateCurrentUser } from '../../services/userService';
import { toast } from 'react-toastify';
import _ from 'lodash'
const ModalUser =(props)=>{
  const {action,dataModalUser}=props
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
  useEffect(()=>{
    if(action ==='UPDATE'){
      setUserData({...dataModalUser,group: dataModalUser.Group ? dataModalUser.Group.id:''})
    }
    
  },[dataModalUser])
  useEffect(()=>{
   if(action ==='CREATE'){
    if(userGroups&&userGroups.length>0){
      setUserData({...userData,group:userGroups[0].id})
    }
   }
   
  },[action])
  const getGroups =async()=>{
   let res = await fetchGroup()
   if(res&& res.EC===0){
    setUserGroups(res.DT)
    if(res.DT && res.DT.length>0){
      let groups=res.DT
      setUserData({...userData,group:groups[0].id})
    }
   }else{
    toast.error(res.EM)
   }
  }
  const handleOnchangeInput =(value,name)=>{
    let _userData=_.cloneDeep(userData)
    _userData[name]=value
    setUserData(_userData)
  }
  const checkValidateInput=()=>{
    if(action==='UPDATE')return true;
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
      let res = action==='CREATE'? 
      await creatNewUser({...userData,groupId:userData['group']})
      : await updateCurrentUser({...userData,groupId:userData['group']});
      console.log("API Response:", res)
      if(res && res.EC===0){
        props.onhide()
        setUserData({...defaultUserData,group: userGroups&&userGroups.length>0? userGroups[0].id:''})
      }if(res.data&&res.EC !==0){
        toast.error(res.EM)
        let _validInputs =_.cloneDeep(validInputsDefault)
        _validInputs[res.DT]=false
        setValidInput(_validInputs)
      }
    }
  }
  const handleCloseModalUser=()=>{
    props.onhide()
    setUserData(defaultUserData)
    setValidInput(validInputsDefault)
  }
return (
  <>
  <Modal size="lg"show={props.show} className='modal-user' onHide={()=>handleCloseModalUser()}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span>{props.action ==='CREATE'?'Create new user':'Edit a user'}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className='content-body row'>
        <div className='col-12 col-sm-6 form-group'>
           <label>Email adress (<span className='red'>*</span>) :</label>
           <input
           disabled={action==='CREATE'?false:true}
           className={validInput.email ? 'form-control':'form-control is-invalid'} type='email' value={userData.email}
           onChange={(event)=>handleOnchangeInput(event.target.value,"email")}
           />
        </div>
        <div className='col-12 col-sm-6 form-group'>
           <label>Phone Number (<span className='red'>*</span>) :</label>
           <input
            disabled={action==='CREATE'?false:true}
           className={validInput.phone ? 'form-control':'form-control is-invalid'} type='text' value={userData.phone}
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
          {action === 'CREATE'&&
          <>
           <label>Password (<span className='red'>*</span>) :</label>
           <input className={validInput.password ? 'form-control':'form-control is-invalid'}  type='password' value={userData.password}
           onChange={(event)=>handleOnchangeInput(event.target.value,"password")}
           />
           </>
          }
        </div>
        <div className='col-12 col-sm-12 form-group'>
           <label>Address (<span className='red'>*</span>) :</label>
           <input className='form-control' type='text' 
           onChange={(event)=>handleOnchangeInput(event.target.value,"address")}
           value={userData.address}
          />
        </div>
        <div className='col-12 col-sm-6 form-group'>
        <label>Gender :</label>
           <select className='form-select' onChange={(event)=>handleOnchangeInput(event.target.value,"sex")}
            value={userData.sex}
            >
            <option defaultValue="Male">Male</option>
            <option value="Femake">Female</option>
            <option value="Other">Other</option>
            </select>
        </div>
        <div className='col-12 col-sm-6 form-group'>
           <label>Group: (<span className='red'>*</span>) :</label>
           <select className={validInput.group ? 'form-select':'form-select is-invalid'}  onChange={(event)=>handleOnchangeInput(event.target.value,"group")}
            value={userData.group}
            >
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
      <Button variant="secondary" onClick={()=>handleCloseModalUser()}>
            Close
          </Button>
          <Button variant="primary" onClick={()=>handleConfirmUser()}>
            {action ==='CREATE'?'Save':'Update'}
          </Button>
      </Modal.Footer>
    </Modal>
  </>
)
}
export default ModalUser
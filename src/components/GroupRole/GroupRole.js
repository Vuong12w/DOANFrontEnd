import { useEffect, useState } from 'react'
import './GroupRole.scss'
import { fetchGroup } from '../../services/userService'
import { toast } from 'react-toastify'
import { fetchAllRole,fetchRolesByGroup,assignRoleToGroup } from '../../services/roleService'
import _ from 'lodash'
const GroupRole =()=>{
  const [userGroups,setUserGroups]=useState([])
  const [selectGroup,setSelectGroup]=useState("")
  const [listRoles,setListRoles]=useState([])
  const [assignRolesByGroup,setAssignRolesByGroup]=useState([])
  useEffect(()=>{
    getGroups()
   getAllRoles()
  },[])

  const getGroups =async()=>{
    let res = await fetchGroup()
    if(res&& res.EC===0){
     setUserGroups(res.DT)
    }else{
     toast.error(res.EM)
    }
   }
   const getAllRoles=async()=>{
    let data= await fetchAllRole()
    console.log(data)
    if(data&&+data.EC===0){
      setListRoles(data.DT)
    }
   }
   const handleOnchangeGroup=async(value)=>{
    setSelectGroup(value)
    if(value){
      let data= await fetchRolesByGroup(value)
    if(data&&data.EC===0){
     let result=buldDataRolesByGroup(data.DT.Roles,listRoles)
     setAssignRolesByGroup(result)
    }
    }
   }
   const buldDataRolesByGroup =(groupRoles,allroles)=>{
    let result=[]
    if(allroles&& allroles.length>0){
      allroles.map(role=>{
        let object={}
        object.url=role.url
        object.id=role.id
        object.description=role.description
        object.isAssigned=false
        if(groupRoles&&groupRoles.length>0){
          object.isAssigned=groupRoles.some(item=>item.url===object.url)
        }
        result.push(object)
      })
    }
    return result
   }
   const handleSelectRole=(value)=>{
     const _assignRolesByGroup=_.cloneDeep(assignRolesByGroup) 
     let foundIndex=_assignRolesByGroup.findIndex(item=>+item.id===+value)
     if(foundIndex>-1){
      _assignRolesByGroup[foundIndex].isAssigned=!_assignRolesByGroup[foundIndex].isAssigned
     }
     setAssignRolesByGroup(_assignRolesByGroup)
   }
   const buildDataToSave=()=>{
    let result={}
    const _assignRolesByGroup=_.cloneDeep(assignRolesByGroup)
    result.groupId= selectGroup
    let groupRolesFilter=_assignRolesByGroup.filter(item=>item.isAssigned===true)
    let finalGroupRoles=groupRolesFilter.map(item=>{
      let data ={groupId:+selectGroup,roleId:+item.id}
      return data
    })
    result.groupRoles=finalGroupRoles
    return result
   }
   const handleSave =async ()=>{
    let data = buildDataToSave()
    let res = await assignRoleToGroup(data)
    if(res&&res.EC===0){
      toast.success(res.EM)
    }else{
      toast.error(res.EM)
    }
   }
return(
 <div className='group-role-container'> 
  <div className='container mt-3'>
        <h4>Group Role:</h4>
        <div className='assign-group-role'>
          
          <div className='col-12 col-sm-6 form-group'>
           <label>Select Group: (<span className='red'>*</span>) :</label>
           <select className='form-select'
            onChange={(event)=>handleOnchangeGroup(event.target.value)}
            >
              <option value="">Please select group</option>
            {userGroups.length>0 && userGroups.map((item,index)=>{
              return(
                <option key={`group-${index}`} value={item.id}>{item.name}</option>
              )
            })}
            </select>
        </div>
        <hr/>
        { selectGroup &&
        <div className='roles'>
        <h5>Assign Roles:</h5>
        {
        assignRolesByGroup && assignRolesByGroup.length>0 && assignRolesByGroup.map((item,index)=>{
           return (
           <div className="form-check" key={`list-role-${index}`}>
          <input className="form-check-input" type="checkbox" value={item.id} id={`list-role-${index}`} checked={item.isAssigned} onChange={(event)=>handleSelectRole(event.target.value)} />
          <label className="form-check-label" htmlFor={`list-role-${index}`}>
             {item.url}
  </label>
</div>
           )
        })
        }
             <div className='mt-3'>
              <button className='btn btn-warning' onClick={()=>handleSave()}>Save</button>
              </div>
        </div>
        }
        </div>
  </div>
 </div>
)
}
export default GroupRole
import { useEffect, useState } from "react"
// import { useHistory } from "react-router-dom/cjs/react-router-dom"
import './Users.scss'
import { fetchAllUsers,deleteUser } from "../../services/userService"
import ReactPaginate from 'react-paginate';
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";
const Users =(props)=>{
  // let history = useHistory()
  // useEffect(()=>{
  //   let session = sessionStorage.getItem('account')
  //  if(!session){
  //   history.push("/login")
  //   window.location.reload()
  //  }
  // },[])
  const [listUsers,setListUsers]=useState([])
  const [currentPage,setCurrentPage]=useState(1)
  const [currentLimit,setCurrentLimit]=useState(3)
  const [totalPages,setTotalPages]=useState(0)
  const [isShowModalDelete,setIsShowModalDelete]=useState(false)
  const [dataModal,setDataModal]=useState('')
  const [isShowModalUser,setIsShowModalUser]=useState(false)
  const [actionModalUser,setActionModalUser]=useState("CREATE")
  const [dataModalUser,setDataModalUser]=useState({})
  useEffect(()=>{
    fetchUsers()
  },[currentPage])
  
  const fetchUsers=async()=>{
    let response = await fetchAllUsers(currentPage,currentLimit)
     if(response&&response.EC===0){
       setTotalPages(response.DT.totalPages)
       setListUsers(response.DT.users)
    }else{
    }
  }
  const handlePageClick = async(event) => {
    setCurrentPage(+event.selected+1)
   
  };
  const handleDeleteUser=async(user)=>{
    setDataModal(user)
    setIsShowModalDelete(true)
  }
  const handleClose=()=>{
    setIsShowModalDelete(false)
    setDataModal({})
  }
  const confirmDeleteUser=async()=>{
    let respone = await deleteUser(dataModal)
    if(respone && respone.EC===0){
      toast.success(respone.EM)
      await fetchUsers()
      setIsShowModalDelete(false)
    }else{
      toast.error(respone.EM)
    }
  }
  const onhideModalUser=async()=>{
    setIsShowModalUser(false)
    setDataModalUser({})
    await fetchUsers()
  }
  const handleEditUser=(user)=>{
    setActionModalUser("UPDATE")
    setDataModalUser(user)
    setIsShowModalUser(true)
  }
  const handleRefresh=async()=>{
    window.location.reload()
    await fetchUsers()
  }
  return(
    <>
    <div className="container">
    <div className="manage-users-container">
      <div className="user-header">
         <div className="title mt-3"><h3>Manage Users</h3></div>
         <div className="actions my-3">
          <button className="btn btn-success refresh" onClick={()=>handleRefresh()}> <i className="fa fa-refresh"></i>Refresh</button>
          <button className="btn btn-primary" onClick={()=>{setIsShowModalUser(true)
    setActionModalUser("CREATE")}}><i className="fa fa-plus-circle"></i>Add new user</button>
         </div>
      </div>
      <div className="user-body">
      <table className="table table-bordered table-hover">
  <thead>
    <tr>
      <th scope="col">NO</th>
      <th scope="col">Id</th>
      <th scope="col">Email</th>
      <th scope="col">Username</th>
      <th scope="col">Group</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {listUsers&&listUsers.length>0 ?
    <>{listUsers.map((item,index)=>{
      return(
        <tr key={`row-${index}`}>
          <td>{(currentPage-1)*currentLimit+index+1}</td>
          <td>{item.id}</td>
          <td>{item.email}</td>
          <td>{item.username}</td>
          <td>{item.Group?item.Group.name:''}</td>
          <td>
            <button className="btn btn-warning mx-3"
            onClick={()=>handleEditUser(item)}
            > <i className="fa fa-pencil"></i>Edit</button>
            <button className="btn btn-danger"
            onClick={()=>handleDeleteUser(item)}
            > <i className="fa fa-trash-o"></i>Delete</button>
          </td>
        </tr>
      )
    })}</>
    :
    <><tr><td>Not found user</td></tr></>}
  </tbody>
</table>
      </div>
      {totalPages>0&&
      <div className="user-footer">
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
      </div>
      }
    </div>
    </div>
    <ModalDelete 
    show={isShowModalDelete}
    handleClose={handleClose}
    confirmDeleteUser={confirmDeleteUser}
    dataModal={dataModal}
    />
    <ModalUser
    
    onhide={onhideModalUser}
    show={isShowModalUser}
    action={actionModalUser}
    dataModalUser={dataModalUser}
    />
    </>
  )
}
export default Users
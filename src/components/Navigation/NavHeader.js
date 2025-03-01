
import React, {  useContext, useEffect, useState } from 'react'
import './Nav.scss'
import {Link, NavLink,useHistory,useLocation } from 'react-router-dom/cjs/react-router-dom'
import { UserContext } from '../../context/UserContext'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../../logo192.png'
import { logoutUser } from '../../services/userService';
import { toast } from 'react-toastify';
const NavHeader =(props)=>{
  const {user,logoutContext}=useContext(UserContext)
  const location =useLocation()
  const history =useHistory()
  const handleLogout=async()=>{
    let data= await logoutUser()
    localStorage.removeItem("jwt")
    logoutContext()
    if(data&&data.EC===0){
      toast.success('Logout succeeds...')
        history.push('/login')
    }else{
      toast.error(data.EM)
    }
  }
  if(user && user.isAuthenticated === true ||location.pathname ==='/'){
   return (
      <>
    
    {/* <div className="topnav">
  <NavLink exact to="/">Home</NavLink>
  <NavLink to="/users">Users</NavLink>
  <NavLink to="/project">project</NavLink>
  <NavLink to="/about">About</NavLink>
</div> */}
<div className='nav-header'>
     <Navbar expand="lg" className="bg-body-tertiary " bg='header'>
      <Container>
        <Navbar.Brand href="#home">
          <img
          
          src={logo}
          width="30"
          height="30"
          className='d-inline-block align-top '
          />
         <span className='brand-name'>React</span> </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <NavLink exact to="/" className='nav-link'>Home</NavLink>
          <NavLink to="/users" className='nav-link'>Users</NavLink>
          <NavLink to="/roles" className='nav-link'>Roles</NavLink>
          <NavLink to="/project" className='nav-link'>project</NavLink>
          <NavLink to="/about" className='nav-link'>About</NavLink>
          </Nav>
          <Nav>
            {user && user.isAuthenticated === true
            ?
            <>
            <Nav.Item className='nav-link'>Wellcome {user.account.username}</Nav.Item>
            <NavDropdown title="Setting" id="basic-nav-dropdown">
              <NavDropdown.Item >Change password</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item >
                <span onClick={()=>handleLogout()}>
                Logout
                </span>
              </NavDropdown.Item>
            </NavDropdown>
            </>
            :
            <Link className='nav-link' to='/login'>Login</Link>
            }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
      </>
   )
  }else{
    return<>
    
    </>
  }
}
export default NavHeader

import './App.scss';
import Nav from './components/Navigation/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react';
import _ from "lodash";
import AppRoutes from './routes/AppRoute';
function App() {
  const [account,setAccount]=useState({})
  useEffect(()=>{
    let session = sessionStorage.getItem('account')
   if(session){
     setAccount(JSON.parse(session))
   }
  },[])
  return (
    <>
    <Router>
    <div className='app-header'>
       <Nav/>
    </div>
   <div className='app-container'>
    {/* {account && !_.isEmpty(account) && account.isAuthenticated && <Nav/>} */}
    {/* <Nav/> */}
    <AppRoutes/>
   </div>
   
   <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
 </Router>
  </>
  );
}

export default App;

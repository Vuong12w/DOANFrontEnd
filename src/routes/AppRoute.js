import {
  // BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from '../components/Login/login';
import Register from '../components/Register/Register';
import Users from '../components/ManageUsers/Users';
import PrivateRoutes from "./PrivateRoute";
const AppRoutes =(props)=>{
  const Project =()=>{
    return (
      <span>project</span>
    )
  }
return(
  <>
  <Switch>
    <PrivateRoutes path="/users" component={Users}/>
    <PrivateRoutes path="/project" component={Project}/>
   <Route exact path="/">
     home
   </Route>
   {/* <Route path="/project">
     project
   </Route> */}
   <Route path="/login">
     <Login/>
   </Route>
   <Route path="/register">
     <Register/>
   </Route>
   <Route path="*">
     c404 notfound
   </Route>
 </Switch>
  </>
)
}
export default AppRoutes;
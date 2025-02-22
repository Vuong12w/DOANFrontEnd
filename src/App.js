
import './App.scss';
// import Nav from './components/Navigation/Nav';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Login from './components/Login/login';
import Register from './components/Register/Register';
function App() {
  return (
    <Router>
   <div className='app-container'>
    {/* <Nav/> */}
    <Switch>
   <Route exact path="/">
     home
   </Route>
   <Route path="/news">
     news
   </Route>
   <Route path="/about">
     about
   </Route>
   <Route path="/contact">
     contact
   </Route>
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
   </div>
 </Router>
  );
}

export default App;

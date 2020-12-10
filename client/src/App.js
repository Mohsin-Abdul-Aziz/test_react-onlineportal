import './App.css';
import Landing from './components/layout/frontpage';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Signup from './components/auth/register';
import Login from './components/auth/login';
import Loginwithgmail from './components/auth/loginwithgmail';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser,logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';
import Dashboard from './components/dashboard/Dashboard';
import createProfile from './components/create-profile/CreateProfile'
import PrivateRoute from './components/common/PrivateRoute';
// check for token
if(localStorage.jwtToken){
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded=jwt_decode(localStorage.jwtToken);
  // set user and aiAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime= Date.now() / 1000;
  if(decoded.exp< currentTime){
    //Logout user
    store.dispatch(logoutUser());
  //Todo: clear current Profile
    store.dispatch(clearCurrentProfile());
  //Redirect to login
  window.location.href='/login'

}
}
function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App"> 

       <Header />
      <Route exact path ="/" component={Landing} />
      <div className="container">

        <Route exact path='/Signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/loginwithsignup' component={Loginwithgmail} />
        <Switch>
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
       </Switch>
       <Switch>
        <PrivateRoute exact path='/create-profile' component={createProfile} />
       </Switch>
        </div> 
      <Footer />
    </div>
    </Router>
    </Provider>
  );
}

export default App;

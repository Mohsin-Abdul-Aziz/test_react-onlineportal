import './App.css';
import Landing from './components/layout/frontpage';
import Header from './components/layout/header';
import Footer from './components/layout/footer';
import Signup from './components/auth/register';
import Login from './components/auth/login';
import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      <Route exact path ="." component={Landing} />
      <div class="container">
        <Route exact path='/Signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        </div>
      <Footer />
    </div>
    </Router>
  );
}

export default App;

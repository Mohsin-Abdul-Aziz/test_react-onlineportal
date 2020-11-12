import { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import {loginUsergmail} from '../../actions/authActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'

class Loginwithgmail extends Component {
    constructor() {
        super();
        this.state = {
            client: '224211842-dq75klkujsdmii7fls3bc4ilkqd7vpta.apps.googleusercontent.com',
            cookie: 'single_host_origin'
        }
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    responseGoogle(response) {
        console.log(response)
        this.props.loginUsergmail(response);
        
    }
    componentWillReceiveProps(newProps) {
        if (newProps.auth.isAuthenicated) {
           this.props.history.push('/dashboard')
        }
    }
render(){
return(
    <div className="register">
        <div className="container">
        <GoogleLogin
        clientId= {this.state.client}
        buttonText="Login"
        onSuccess= {this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={this.state.cookie}
        />
    </div>
</div>
)}};


Loginwithgmail.propTypes={
    loginUsergmail:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
   // errors:PropTypes.object.isRequired
  }
  const mapStateToProps=(state)=>({
    auth:state.auth,
    //errors:state.errors
  })
export default connect(mapStateToProps, {loginUsergmail})(Loginwithgmail);
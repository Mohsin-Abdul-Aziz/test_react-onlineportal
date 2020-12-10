import { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {loginUser} from '../../actions/authActions';
import TextfieldGroup from '../common/TextFieldGroup';
class Login extends Component{
  constructor(){
    super();
    this.state={
      email:'',
      password:'',
      errors:{}
    }

    this.onChange=this.onChange.bind(this)
    this.submitform=this.submitform.bind(this);
  }

  submitform(e){
    e.preventDefault()

    const userData={
      email:this.state.email,
      password:this.state.password,
    }
    //console.log(userData)
    
  this.props.loginUser(userData);
  }

  static getDerivedStateFromProps(props, state) {
    if(props.auth.isAuthenicated){
      props.history.push('/dashboard')
    }

    if (props.errors !== state.errors) {
      return {
        errors: props.errors      };
    }
    // Return null to indicate no change to state.
    return null;
  }
  componentDidMount(){
    if(this.props.auth.isAuthenicated){
      this.props.history.push('/dashboard')
    }
  }

  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }
render(){
  const {errors}=this.state;
  //console.log(errors)
  //console.log(user)
  return(
  <div className="login">
  <div className="container">
    <div className="row">
      <div className="col-md-8 m-auto">
        <h1 className="display-4 text-center">Log In</h1>
        <p className="lead text-center">Sign in to your DevConnector account</p>
        <form onSubmit={this.submitform}>
          <TextfieldGroup 
          placeholder='Email Address'
          name='email'
          type='email'
          value={this.state.email}
          onChange={this.onChange}
          error={errors.email}
          info='This site uses Gravatar so if you want a profile image, use a Gravatar email'

        />
        <TextfieldGroup 
          placeholder='Password'
          name='password'
          type='password'
          value={this.state.password}
          onChange={this.onChange}
          error={errors.password}
        />
          <input type="submit" className="btn btn-info btn-block mt-4" />
        </form>
      </div>
    </div>
  </div>
</div>
    )}}
    Login.propTypes={
      loginUser:PropTypes.func.isRequired,
      auth:PropTypes.object.isRequired,
      errors:PropTypes.object.isRequired
    }
    const mapStateToProps=(state)=>({
      auth:state.auth,
      errors:state.errors
    })
export default connect(mapStateToProps, {loginUser})(Login);
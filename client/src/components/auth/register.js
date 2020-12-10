import { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {registeruser} from '../../actions/authActions';
import {withRouter} from 'react-router-dom';
import TextfieldGroup from '../common/TextFieldGroup'
 
class Signup extends Component{
  constructor(){
    super();
    this.state={
      name:'',
      email:'',
      password:'',
      password2:'',
      errors:{}
    }
    
    this.onChange=this.onChange.bind(this)
    this.submitform=this.submitform.bind(this);
  }
  onChange(e){
    this.setState({[e.target.name]:e.target.value})
  }
 
  static getDerivedStateFromProps(props, state) {
    if (props.errors !== state.errors) {
      return {
        errors: props.errors      };
    }
    // Return null to indicate no change to state.
    return null;
  }
  componentDidMount(props){
    if(this.props.auth.isAuthenicated){
      this.props.history.push('/dashboard')
    }
  }
  submitform(e){
    e.preventDefault()

    const newUser={
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
      password2:this.state.password2
    }
    console.log(newUser)
    this.props.registeruser(newUser,this.props.history);

  }
render(){
 const {errors}=this.state;

  const {user} =this.props.auth;
  
    return(
  <div className="register">
    {user? user.name:null}
    <div className="container">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">Create your DevConnector account</p>
          <form onSubmit={this.submitform}>
            <TextfieldGroup 
            placeholder='Please enter your name'
            name='name'
            type='name'
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />
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
          <TextfieldGroup 
            placeholder='Confirm Password'
            name='password2'
            type='password2'
            value={this.state.password2}
            onChange={this.onChange}
            error={errors.password2}
          />  
            
            <input type="submit" className="btn btn-info btn-block mt-4" />
          </form>
        </div>
      </div>
    </div>
  </div>
    )}};
    registeruser.prototype={
      registeruser:PropTypes.func.isRequired,
      auth:PropTypes.object.isRequired,
      errors:PropTypes.object.isRequired
    }
    const mapStateToProps=(state)=>({
      auth:state.auth,
      errors:state.errors
    })
export default connect(mapStateToProps, {registeruser})(withRouter(Signup));
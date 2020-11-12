import { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import {loginUser} from '../../actions/authActions';
import classnames from 'classnames';

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
    console.log(userData)
    
  this.props.loginUser(userData);
  }
  // componentWillReceiveProps(newProps){
  //   console.log(newProps.auth)
  //   if(newProps.auth.isAuthenicated){
  //     this.props.history.push('/dashboard')
  //   }
  //   if(newProps.errors){
  //     this.setState({errors:newProps.errors})
  //   }
   
  // }
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
  console.log(errors)
  const {user} =this.props.auth;
  console.log(user)
  return(
  <div className="login">
  <div className="container">
    <div className="row">
      <div className="col-md-8 m-auto">
        <h1 className="display-4 text-center">Log In</h1>
        <p className="lead text-center">Sign in to your DevConnector account</p>
        <form onSubmit={this.submitform}>
        <div className="form-group">
              <input 
              type="email" 
              className={classnames('form-control form-control-lg',{
                'is-invalid':errors.email})}  
              placeholder="Email Address" 
              name="email"
              value={this.state.email}
              onChange={this.onChange} />
              {errors.email && (
               <div className="invalid-feedback">
                 {errors.email}
               </div>
                 )}
              <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
            </div>
            <div className="form-group">
              <input 
              type="password" 
              className={classnames('form-control form-control-lg',{
                'is-invalid':errors.password})}  
              placeholder="Password" 
              name="password" 
              value={this.state.password}
              onChange={this.onChange}
              />
              {errors.password && (
               <div className="invalid-feedback">
                 {errors.password}
               </div>
                 )}
            </div>
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
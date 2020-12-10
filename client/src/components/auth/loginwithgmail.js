import { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import {loginUsergmail} from '../../actions/authActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import axios from 'axios';
class Loginwithgmail extends Component {
    constructor() {
        super();
        this.state = {
            client: '561730509621-f3e56i7rccnb5hb5bennd8gnrurjd54p.apps.googleusercontent.com',
            cookie: 'single_host_origin',
            errors:{},
            selectedFile: null,
            imageUrl:'',
            file: null,

        }
        this.responseGoogle = this.responseGoogle.bind(this);
    }
    onChangeHandler=event=>{
        this.setState({
          selectedFile: event.target.files[0],
          loaded: 0,
        })
      }
    onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile)
        axios.post("/api/users/projects", data, { // receive two parameter endpoint url ,form data 
      })
      .then(res => { // then print response status
        console.log(res.statusText)
        console.log(res.data[0])
        this.setState({
            imageUrl: './publicimages/'+res.data[0].filename
          })
      })
    }
    responseGoogle(response) {
        this.props.loginUsergmail(response);
        
    }
    static getDerivedStateFromProps(props, state) {
        if (props.auth.isAuthenicated) {
            props.history.push('/dashboard')
         }
        if (props.errors !== state.errors) {
          return {
            errors: props.errors   
           };
        }
        // Return null to indicate no change to state.
        return null;
      }
render(){
return(
    <div className="register">
        <img src={this.state.imageUrl}  alt="" />

        <div className="container">
        <GoogleLogin
        clientId= {this.state.client}
        buttonText="Login"
        onSuccess= {this.responseGoogle}
        onFailure={this.responseGoogle}
        cookiePolicy={this.state.cookie}
        />
         {/* <input type="file" name="file" onChange={this.onChangeHandler}/>
         <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>  */}

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
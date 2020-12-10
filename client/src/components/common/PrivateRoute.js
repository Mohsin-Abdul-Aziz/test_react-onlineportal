import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
const PrivateRoute = ({component: Component,auth, ...rest}) => {
    return (
        
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        
        <Route {...rest} render={props => (
            auth.isAuthenicated === true ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
    
};

PrivateRoute.protoTypes={
    auth:PropTypes.object.isRequired
}
const mapStateToProp =state=>({
    auth:state.auth
})

export default connect(mapStateToProp)(PrivateRoute)

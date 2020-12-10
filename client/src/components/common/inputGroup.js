import React from 'react'
import classnames from 'classnames';
import PropType from 'prop-types';

const InputGroup =({
    name,
    placeholder,
    value,
    error,
    icon,
    type,
    onChange,
})=> {
    return (
        <div className="form-groupinput-group mb-3">
            <div className="input-group-prepend">
            <span className="input-group-text">
            <i className={icon} />
            </span>
            </div>
        <input 
        type={type}
        className={classnames('form-control form-control-lg',{
          'is-invalid':error})}  
        placeholder={placeholder} 
        name={name}
        value={value}
        onChange={onChange} 
       />
        {error && (<div className="invalid-feedback"> {error} </div>  )}
      </div>
    )
}
InputGroup.PropType={
    name:PropType.string.isRequired,
    placeholder:PropType.string,
    value:PropType.string.isRequired,
    icon:PropType.string,
    error:PropType.string,
    type:PropType.string.isRequired,
    onChange:PropType.string.isRequired,
}

InputGroup.defaultProps={
    type:'text'
}
export default InputGroup;
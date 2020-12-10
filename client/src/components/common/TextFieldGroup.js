import React from 'react'
import classnames from 'classnames';
import PropType from 'prop-types';

const TextFieldGroup =({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
})=> {
    return (
        <div className="form-group">
        <input 
        type={type}
        className={classnames('form-control form-control-lg',{
          'is-invalid':error})}  
        placeholder={placeholder} 
        name={name}
        value={value}
        onChange={onChange} 
        disabled={disabled}/>
        {info && (<div className="form-text text-muted"> {info} </div>  )}
        {error && (<div className="invalid-feedback"> {error} </div>  )}
      </div>
    )
}
TextFieldGroup.PropType={
    name:PropType.string.isRequired,
    placeholder:PropType.string,
    value:PropType.string.isRequired,
    info:PropType.string,
    error:PropType.string,
    type:PropType.string.isRequired,
    onChange:PropType.string.isRequired,
    disabled:PropType.string,
}
export default TextFieldGroup;
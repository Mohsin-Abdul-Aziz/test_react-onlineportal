import React from 'react'
import classnames from 'classnames';
import PropType from 'prop-types';

const TextAreaFieldGroup =({
    name,
    placeholder,
    value,
    error,
    info,
    type,
    onChange,
})=> {
    return (
        <div className="form-group">
        <textarea 
        type={type}
        className={classnames('form-control form-control-lg',{
          'is-invalid':error})}  
        placeholder={placeholder} 
        name={name}
        value={value}
        onChange={onChange} 
       />
        {info && (<div className="form-text text-muted"> {info} </div>  )}
        {error && (<div className="invalid-feedback"> {error} </div>  )}
      </div>
    )
}
TextAreaFieldGroup.PropType={
    name:PropType.string.isRequired,
    placeholder:PropType.string,
    value:PropType.string.isRequired,
    info:PropType.string,
    error:PropType.string,
    onChange:PropType.string.isRequired,
}
export default TextAreaFieldGroup;
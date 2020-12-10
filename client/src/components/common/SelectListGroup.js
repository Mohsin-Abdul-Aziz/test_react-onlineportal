import React from 'react'
import classnames from 'classnames';
import PropType from 'prop-types';

const SelectListGroup =({
    name,
    value,
    error,
    info,
    onChange,
    options
})=> {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
        {option.label}
        </option>
    ));
    return (
        <div className="form-group">
        <select 
        className={classnames('form-control form-control-lg',{
          'is-invalid':error})}  
        name={name}
        value={value}
        onChange={onChange}>
            {selectOptions}
            </select>
        {info && (<div className="form-text text-muted"> {info} </div>  )}
        {error && (<div className="invalid-feedback"> {error} </div>  )}
      </div>
    )
}
SelectListGroup.PropType={
    name:PropType.string.isRequired,
    value:PropType.string.isRequired,
    info:PropType.string,
    error:PropType.string,
    onChange:PropType.string.isRequired,
    options:PropType.array.isRequired
}
export default SelectListGroup;
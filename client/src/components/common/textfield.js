import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

const textfieldgroup = (name,value,error,type,onChange,diabled) =>{
    return(
        <div>
            <div className="input-field col s12">
                <input
                  onChange={onChange}
                  value={value}
                  error={error}
                  id={type}
                  type={type}
                  className={classnames("", {
                    invalid: {error}
                  })}
                  diabled={diabled}
                />
                <label htmlFor={type}>{type}</label>
                <span className="red-text">
                  {error}
                </span>
              </div>
        </div>
    )
}

textfieldgroup.propTypes= {
    name:PropTypes.string.isRequired,
    value:PropTypes.string.isRequired,
    error:PropTypes.string,
    type:PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    disabled:PropTypes.string 
}
textfieldgroup.defaultProps = {
    type:'text'
}

export default textfieldgroup;
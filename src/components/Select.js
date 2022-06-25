import React from 'react';
import PropTypes from 'prop-types';

import '../components/select.css';

class Select extends React.Component {
  render() {
    const { label, options, name, value, onChange } = this.props;

    return (
      <label htmlFor={name}>
        {label}
        <select
          className='select'
          data-testid={`${name}-input`}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;

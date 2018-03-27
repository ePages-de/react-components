import PropTypes from 'prop-types'
import React from 'react'

import formField from './formField'

export class DropDownFieldRaw extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    scopedName: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired
  }

  render () {
    const {value, onChange, name, scopedName, options, ...other} = this.props // eslint-disable-line no-unused-vars

    return (
      <select
        {...other}
        name={scopedName}
        value={options.find((opt) => opt.value === value).value}
        onChange={(event) => onChange(event.target.value)}>
        {options.map((option, index) =>
          <option
            key={index}
            value={option.value}>
            {option.label}
          </option>
        )}
      </select>
    )
  }
}

export default formField()(DropDownFieldRaw)

import PropTypes from 'prop-types'
import React from 'react'

import formField from './formField'

const stringOrNumberOrBool = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.bool
])

export class DropDownFieldRaw extends React.Component {
  static propTypes = {
    value: stringOrNumberOrBool.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    scopedName: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: stringOrNumberOrBool.isRequired,
        label: PropTypes.string.isRequired
      })
    ).isRequired
  }

  render() {
    const { value, onChange, name, scopedName, options, ...other } = this.props

    return (
      <select
        {...other}
        name={scopedName}
        value={String(value)}
        onChange={event =>
          onChange(
            options.find(({ value }) => String(value) === event.target.value)
              .value
          )
        }>
        {options.map((option, index) => (
          <option key={index} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </select>
    )
  }
}

export default formField()(DropDownFieldRaw)

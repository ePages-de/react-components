import PropTypes from 'prop-types'
import React from 'react'

import formField from './formField'

export class RadioButtonFieldRaw extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    scopedName: PropTypes.string,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired,
    disabled: PropTypes.bool
  }

  static defaultProps = {
    disabled: false
  }

  render () {
    const { value, onChange, name, scopedName, buttons, disabled, ...other } = this.props

    return (
      <div {...other}>
        {buttons.map((button, index) => (
          <span key={button.value}>
            <input
              id={scopedName + '.' + index}
              name={scopedName}
              type="radio"
              value={index}
              onChange={(event) => onChange(buttons[parseInt(event.target.value)].value)}
              checked={value === button.value}
              disabled={disabled}
            />
            <label htmlFor={scopedName + '.' + index}>
              {button.label}
            </label>
          </span>
        ))}
      </div>
    )
  }
}

export default formField()(RadioButtonFieldRaw)

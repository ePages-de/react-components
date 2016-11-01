import formField from './formField'
import React, {PropTypes} from 'react'

class RadioButtonField extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    fullName: PropTypes.string,
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
    const {value, onChange, name, fullName, buttons, disabled, ...other} = this.props // eslint-disable-line no-unused-vars

    return (
      <div {...other}>
        {buttons.map((button, index) => (
          <span key={button.value}>
            <input
              id={fullName + '.' + index}
              name={fullName}
              type="radio"
              value={index}
              onChange={(event) => onChange(buttons[parseInt(event.target.value)].value)}
              checked={value === button.value}
              disabled={disabled}/>
            <label htmlFor={fullName + '.' + index}>
              {button.label}
            </label>
          </span>
        ))}
      </div>
    )
  }
}

export default formField()(RadioButtonField)

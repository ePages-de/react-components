import BaseField from './BaseField'
import React, {PropTypes} from 'react'

export default class RadioButtonField extends React.Component {
  static contextTypes = {...BaseField.contextTypes}

  static defaultProps = {...BaseField.defaultProps}

  static propTypes = {
    ...BaseField.propTypes,
    buttons: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired
  }

  get value () {
    return this.context.formValueScope.getValue(this.props.name)
  }

  set value (newValue) {
    this.context.formValueScope.setValue(this.props.name, newValue)
  }

  updateValue = event => {
    const button = this.props.buttons[parseInt(event.target.value)]

    this.value = button.value
  }

  render () {
    const {name, buttons, disabled, parseValue, ...other} = this.props // eslint-disable-line no-unused-vars

    return (
      <div {...other}>
        {buttons.map((button, ix) => (
          <span key={button.value}>
            <input
              id={`${name}.${ix}`}
              name={`${this.context.formValueScope.name}.${name}`}
              type="radio"
              value={ix}
              onChange={this.updateValue}
              checked={this.value === button.value}
              disabled={disabled}/>
            <label htmlFor={`${name}.${ix}`}>{button.label}</label>
          </span>
        ))}
      </div>
    )
  }
}

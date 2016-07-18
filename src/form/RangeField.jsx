import BaseField from './BaseField'
import React, {PropTypes} from 'react'

export default class RangeField extends React.Component {
  static contextTypes = {
    ...BaseField.contextTypes
  }

  static propTypes = {
    ...BaseField.propTypes,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number,
    multiplier: PropTypes.number
  }

  static defaultProps = {
    ...BaseField.defaultProps,
    step: 1,
    multiplier: 1
  }

  render () {
    const {name, min, max, step, multiplier, ...other} = this.props // eslint-disable-line no-unused-vars
    return <input {...other}
      name={`${this.context.formValueScope.name}.${name}`}
      type="range"
      min={min}
      max={max}
      step={step}
      value={this.transformValue(this.context.formValueScope.getValue(name))}
      onChange={this.onChange}
      onInput={this.onChange}/>
  }

  onChange = (event) => {
    this.context.formValueScope.setValue(this.props.name, this.transformValueInverse(event.target.value))
  }

  transformValue = (value) => {
    return value * this.props.multiplier
  }

  transformValueInverse = (value) => {
    return value / this.props.multiplier
  }
}

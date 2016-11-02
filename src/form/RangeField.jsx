import formField from './formField'
import React, {PropTypes} from 'react'

export class RangeFieldRaw extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    scopedName: PropTypes.string,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    step: PropTypes.number,
    multiplier: PropTypes.number
  }

  static defaultProps = {
    step: 1,
    multiplier: 1
  }

  render () {
    const {value, onChange, name, scopedName, min, max, step, multiplier, ...other} = this.props // eslint-disable-line no-unused-vars
    return <input {...other}
      name={scopedName}
      type="range"
      min={min}
      max={max}
      step={step}
      value={this.transformValue(value)}
      onChange={(event) => onChange(this.transformValueInverse(event.target.value))}
      onInput={this.onChange}/>
  }

  transformValue = (value) => value * this.props.multiplier

  transformValueInverse = (value) => value / this.props.multiplier
}

export default formField()(RangeFieldRaw)

import formField from './formField'
import PropTypes from 'prop-types'
import React from 'react'

export class CheckboxFieldRaw extends React.Component {
  static propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    scopedName: PropTypes.string,
    negate: PropTypes.bool
  }

  static defaultProps = {
    negate: false
  }

  render () {
    const {value, onChange, name, scopedName, negate, ...other} = this.props // eslint-disable-line no-unused-vars
    return <input {...other}
      name={scopedName}
      type="checkbox"
      checked={this.transformValue(value)}
      onChange={(event) => onChange(this.transformValue(event.target.checked))}/>
  }

  transformValue = (value) => {
    return this.props.negate ? !value : value
  }
}

export default formField()(CheckboxFieldRaw)

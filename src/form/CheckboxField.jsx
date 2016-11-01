import formField from './formField'
import React, {PropTypes} from 'react'

class CheckboxField extends React.Component {
  static propTypes = {
    value: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    fullName: PropTypes.string,
    negate: PropTypes.bool
  }

  static defaultProps = {
    negate: false
  }

  render () {
    const {value, onChange, name, fullName, negate, ...other} = this.props // eslint-disable-line no-unused-vars
    return <input {...other}
      name={fullName}
      type="checkbox"
      checked={this.transformValue(value)}
      onChange={(event) => onChange(this.transformValue(event.target.checked))}/>
  }

  transformValue = (value) => {
    return this.props.negate ? !value : value
  }
}

export default formField()(CheckboxField)

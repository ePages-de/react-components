import formField from '../../src/form/formField'
import React, {PropTypes} from 'react'

class TestField extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    scopedName: PropTypes.string.isRequired
  }

  onChange (event) {
    this.context.formValueScope.setValue(this.props.name, event.target.value)
  }

  render () {
    const {value, onChange, name, scopedName, ...other} = this.props // eslint-disable-line no-unused-vars
    return <input {...other}
      name={scopedName}
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}/>
  }
}

export default formField()(TestField)

import formField from './formField'
import React, {PropTypes} from 'react'

class DropDownField extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    fullName: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired
  }

  render () {
    const {value, onChange, name, fullName, options, ...other} = this.props // eslint-disable-line no-unused-vars

    return (
      <select
        {...other}
        name={fullName}
        value={value}
        onChange={(event) => onChange(options[parseInt(event.target.value)].value)}>
        {options.map((option, index) =>
          <option
            key={index}
            value={index.toString()}>
            {option.label}
          </option>
        )}
      </select>
    )
  }
}

export default formField()(DropDownField)

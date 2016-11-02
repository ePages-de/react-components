import formField from './formField'
import React, {PropTypes} from 'react'

export class DropDownFieldRaw extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    scopedName: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired
  }

  render () {
    const {value, onChange, name, scopedName, options, ...other} = this.props // eslint-disable-line no-unused-vars

    return (
      <select
        {...other}
        name={scopedName}
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

export default formField()(DropDownFieldRaw)

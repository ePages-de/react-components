import formField from './formField'
import React, {PropTypes} from 'react'

export class InputFieldRaw extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    fullName: PropTypes.string,
    type: PropTypes.string
  }

  static defaultProps = {
    type: 'text'
  }

  render () {
    const {value, onChange, name, fullName, type, ...other} = this.props // eslint-disable-line no-unused-vars
    return <input
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      {...other}
      name={fullName}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      ref={(node) => { this.input = node }}/>
  }

  focus = () => this.input && this.input.focus()
}

export default formField()(InputFieldRaw)

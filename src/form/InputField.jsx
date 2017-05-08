import formField from './formField'
import PropTypes from 'prop-types'
import React from 'react'

export class InputFieldRaw extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    scopedName: PropTypes.string,
    type: PropTypes.string
  }

  static defaultProps = {
    type: 'text'
  }

  render () {
    const {value, onChange, name, scopedName, type, ...other} = this.props // eslint-disable-line no-unused-vars
    return <input
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      {...other}
      name={scopedName}
      type={type}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      ref={(node) => { this.input = node }}/>
  }

  focus = () => this.input && this.input.focus()
}

export default formField()(InputFieldRaw)

import BaseField from './BaseField'
import React, {PropTypes} from 'react'

export default class InputField extends React.Component {
  static contextTypes = {
    ...BaseField.contextTypes
  }

  static propTypes = {
    ...BaseField.propTypes,
    type: PropTypes.string
  }

  static defaultProps = {
    ...BaseField.defaultProps,
    type: 'text'
  }

  render () {
    const {name, type, ...other} = this.props
    return <input
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      {...other}
      name={`${this.context.formValueScope.name}.${name}`}
      type={type}
      value={this.context.formValueScope.getValue(name)}
      onChange={this.onChange}
      ref="input"/>
  }

  focus = () => {
    this.refs.input.focus()
  }

  onChange = (event) => {
    this.context.formValueScope.setValue(this.props.name, event.target.value)
  }
}

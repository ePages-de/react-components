import BaseField from './BaseField'
import React, {PropTypes} from 'react'

export default class TextareaField extends React.Component {
  static contextTypes = {
    ...BaseField.contextTypes
  }

  static propTypes = {
    ...BaseField.propTypes,
    rows: PropTypes.number
  }

  static defaultProps = {
    ...BaseField.defaultProps
  }

  render () {
    const {name, rows, ...other} = this.props
    return <textarea
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      {...other}
      name={`${this.context.formValueScope.name}.${name}`}
      rows={rows}
      value={this.context.formValueScope.getValue(name)}
      onChange={this.onChange}
      ref="textarea"/>
  }

  focus = () => this.refs.textarea.focus()

  onChange = (event) => this.context.formValueScope.setValue(this.props.name, event.target.value)
}

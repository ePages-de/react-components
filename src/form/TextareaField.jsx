import formField from './formField'
import React, {PropTypes} from 'react'

class TextareaField extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    fullName: PropTypes.string,
    rows: PropTypes.number
  }

  render () {
    const {value, onChange, name, fullName, rows, ...other} = this.props // eslint-disable-line no-unused-vars
    return <textarea
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      {...other}
      name={fullName}
      rows={rows}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      ref={(node) => { this.textarea = node }}/>
  }

  focus = () => this.textarea && this.textarea.focus()
}

export default formField()(TextareaField)

import formField from './formField'
import PropTypes from 'prop-types'
import React from 'react'

export class TextareaFieldRaw extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    scopedName: PropTypes.string,
    rows: PropTypes.number
  }

  render () {
    const {value, onChange, name, scopedName, rows, ...other} = this.props // eslint-disable-line no-unused-vars
    return <textarea
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      {...other}
      name={scopedName}
      rows={rows}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      ref={(node) => { this.textarea = node }}/>
  }

  focus = () => this.textarea && this.textarea.focus()
}

export default formField()(TextareaFieldRaw)

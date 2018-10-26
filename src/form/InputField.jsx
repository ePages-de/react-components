import PropTypes from 'prop-types'
import React from 'react'

import formField from './formField'

export class InputFieldRaw extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    scopedName: PropTypes.string,
    type: PropTypes.string,
    forwardedRef: PropTypes.node
  }

  static defaultProps = {
    type: 'text'
  }

  render() {
    const {
      value,
      onChange,
      name,
      scopedName,
      type,
      forwardedRef,
      ...other
    } = this.props

    return (
      <input
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        {...other}
        name={scopedName}
        type={type}
        value={value}
        onChange={event => onChange(event.target.value)}
        ref={forwardedRef}
      />
    )
  }
}

const InputFormField = formField()(InputFieldRaw)

export default React.forwardRef((props, ref) => (
  <InputFormField {...props} forwardedRef={ref} />
))

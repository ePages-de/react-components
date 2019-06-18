import PropTypes from 'prop-types'
import React from 'react'

import formField from '../../src/form/formField'

class TestField extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    scopedName: PropTypes.string.isRequired
  }

  render () {
    const { value, onChange, name, scopedName, ...other } = this.props

    return <input {...other}
      name={scopedName}
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)} />
  }
}

export default formField()(TestField)

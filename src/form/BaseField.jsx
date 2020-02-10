import PropTypes from 'prop-types'
import React from 'react'

const FormValueScopeContext = React.createContext()

export default {
  propTypes: {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  },
  contextType: FormValueScopeContext
}

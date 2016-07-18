import {PropTypes} from 'react'

export default {
  contextTypes: {
    formValueScope: PropTypes.object.isRequired
  },
  propTypes: {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }
}

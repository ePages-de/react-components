import PropTypes from 'prop-types'

export default {
  propTypes: {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }
}

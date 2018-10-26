import hoistNonReactStatics from 'hoist-non-react-statics'
import PropTypes from 'prop-types'
import React from 'react'

export default function withClassName(className) {
  return function(Component) {
    class WithClassName extends React.Component {
      static displayName = `WithClassName(${Component.displayName ||
        Component.name ||
        'Component'})`

      static propTypes = {
        forwardedRef: PropTypes.object,
        className: PropTypes.string
      }

      render() {
        const {
          className: additionalClassName,
          forwardedRef,
          ...other
        } = this.props

        return (
          <Component
            {...other}
            ref={forwardedRef}
            className={
              additionalClassName
                ? className + ' ' + additionalClassName
                : className
            }
          />
        )
      }
    }

    const HoistedWithClassName = hoistNonReactStatics(WithClassName, Component)

    return React.forwardRef((props, ref) => (
      <HoistedWithClassName {...props} forwardedRef={ref} />
    ))
  }
}

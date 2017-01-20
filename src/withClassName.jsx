import hoistNonReactStatics from 'hoist-non-react-statics'
import React, {PropTypes} from 'react'

export default function withClassName (className, hoistedMethods = []) {
  return function (Component) {
    class WithClassName extends React.Component {
      static displayName = `WithClassName(${Component.displayName || Component.name || 'Component'})`

      static propTypes = {
        className: PropTypes.string
      }

      render () {
        const {className: additionalClassName, ...other} = this.props
        return <Component
          {...other}
          className={additionalClassName ? className + ' ' + additionalClassName : className}
          ref={this.hoistMethods}/>
      }

      hoistMethods = (wrappedComponent) => {
        wrappedComponent && hoistedMethods.forEach((methodName) => {
          this[methodName] = wrappedComponent[methodName]
        })
      }
    }

    return hoistNonReactStatics(WithClassName, Component)
  }
}

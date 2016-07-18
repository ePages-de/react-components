import hoistNonReactStatics from 'hoist-non-react-statics'
import React from 'react'

export default function withClassName (className) {
  return function (Component) {
    class WithClassName extends React.Component {
      static displayName = `WithClassName(${Component.displayName || Component.name || 'Component'})`

      render () {
        return <Component {...this.props} className={className}/>
      }
    }

    return hoistNonReactStatics(WithClassName, Component)
  }
}

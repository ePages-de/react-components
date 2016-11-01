import BaseField from './BaseField'
import hoistNonReactStatics from 'hoist-non-react-statics'
import React from 'react'

export default function formField () {
  return function (Component) {
    class FormField extends React.Component {
      static displayName = `FormField(${Component.displayName || Component.name || 'Component'})`

      static contextTypes = {
        ...BaseField.contextTypes
      }

      static propTypes = {
        ...BaseField.propTypes
      }

      static defaultProps = {
        ...BaseField.defaultProps
      }

      render () {
        const {formValueScope} = this.context
        const {name, ...other} = this.props

        return <Component
          {...other}
          value={formValueScope.getValue(name)}
          onChange={(newValue) => formValueScope.setValue(name, newValue)}
          name={name}
          fullName={formValueScope.name + '.' + name}
          ref={this.hoistMethods}/>
      }

      hoistMethods = (wrappedComponent) => {
        wrappedComponent && ['focus'].forEach((methodName) => {
          this[methodName] = wrappedComponent[methodName]
        })
      }
    }

    return hoistNonReactStatics(FormField, Component)
  }
}

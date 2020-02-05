import hoistNonReactStatics from 'hoist-non-react-statics'
import React from 'react'

import BaseField from './BaseField'
import { FormScopeValueContext } from './Form'

export default function formField () {
  return function (Component) {
    class FormField extends React.Component {
      static displayName = `FormField(${Component.displayName || Component.name || 'Component'})`

      static contextType = FormScopeValueContext

      static propTypes = {
        ...BaseField.propTypes
      }

      static defaultProps = {
        ...BaseField.defaultProps
      }

      render () {
        const formValueScope = this.context
        const { name, ...other } = this.props

        return (
          <Component
            {...other}
            value={formValueScope.getValue(name)}
            onChange={(newValue) => {
              const result = formValueScope.setValue(name, newValue)
              console.log(`onChange result=${result}`)
              return result
            }}
            name={name}
            scopedName={formValueScope.name + '.' + name}
            ref={this.hoistMethods}
          />
        )
      }

      hoistMethods = (wrappedComponent) => {
        if (wrappedComponent) {
          this.focus = wrappedComponent.focus
        }
      }
    }

    return hoistNonReactStatics(FormField, Component)
  }
}

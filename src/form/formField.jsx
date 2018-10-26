import hoistNonReactStatics from 'hoist-non-react-statics'
import React from 'react'

import BaseField from './BaseField'

export default function formField() {
  return function(Component) {
    class FormField extends React.Component {
      static displayName = `FormField(${Component.displayName ||
        Component.name ||
        'Component'})`

      static contextTypes = {
        ...BaseField.contextTypes
      }

      static propTypes = {
        ...BaseField.propTypes
      }

      static defaultProps = {
        ...BaseField.defaultProps
      }

      render() {
        const { formValueScope } = this.context
        const { name, forwardedRef, ...other } = this.props

        return (
          <Component
            {...other}
            value={formValueScope.getValue(name)}
            onChange={newValue => formValueScope.setValue(name, newValue)}
            name={name}
            scopedName={formValueScope.name + '.' + name}
            ref={forwardedRef}
          />
        )
      }
    }

    const HoistedFormField = hoistNonReactStatics(FormField, Component)

    return React.forwardRef((props, ref) => (
      <HoistedFormField {...props} forwardedRef={ref} />
    ))
  }
}

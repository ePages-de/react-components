import BaseField from './BaseField'
import FormValueScope from './FormValueScope'
import React, {PropTypes} from 'react'

export default class IteratorField extends React.Component {
  static contextTypes = {
    ...BaseField.contextTypes
  }

  static propTypes = {
    ...BaseField.propTypes,
    skip: PropTypes.number,
    take: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
  }

  static defaultProps = {
    ...BaseField.defaultProps,
    skip: 0
  }

  get value () {
    return this.context.formValueScope.getValue(this.props.name)
  }

  render () {
    const {name, skip, take, children, ...other} = this.props
    const items = this.value.skip(skip).take(take || this.value.count())

    return (
      <FormValueScope name={name}>
        <div {...other}>
          {items.map((item, index) =>
            <FormValueScope key={index + skip} name={index + skip}>
              {typeof children === 'function' ? children(item, index + skip) : children}
            </FormValueScope>
          )}
        </div>
      </FormValueScope>
    )
  }
}

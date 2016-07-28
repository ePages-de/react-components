import BaseField from './BaseField'
import React, {PropTypes} from 'react'

export default class ChoiceField extends React.Component {
  static contextTypes = {
    ...BaseField.contextTypes
  }

  static propTypes = {
    ...BaseField.propTypes,
    choices: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired
  }

  static defaultProps = {
    ...BaseField.defaultProps
  }

  get value () {
    return this.context.formValueScope.getValue(this.props.name)
  }

  set value (newValue) {
    this.context.formValueScope.setValue(this.props.name, newValue)
  }

  render () {
    const {name, choices, ...other} = this.props // eslint-disable-line no-unused-vars

    return (
      <div {...other}>
        {choices.map((choice) => {
          const select = () => this.value = choice.value // eslint-disable-line no-return-assign
          return (
            <div
              key={choice.value}
              onClick={select}
              data-active={this.value === choice.value ? 'yes' : 'no'}>
              {choice.label}
            </div>
          )
        })}
      </div>
    )
  }
}

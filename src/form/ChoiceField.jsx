import PropTypes from 'prop-types'
import React from 'react'

import formField from './formField'

export class ChoiceFieldRaw extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    scopedName: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired
  }

  render () {
    const { value, onChange, name, scopedName, choices, ...other } = this.props

    return (
      <div {...other}>
        {choices.map((choice, index) => {
          return (
            <div
              key={index}
              onClick={() => onChange(choice.value)}
              data-active={choice.value === value ? 'yes' : 'no'}
            >
              {choice.label}
            </div>
          )
        })}
      </div>
    )
  }
}

export default formField()(ChoiceFieldRaw)

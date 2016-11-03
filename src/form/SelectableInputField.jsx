import formField from './formField'
import InputField from './InputField'
import React, {PropTypes} from 'react'

class SelectableInputFieldRaw extends React.Component {
  static contextTypes = {
    formValueScope: PropTypes.any.isRequired
  }

  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    scopedName: PropTypes.string,
    type: PropTypes.string,
    title: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    selected: PropTypes.bool
  }

  static defaultProps = {
    type: 'text'
  }

  constructor (props) {
    super(props)
    this.state = {
      isSelected: props.selected
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (this.state.isSelected !== prevState.isSelected) {
      this.context.formValueScope.setValue(`${this.props.name}Selected`, this.state.isSelected)
    }
  }

  render () {
    // eslint-disable-next-line no-unused-vars
    const {value, onChange, name, scopedName, type, title, label, placeholder, selected, ...other} = this.props
    const scopedCheckboxName = `${scopedName}Selected`

    return <div {...other}>
      <label title={title}>
        <input
          name={scopedCheckboxName}
          type="checkbox"
          defaultChecked={this.state.isSelected}
          onChange={(event) => {
            const isSelected = event.target.checked
            if (isSelected) {
              // give time for the input field to be enabled
              window.setTimeout(() => this.inputField.focus(), 0)
            }
            this.setState({isSelected})
          }}/>
        {label}
      </label>
      <InputField
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={!this.state.isSelected}
        ref={(component) => { this.inputField = component }}/>
    </div>
  }
}

export default formField()(SelectableInputFieldRaw)

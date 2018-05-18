import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'

import {CheckboxField, ChoiceField, ColorpickerField, DropDownField, ErrorMessage, Form, InputField, RadioButtonField, SelectableInputField, SmartInputField, TextareaField, withClassName} from '../src/index'

const initialValue = Immutable.fromJS({
  name: 'name',
  password: 'password',
  comment: 'Nothing here',
  adult: true,
  description: 'Foo\nBar',
  size: 'm',
  cut: 'loose',
  facebook: '',
  facebookSelected: false,
  tags: ['first', 'second'],
  color: '#28cc42'
})

const sizes = [
  {value: 's', label: 'Small'},
  {value: 'm', label: 'Medium'},
  {value: 'l', label: 'Large'}
]

const cuts = [
  {value: 'wide', label: 'Wide'},
  {value: 'loose', label: 'Loose'},
  {value: 'fit', label: 'Fit'}
]

const getTagSuggestions = (text) => Promise.resolve(text.length > 0 ? [text + '1', text + '2'] : null)
const BlueInputField = withClassName('blue', ['focus'])(InputField)

class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {formValue: initialValue}
  }

  render () {
    return (
      <div>
        <h1>Form</h1>
        <div>
          <Form name="form" value={initialValue} onSubmit={this.onSubmit} onChange={this.debugOnChange} validate={this.validate} validateWaitMs={300}>
            <div>
              <div>
                <h2>BlueInputField</h2>
                <BlueInputField name="name" type="text" autoFocus />
                <h2>ErrorMessage</h2>
                <ErrorMessage name="name" Component="span" />
              </div>
              <div>
                <h2>InputField (password)</h2>
                <InputField name="password" type="password" />
              </div>
              <div>
                <h2>InputField (text)</h2>
                <InputField name="comment" type="text" />
              </div>
              <div>
                <h2>CheckboxField</h2>
                <CheckboxField name="adult" />
              </div>
              <div>
                <h2>TextareaField</h2>
                <TextareaField name="description" rows={6} />
              </div>
              <div>
                <h2>ChoiceField</h2>
                <ChoiceField name="size" choices={sizes} />
              </div>
              <div>
                <h2>DropDownField</h2>
                <DropDownField name="size" options={sizes} />
              </div>
              <div>
                <h2>RadioButtonField</h2>
                <RadioButtonField name="cut" buttons={cuts} />
              </div>
              <div>
                <h2>SelectableInputField</h2>
                <SelectableInputField name="facebook" type="text" title="Selector" label="SelectorLabel" placeholder="type here" />
              </div>
              <div>
                <h2>SmartInputField</h2>
                <SmartInputField name="tags" className="smart-input" placeholderText="type here" getSuggestions={getTagSuggestions} />
              </div>
              <div>
                <h2>ColorpickerField</h2>
                <ColorpickerField name="color" className="colorpicker" />
              </div>
            </div>
            <button type="submit">Submit</button>
          </Form>
          <pre>
            {JSON.stringify(this.state.formValue.toJS(), 0, 2)}
          </pre>
        </div>
      </div>
    )
  }

  debugOnChange = (newValue) => {
    this.setState({formValue: newValue})
  }

  onSubmit = (value) => {
    console.log(value.toJS()) // eslint-disable-line no-console
  }

  validate = (value) => {
    return Immutable.fromJS({name: !value.get('name') ? 'required' : null})
  }
}

ReactDOM.render(<App />, document.getElementById('app'))

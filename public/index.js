import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import {withClassName, Form, InputField, CheckboxField, TextareaField, ChoiceField, DropDownField, RadioButtonField, SelectableInput, SmartInputField} from '../src/index'

const initialValue = Immutable.fromJS({
  name: 'name',
  password: 'password',
  color: '#ff0000',
  adult: true,
  description: 'Foo\nBar',
  size: 's',
  cut: 'loose',
  facebook: '',
  facebookSelected: false,
  tags: ['first', 'second']
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
  constructor () {
    super()
    this.state = {formValue: initialValue}
  }

  render () {
    return (
      <div>
        <h1>Form</h1>
        <div>
          <Form name="form" value={initialValue} onSubmit={this.onSubmit} onChange={this.debugOnChange}>
            <div>
              <div>
                <BlueInputField name="name" type="text" autoFocus/>
              </div>
              <div>
                <InputField name="password" type="password"/>
              </div>
              <div>
                <InputField name="color" type="color"/>
              </div>
              <div>
                <CheckboxField name="adult"/>
              </div>
              <div>
                <TextareaField name="description" rows={6}/>
              </div>
              <div>
                <ChoiceField name="size" choices={sizes}/>
              </div>
              <div>
                <DropDownField name="size" options={sizes}/>
              </div>
              <div>
                <RadioButtonField name="cut" buttons={cuts}/>
              </div>
              <div>
                <SelectableInput selected name="facebook" type="text" title="Selector" label="SelectorLabel" placeholder="type here"/>
              </div>
              <div>
                <SmartInputField name="tags" className="smart-input" getSuggestions={getTagSuggestions}/>
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

  debugOnChange = (newValue) => this.setState({formValue: newValue})

  onSubmit = (value) => {
    console.log(value.toJS()) // eslint-disable-line no-console
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))

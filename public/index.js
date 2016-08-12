import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import {withClassName, Form, InputField, CheckboxField, TextareaField, ChoiceField, DropDownField, RadioButtonField} from '../src/index'

const initialValue = Immutable.fromJS({
  name: 'name',
  password: 'password',
  color: '#888888',
  adult: true,
  description: 'Foo\nBar',
  size: 's',
  cut: 'loose'
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

const BlueInputField = withClassName('blue', ['focus'])(InputField)

class App extends React.Component {
  render () {
    return (
      <div>
        <h1>Form</h1>
        <div>
          <Form name="form" value={initialValue} onSubmit={this.onSubmit}>
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
            </div>
            <button type="submit">Submit</button>
          </Form>
        </div>
      </div>
    )
  }

  onSubmit = (value) => {
    console.log(value.toJS()) // eslint-disable-line no-console
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))

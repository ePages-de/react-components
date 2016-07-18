import Immutable from 'immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import {Form, InputField, CheckboxField} from '../src/index'

class App extends React.Component {
  constructor () {
    super()

    this.state = {
      value: Immutable.fromJS({
        name: 'name',
        password: 'password',
        color: '#888888',
        adult: true
      })
    }
  }

  render () {
    return (
      <div>
        <h1>Form</h1>
        <div>
          <Form name='form' value={this.state.value}>
            <div>
              <div>
                <InputField name='name' type='text'/>
              </div>
              <div>
                <InputField name='password' type='password'/>
              </div>
              <div>
                <InputField name='color' type='color'/>
              </div>
              <div>
                <CheckboxField name='adult'/>
              </div>
            </div>
          </Form>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'))

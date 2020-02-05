import Immutable from 'immutable'
import React from 'react'
// import TestUtils from 'react-testutils-additions'
import { fireEvent, render } from '@testing-library/react'
import sinon from 'sinon'
import Bluebird from 'bluebird'

import ErrorMessage from '../../src/form/ErrorMessage'
import Form from '../../src/form/Form'
import FormValueScope from '../../src/form/FormValueScope'
// import expect from '../unexpected'
import TestField from './TestField'

function renderWithContext ({ validate } = {}) {
  const initialValue = Immutable.fromJS({
    sub: {
      name: 'first'
    }
  })
  const onSubmit = sinon.spy()
  const helpers = render(
    <Form name="test" value={initialValue} onSubmit={onSubmit} validate={validate}>
      <div>
        <FormValueScope name="sub">
          <div>
            <TestField name="name" className="name" />
            <ErrorMessage name="name" className="name-error" />
          </div>
        </FormValueScope>
      </div>
    </Form>
  )
  /*
  const form = TestUtils.findOne(dom, 'form')
  const nameField = TestUtils.findOne(dom, '.name')
  */

  const form = helpers.container.querySelector('form')
  const nameField = helpers.container.querySelector('input')

  // return { initialValue, onSubmit, dom, form, nameField }
  return { initialValue, onSubmit, form, nameField, ...helpers }
}

describe('FormValueScope', function () {
  it('renders', function () {
    const { dom } = render()

    expect(dom, 'to have rendered',
      <form>
        <div>
          <div>
            <input name="test.sub.name" value="first" />
          </div>
        </div>
      </form>
    )
  })

  it.only('passes through validation', async function () {
    const validate = (value) => {
      console.log('validate triggered')
      console.log(value.getIn(['sub', 'name']))
      return Immutable.fromJS({
        sub: {
          name: !value.getIn(['sub', 'name']) ? 'required' : null
        }
      })
    }
    // const { form, nameField, debug, queryByText } = renderWithContext({ validate })
    const { form, nameField, debug, queryByText } = renderWithContext()
    
    // console.log(dom)
    // TestUtils.Simulate.submit(form)
    fireEvent.change(nameField, { target: { value: 'x' } })
    
    await Bluebird.delay(1)
    debug()
    return 
    // fireEvent.submit(form)
    debug()

    expect(queryByText('required')).toBeFalsy()
    /*
    expect(dom, 'to have rendered',
      <form>
        <div>
          <div>
            <input name="test.sub.name" value="first" />
          </div>
        </div>
      </form>
    )
    */

    fireEvent.change(nameField, { target: { value: '' } })
    fireEvent.submit(form)

    /*
    TestUtils.Simulate.change(nameField, { target: { value: '' } })
    TestUtils.Simulate.submit(form)
    */
    debug()
    expect(queryByText('required')).toBeTruthy()
    /*
    expect(dom, 'to have rendered',
      <form>
        <div>
          <div>
            <input name="test.sub.name" value="" />
            <div>required</div>
          </div>
        </div>
      </form>
    )
    */
  })
})

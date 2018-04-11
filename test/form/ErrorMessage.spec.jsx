import Bluebird from 'bluebird'
import Immutable from 'immutable'
import React from 'react'
import TestUtils from 'react-testutils-additions'
import sinon from 'sinon'
import expect from 'unexpected'

import ErrorMessage from '../../src/form/ErrorMessage'
import Form from '../../src/form/Form'
import TestField from './TestField'

function render ({validate} = {}) {
  const initialValue = Immutable.fromJS({name: ''})
  const onSubmit = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <Form name="test" value={initialValue} onSubmit={onSubmit} validate={validate}>
      <TestField name="name" className="name" />
      <ErrorMessage name="name" Component="span" className="name-error" />
    </Form>
  )
  const form = TestUtils.findOne(dom, 'form')
  const nameField = TestUtils.findOne(dom, '.name')

  return {initialValue, onSubmit, dom, form, nameField}
}

describe('ErrorMessage', function () {
  it('renders', async function () {
    const validate = (value) => !value.get('name') ? Immutable.fromJS({name: 'required'}) : null
    const {dom, form, nameField} = render({validate})

    TestUtils.Simulate.submit(form)
    await Bluebird.delay(1)

    expect(dom, 'to have rendered',
      <form>
        <input name="test.name" type="text" value="" />
        <span>required</span>
      </form>
    )

    TestUtils.Simulate.change(nameField, {target: {value: 'foobar'}})
    TestUtils.Simulate.submit(form)
    await Bluebird.delay(1)

    expect(dom, 'to have rendered',
      <form>
        <input name="test.name" type="text" value="foobar" />
      </form>
    )
  })
})

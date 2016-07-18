import expect from 'unexpected'
import Form from '../../src/form/Form'
import Immutable from 'immutable'
import React from 'react'
import sinon from 'sinon'
import TestField from './TestField'
import TestUtils from 'react-testutils-additions'

function render ({validate} = {}) {
  const initialValue = Immutable.fromJS({
    firstName: '',
    lastName: ''
  })
  const onSubmit = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <Form name="test" value={initialValue} onSubmit={onSubmit} validate={validate}>
      <div>
        <TestField name="firstName" className="firstName"/>
        <div>
          <TestField name="lastName" className="lastName"/>
        </div>
      </div>
    </Form>
  )
  const form = TestUtils.findOne(dom, 'form')
  const firstNameField = TestUtils.findOne(dom, '.firstName')
  const lastNameField = TestUtils.findOne(dom, '.lastName')

  return {initialValue, onSubmit, dom, form, firstNameField, lastNameField}
}

describe('Form', function () {
  it('renders', function () {
    const {dom} = render()

    expect(dom, 'to have rendered',
      <form name="test" autoComplete="off">
        <div>
          <input name="test.firstName" className="firstName"/>
          <div>
            <input name="test.lastName" className="lastName"/>
          </div>
        </div>
      </form>
    )
  })

  it('returns original instance if unchanged', function () {
    const {onSubmit, form} = render()

    expect(onSubmit, 'was not called')
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was called once')
  })

  it('returns new value', function () {
    const {onSubmit, form, firstNameField, lastNameField} = render()

    TestUtils.Simulate.change(firstNameField, {target: {value: 'foo'}})
    TestUtils.Simulate.change(lastNameField, {target: {value: 'bar'}})
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was called once')
    expect(onSubmit, 'to have calls satisfying', function () {
      onSubmit(new Immutable.Map({
        firstName: 'foo',
        lastName: 'bar'
      }))
    })
  })

  it('respects validation', function () {
    const validate = (value) => Immutable.fromJS({firstName: !value.get('firstName') ? 'required' : null})
    const {onSubmit, form, firstNameField, lastNameField} = render({validate})

    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was not called')
    TestUtils.Simulate.change(lastNameField, {target: {value: 'bar'}})
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was not called')
    TestUtils.Simulate.change(firstNameField, {target: {value: 'foo'}})
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was called once')
  })
})

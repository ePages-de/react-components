import expect from 'unexpected'
import Form from '../../src/form/Form'
import Immutable from 'immutable'
import InputField from '../../src/form/InputField'
import React from 'react'
import sinon from 'sinon'
import TestUtils from 'react-testutils-additions'

function render () {
  const initialValue = Immutable.fromJS({
    name: 'foobar',
    pass: 'secret'
  })
  const onSubmit = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <Form name="test" value={initialValue} onSubmit={onSubmit}>
      <InputField name="name" className="name"/>
      <InputField name="pass" type="password" className="pass"/>
    </Form>
  )
  const form = TestUtils.findOne(dom, 'form')
  const nameField = TestUtils.findOne(dom, '.name')
  const passField = TestUtils.findOne(dom, '.pass')

  return {initialValue, onSubmit, dom, form, nameField, passField}
}

describe('InputField', function () {
  it('renders', function () {
    const {dom} = render()

    expect(dom, 'to have rendered',
      <form>
        <input name="test.name" type="text" value="foobar"/>
        <input name="test.pass" type="password" value="secret"/>
      </form>
    )
  })

  it('returns new value', function () {
    const {onSubmit, form, nameField, passField} = render()

    expect(onSubmit, 'was not called')
    TestUtils.Simulate.change(nameField, {target: {value: 'foobar-new'}})
    TestUtils.Simulate.change(passField, {target: {value: 'secret-new'}})
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was called once')
    expect(onSubmit, 'to have calls satisfying', function () {
      onSubmit(Immutable.fromJS({
        name: 'foobar-new',
        pass: 'secret-new'
      }))
    })
  })
})

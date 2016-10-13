import expect from 'unexpected'
import Form from '../../src/form/Form'
import Immutable from 'immutable'
import React from 'react'
import SelectableInput from '../../src/form/SelectableInput.jsx'
import sinon from 'sinon'
import TestUtils from 'react-testutils-additions'

function render () {
  const initialValue = Immutable.fromJS({
    facebook: 'testvalue',
    facebookSelected: false
  })
  const onSubmit = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <Form name="testform" value={initialValue} onSubmit={onSubmit}>
      <SelectableInput name="facebook" type="text" title="mySelectableInput" label="mySelectableInputLabel" placeholder="type here"/>
    </Form>
  )
  const form = TestUtils.findOne(dom, 'form')
  const inputField0 = TestUtils.find(dom, 'input')[0]
  const inputField1 = TestUtils.find(dom, 'input')[1]

  return {initialValue, onSubmit, dom, form, inputField0, inputField1}
}

describe('SelectableInput', function () {
  it('renders', function () {
    const {dom} = render()

    expect(dom, 'to have rendered',
      <form>
        <div>
          <label title="mySelectableInput">
            <input
              name="testform.facebookSelected"
              type="checkbox"/>
          </label>
          <input
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            name="testform.facebook"
            type="text"
            value="testvalue"/>
        </div>
      </form>
    )
  })

  it('returns new value', function () {
    const {form, onSubmit, inputField0, inputField1} = render()

    expect(onSubmit, 'was not called')

    expect(inputField1.disabled, 'to be', true)
    expect(inputField0.checked, 'to be', false)
    TestUtils.Simulate.change(inputField0, {target: {checked: true}})
    expect(inputField0.checked, 'to be', true)
    expect(inputField1.disabled, 'to be', false)

    TestUtils.Simulate.change(inputField1, {target: {value: 'ab'}})
    expect(inputField1.value, 'to be', 'ab')

    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was called once')
    expect(onSubmit, 'to have calls satisfying', function () {
      onSubmit(Immutable.fromJS({
        facebook: 'ab',
        facebookSelected: true
      }))
    })
  })
})

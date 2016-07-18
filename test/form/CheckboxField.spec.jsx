import CheckboxField from '../../src/form/CheckboxField'
import expect from 'unexpected'
import Form from '../../src/form/Form'
import Immutable from 'immutable'
import React from 'react'
import sinon from 'sinon'
import TestUtils from 'react-testutils-additions'

function render ({success, negate = false} = {}) {
  const initialValue = Immutable.fromJS({success})
  const onSubmit = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <Form name="test" value={initialValue} onSubmit={onSubmit}>
      <CheckboxField name="success" className="success" negate={negate}/>
    </Form>
  )
  const form = TestUtils.findOne(dom, 'form')
  const checkboxField = TestUtils.findOne(dom, '.success')

  return {initialValue, onSubmit, dom, form, checkboxField}
}

describe('CheckboxField', function () {
  it('renders unchecked', function () {
    const {dom} = render({success: false})
    expect(dom, 'to have rendered',
      <form>
        <input name="test.success" type="checkbox" checked={false}/>
      </form>
    )
  })

  it('renders checked', function () {
    const {dom} = render({success: true})
    expect(dom, 'to have rendered',
      <form>
        <input name="test.success" type="checkbox" checked/>
      </form>
    )
  })

  it('returns new value', function () {
    const {onSubmit, form, checkboxField} = render({success: false})

    expect(onSubmit, 'was not called')
    TestUtils.Simulate.change(checkboxField, {target: {checked: true}})
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was called once')
    expect(onSubmit, 'to have calls satisfying', function () {
      onSubmit(Immutable.fromJS({
        success: true
      }))
    })
  })

  it('negates value', function () {
    const {onSubmit, dom, form, checkboxField} = render({success: false, negate: true})

    expect(dom, 'to have rendered',
      <form>
        <input name="test.success" type="checkbox" checked/>
      </form>
    )
    expect(onSubmit, 'was not called')
    TestUtils.Simulate.change(checkboxField, {target: {checked: false}})
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was called once')
    expect(onSubmit, 'to have calls satisfying', function () {
      onSubmit(Immutable.fromJS({
        success: true
      }))
    })
  })
})

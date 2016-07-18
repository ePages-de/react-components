import expect from 'unexpected'
import Form from '../../src/form/Form'
import Immutable from 'immutable'
import RangeField from '../../src/form/RangeField'
import React from 'react'
import sinon from 'sinon'
import TestUtils from 'react-testutils-additions'

function render () {
  const initialValue = Immutable.fromJS({
    age: 23
  })
  const onSubmit = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <Form name="test" value={initialValue} onSubmit={onSubmit}>
      <div>
        <RangeField name="age" min={0} max={100}/>
      </div>
    </Form>
  )
  const form = TestUtils.findOne(dom, 'form')
  const rangeField = TestUtils.findOne(dom, 'input')

  return {initialValue, onSubmit, dom, form, rangeField}
}

describe('RangeField', function () {
  it('renders', function () {
    const {dom} = render()

    expect(dom, 'to have rendered',
      <form>
        <input type="range" name="test.age" value={23}/>
      </form>
    )
  })

  it('returns new value', function () {
    const {onSubmit, form, rangeField} = render()

    expect(onSubmit, 'was not called')
    TestUtils.Simulate.change(rangeField, {target: {value: 0}})
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was called once')
    expect(onSubmit, 'to have calls satisfying', function () {
      onSubmit(Immutable.fromJS({
        age: 0
      }))
    })
  })
})

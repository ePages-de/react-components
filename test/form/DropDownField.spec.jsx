import DropDownField from '../../src/form/DropDownField'
import expect from 'unexpected'
import Form from '../../src/form/Form'
import Immutable from 'immutable'
import React from 'react'
import sinon from 'sinon'
import TestUtils from 'react-testutils-additions'

const sizes = [
  {value: 's', label: 'Small'},
  {value: 'm', label: 'Medium'},
  {value: 'l', label: 'Large'}
]

function render () {
  const initialValue = Immutable.fromJS({
    size: 'm'
  })
  const onSubmit = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <Form name="test" value={initialValue} onSubmit={onSubmit}>
      <DropDownField name="size" className="size" options={sizes}/>
    </Form>
  )
  const form = TestUtils.findOne(dom, 'form')
  const sizeField = TestUtils.findOne(dom, '.size')

  return {initialValue, onSubmit, dom, form, sizeField}
}

describe('DropDownField', function () {
  it('renders', function () {
    const {dom} = render()

    expect(dom, 'to have rendered',
      <form>
        <select name="test.size" value="m">
          <option value="0">Small</option>
          <option value="1">Medium</option>
          <option value="2">Large</option>
        </select>
      </form>
    )
  })

  it('returns new value', function () {
    const {onSubmit, form, sizeField} = render()

    expect(onSubmit, 'was not called')
    TestUtils.Simulate.change(sizeField, {target: {value: '2'}})
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was called once')
    expect(onSubmit, 'to have calls satisfying', function () {
      onSubmit(Immutable.fromJS({
        size: 'l'
      }))
    })
  })
})

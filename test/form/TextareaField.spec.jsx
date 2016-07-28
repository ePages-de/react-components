import expect from 'unexpected'
import Form from '../../src/form/Form'
import Immutable from 'immutable'
import React from 'react'
import sinon from 'sinon'
import TestUtils from 'react-testutils-additions'
import TextareaField from '../../src/form/TextareaField'

function render () {
  const initialValue = Immutable.fromJS({
    description: 'foo\nbar'
  })
  const onSubmit = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <Form name="test" value={initialValue} onSubmit={onSubmit}>
      <TextareaField name="description" className="description"/>
    </Form>
  )
  const form = TestUtils.findOne(dom, 'form')
  const descriptionField = TestUtils.findOne(dom, '.description')

  return {initialValue, onSubmit, dom, form, descriptionField}
}

describe('TextareaField', function () {
  it('renders', function () {
    const {dom} = render()

    expect(dom, 'to have rendered',
      <form>
        <textarea name="test.description" value={'foo\nbar'}/>
      </form>
    )
  })

  it('returns new value', function () {
    const {onSubmit, form, descriptionField} = render()

    expect(onSubmit, 'was not called')
    TestUtils.Simulate.change(descriptionField, {target: {value: 'foobar2'}})
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was called once')
    expect(onSubmit, 'to have calls satisfying', function () {
      onSubmit(Immutable.fromJS({
        description: 'foobar2'
      }))
    })
  })
})

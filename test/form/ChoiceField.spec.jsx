import ChoiceField from '../../src/form/ChoiceField'
import expect from 'unexpected'
import Form from '../../src/form/Form'
import Immutable from 'immutable'
import React from 'react'
import sinon from 'sinon'
import TestUtils from 'react-testutils-additions'

function render ({success} = {}) {
  const initialValue = Immutable.fromJS({success})
  const onSubmit = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <Form name="test" value={initialValue} onSubmit={onSubmit}>
      <ChoiceField
        name="success"
        choices={[{value: true, label: 'Yes'}, {value: false, label: 'No'}]}
        data-type="choice"/>
    </Form>
  )
  const form = TestUtils.findOne(dom, 'form')
  const choiceDivs = TestUtils.find(dom, 'div').slice(1)

  return {initialValue, onSubmit, dom, form, choiceDivs}
}
describe('components', () => describe('form', () => describe('ChoiceField', () => {
  it('renders', () => {
    const {dom} = render({success: true})
    expect(dom, 'to have rendered',
      <form>
        <div>
          <div>Yes</div>
          <div>No</div>
        </div>
      </form>
    )
  })

  it('returns new value', () => {
    const {onSubmit, form, choiceDivs} = render({success: false})

    expect(onSubmit, 'was not called')
    TestUtils.Simulate.click(choiceDivs[0])
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'to have calls satisfying', () => onSubmit(Immutable.fromJS({
      success: true
    })))
  })
})))

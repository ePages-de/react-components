import expect from 'unexpected'
import Form from '../../src/form/Form'
import Immutable from 'immutable'
import RadioButtonField from '../../src/form/RadioButtonField'
import React from 'react'
import sinon from 'sinon'
import TestUtils from 'react-testutils-additions'

const radioButtons = [
  {label: 'Yes', value: true},
  {label: 'No', value: false}
]

function render ({visibility} = {}) {
  const initialValue = Immutable.fromJS({visibility})
  const onSubmit = sinon.spy()

  const dom = TestUtils.renderIntoDocument(
    <Form name="test" value={initialValue} onSubmit={onSubmit}>
      <RadioButtonField
        name="visibility"
        buttons={radioButtons}/>
    </Form>
  )
  const form = TestUtils.findOne(dom, 'form')
  const buttons = TestUtils.find(dom, 'input')

  return {initialValue, onSubmit, dom, form, buttons}
}

describe('RadioButtonField', function () {
  it('renders with initial value', function () {
    const {dom} = render({visibility: false})
    expect(dom, 'to have rendered',
      <form>
        <div>
          <span>
            <input
              name="test.visibility"
              type="radio"/>
            <label htmlFor="visibility.0">Yes</label>
          </span>
          <span>
            <input
              checked
              name="test.visibility"
              type="radio"/>
            <label htmlFor="visibility.1">No</label>
          </span>
        </div>
      </form>
    )
  })

  it('returns new value', function () {
    const {onSubmit, form, buttons} = render({visibility: true})

    TestUtils.Simulate.click(buttons[1])
    TestUtils.Simulate.change(buttons[1])
    TestUtils.Simulate.submit(form)

    expect(onSubmit, 'to have calls satisfying', function () {
      onSubmit(Immutable.fromJS({
        visibility: false
      }))
    })
  })
})

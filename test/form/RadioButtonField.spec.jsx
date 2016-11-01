import expect from 'unexpected'
import {RadioButtonFieldRaw} from '../../src/form/RadioButtonField'
import React from 'react'
import sinon from 'sinon'
import TestUtils from 'react-testutils-additions'

function render ({value} = {}) {
  const buttons = [
    {label: 'Yes', value: true},
    {label: 'No', value: false}
  ]
  const onChange = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <RadioButtonFieldRaw value={value} onChange={onChange} name="visibility" fullName="test.visibility" buttons={buttons}/>
  )
  const radioButtons = TestUtils.find(dom, 'input')

  return {onChange, dom, radioButtons}
}

describe('RadioButtonField', function () {
  it('renders with initial value', function () {
    const {dom} = render({value: false})
    expect(dom, 'to have rendered',
      <div>
        <span>
          <input
            id="test.visibility.0"
            name="test.visibility"
            type="radio"/>
          <label htmlFor="test.visibility.0">Yes</label>
        </span>
        <span>
          <input
            checked
            id="test.visibility.1"
            name="test.visibility"
            type="radio"/>
          <label htmlFor="test.visibility.1">No</label>
        </span>
      </div>
    )
  })

  it('returns new value', function () {
    const {onChange, radioButtons} = render({value: true})

    TestUtils.Simulate.click(radioButtons[1])
    TestUtils.Simulate.change(radioButtons[1])

    expect(onChange, 'to have calls satisfying', () => onChange(false))
  })
})

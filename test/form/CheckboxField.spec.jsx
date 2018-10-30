import Immutable from 'immutable'
import React from 'react'
import TestUtils from 'react-testutils-additions'
import sinon from 'sinon'
import expect from 'unexpected'

import { CheckboxFieldRaw } from '../../src/form/CheckboxField'

function render({ value, negate = false } = {}) {
  const initialValue = Immutable.fromJS({ value })
  const onChange = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <CheckboxFieldRaw value={value} onChange={onChange} negate={negate} />
  )
  const checkboxField = TestUtils.findOne(dom, 'input[type="checkbox"]')

  return { initialValue, onChange, dom, checkboxField }
}

describe('CheckboxField', function() {
  it('renders', function() {
    const { dom: dom1 } = render({ value: false })
    expect(dom1, 'to have rendered', <input type="checkbox" checked={false} />)

    const { dom: dom2 } = render({ value: true })
    expect(dom2, 'to have rendered', <input type="checkbox" checked />)
  })

  it('returns new value', function() {
    const { onChange, checkboxField } = render({ value: false })

    expect(onChange, 'was not called')
    TestUtils.Simulate.change(checkboxField, { target: { checked: true } })
    expect(onChange, 'to have calls satisfying', () => onChange(true))
  })

  it('negates value', function() {
    const { onChange, dom, checkboxField } = render({
      value: false,
      negate: true
    })

    expect(dom, 'to have rendered', <input type="checkbox" checked />)
    TestUtils.Simulate.change(checkboxField, { target: { checked: false } })
    expect(onChange, 'to have calls satisfying', () => onChange(true))
  })
})

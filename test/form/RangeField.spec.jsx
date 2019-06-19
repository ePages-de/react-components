import React from 'react'
import TestUtils from 'react-testutils-additions'
import sinon from 'sinon'

import { RangeFieldRaw } from '../../src/form/RangeField'
import expect from '../unexpected'

function render ({ value } = {}) {
  const onChange = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <RangeFieldRaw value={value} onChange={onChange} min={0} max={100} />
  )
  const rangeField = TestUtils.findOne(dom, 'input')

  return { onChange, dom, rangeField }
}

describe('RangeField', function () {
  it('renders', function () {
    const { dom } = render({ value: 23 })

    expect(dom, 'to have rendered',
      <input type="range" value={23} />
    )
  })

  it('returns new value', function () {
    const { onChange, rangeField } = render({ value: 0 })

    expect(onChange, 'was not called')
    TestUtils.Simulate.change(rangeField, { target: { value: 10 } })
    expect(onChange, 'to have calls satisfying', () => onChange(10))
  })
})

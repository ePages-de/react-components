import React from 'react'
import TestUtils from 'react-testutils-additions'
import sinon from 'sinon'
import expect from 'unexpected'

import {DropDownFieldRaw} from '../../src/form/DropDownField'

function render ({value = 'm'} = {}) {
  const sizes = [
    {value: 's', label: 'Small'},
    {value: 'm', label: 'Medium'},
    {value: 'l', label: 'Large'}
  ]
  const onChange = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <DropDownFieldRaw value={value} onChange={onChange} options={sizes} />
  )
  const sizeField = TestUtils.findOne(dom, 'select')

  return {onChange, dom, sizeField}
}

describe('DropDownField', function () {
  it('renders', function () {
    const {dom} = render()

    expect(dom, 'to have rendered',
      <select value="m">
        <option value="s">Small</option>
        <option value="m">Medium</option>
        <option value="l">Large</option>
      </select>
    )
  })

  it('returns new value', function () {
    const {onChange, sizeField} = render()

    expect(onChange, 'was not called')
    TestUtils.Simulate.change(sizeField, {target: {value: 'l'}})
    expect(onChange, 'to have calls satisfying', () => onChange('l'))
  })
})

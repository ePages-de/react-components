import React from 'react'
import TestUtils from 'react-testutils-additions'
import sinon from 'sinon'
import expect from 'unexpected'

import { DropDownFieldRaw } from '../../src/form/DropDownField'

function render(props) {
  const onChange = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <DropDownFieldRaw
      value="m"
      onChange={onChange}
      options={[
        { value: 's', label: 'Small' },
        { value: 'm', label: 'Medium' },
        { value: 'l', label: 'Large' }
      ]}
      {...props}
    />
  )
  const testField = TestUtils.findOne(dom, 'select')

  return { onChange, dom, testField }
}

describe('DropDownField', function() {
  it('should work with string options', function() {
    const { dom, onChange, testField } = render()

    expect(
      dom,
      'to have rendered',
      <select value="m">
        <option value="s">Small</option>
        <option value="m">Medium</option>
        <option value="l">Large</option>
      </select>
    )

    expect(onChange, 'was not called')
    TestUtils.Simulate.change(testField, { target: { value: 'l' } })
    expect(onChange, 'to have calls satisfying', () => onChange('l'))
  })

  it('should work with number options', function() {
    const { dom, onChange, testField } = render({
      value: 200,
      options: [
        { value: 200, label: '200' },
        { value: 200.5, label: '200.5' },
        { value: 300, label: '300' }
      ]
    })

    expect(
      dom,
      'to have rendered',
      <select value="200">
        <option value="200">200</option>
        <option value="200.5">200.5</option>
        <option value="300">300</option>
      </select>
    )

    expect(onChange, 'was not called')
    TestUtils.Simulate.change(testField, { target: { value: '200.5' } })
    expect(onChange, 'to have calls satisfying', () => onChange(200.5))
  })

  it('should work with boolean options', function() {
    const { dom, onChange, testField } = render({
      value: false,
      options: [
        { value: true, label: 'Opened' },
        { value: false, label: 'Closed' }
      ]
    })

    expect(
      dom,
      'to have rendered',
      <select value="false">
        <option value="true">Opened</option>
        <option value="false">Closed</option>
      </select>
    )

    expect(onChange, 'was not called')
    TestUtils.Simulate.change(testField, { target: { value: 'true' } })
    expect(onChange, 'to have calls satisfying', () => onChange(true))
  })
})

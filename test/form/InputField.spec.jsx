import React from 'react'
import TestUtils from 'react-testutils-additions'
import sinon from 'sinon'
import expect from 'unexpected'

import {InputFieldRaw} from '../../src/form/InputField'

function render ({value} = {}) {
  const onChange = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <InputFieldRaw value={value} onChange={onChange} />
  )
  const inputField = TestUtils.findOne(dom, 'input')

  return {onChange, dom, inputField}
}

describe('InputField', function () {
  it('renders', function () {
    const {dom} = render({value: 'foobar'})

    expect(dom, 'to have rendered',
      <input type="text" value="foobar" />
    )
  })

  it('returns new value', function () {
    const {onChange, inputField} = render({value: 'foobar'})

    expect(onChange, 'was not called')
    TestUtils.Simulate.change(inputField, {target: {value: 'foobar-new'}})
    expect(onChange, 'to have calls satisfying', () => onChange('foobar-new'))
  })
})

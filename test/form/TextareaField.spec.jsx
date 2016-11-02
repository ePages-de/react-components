import expect from 'unexpected'
import React from 'react'
import sinon from 'sinon'
import TestUtils from 'react-testutils-additions'
import {TextareaFieldRaw} from '../../src/form/TextareaField'

function render ({value} = {}) {
  const onChange = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <TextareaFieldRaw value={value} onChange={onChange}/>
  )
  const textarea = TestUtils.findOne(dom, 'textarea')

  return {onChange, dom, textarea}
}

describe('TextareaField', function () {
  it('renders', function () {
    const {dom} = render({value: 'foo\nbar'})

    expect(dom, 'to have rendered',
      <textarea value={'foo\nbar'}/>
    )
  })

  it('returns new value', function () {
    const {onChange, textarea} = render({value: 'foobar1'})

    expect(onChange, 'was not called')
    TestUtils.Simulate.change(textarea, {target: {value: 'foobar2'}})
    expect(onChange, 'to have calls satisfying', () => onChange('foobar2'))
  })
})

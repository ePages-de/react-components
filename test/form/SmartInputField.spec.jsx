import Bluebird from 'bluebird'
import Immutable from 'immutable'
import React from 'react'
import TestUtils from 'react-testutils-additions'
import sinon from 'sinon'
import expect from 'unexpected'

import { SmartInputFieldRaw } from '../../src/form/SmartInputField'

function render({
  value = Immutable.fromJS([]),
  getSuggestions,
  suggestionDisabled,
  strict = false,
  disabled = false,
  resetText = true,
  selectText = true,
  placeholderText = 'Usage hint'
} = {}) {
  const onChange = sinon.spy()
  const onBlur = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <SmartInputFieldRaw
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      getSuggestions={getSuggestions}
      suggestionDisabled={suggestionDisabled}
      strict={strict}
      placeholderText={placeholderText}
      resetText={resetText}
      selectText={selectText}
      className="smart-input"
    />
  )
  const input = TestUtils.findOne(dom, 'input')

  return {
    value,
    getSuggestions,
    suggestionDisabled,
    strict,
    onChange,
    dom,
    input,
    onBlur
  }
}

describe('SmartInputField', () => {
  it('renders', () => {
    const { dom } = render({
      value: Immutable.fromJS(['first', 'second'])
    })

    expect(
      dom,
      'to have rendered',
      <div>
        <div>
          <div>first</div>
          <div>second</div>
          <input placeholder="Usage hint" disabled={false} />
        </div>
      </div>
    )
  })

  it('renders disabled', () => {
    const { dom } = render({
      disabled: true
    })

    expect(
      dom,
      'to have rendered',
      <div>
        <div>
          <input placeholder="Usage hint" disabled />
        </div>
      </div>
    )
  })

  it('focuses and blurs', () => {
    const { input, onBlur } = render()

    TestUtils.Simulate.focus(input)
    TestUtils.Simulate.blur(input)
    expect(onBlur, 'was called once')
  })

  it('adds new non-strict value', () => {
    const { onChange, input } = render({
      value: Immutable.fromJS(['first', 'second'])
    })

    TestUtils.Simulate.change(input, { target: { value: 'third' } })
    expect(onChange, 'was not called')

    TestUtils.Simulate.keyDown(input, { keyCode: 13 })
    expect(onChange, 'to have calls satisfying', () =>
      onChange(Immutable.fromJS(['first', 'second', 'third']))
    )
  })

  it('adds new strict value (non-strict input)', () => {
    const { onChange, input } = render({
      value: Immutable.fromJS(['first', 'second']),
      getSuggestions: (text, value) =>
        Bluebird.resolve(
          ['first-suggested', 'second-suggested', 'third-suggested'].filter(s =>
            s.includes(text)
          )
        ),
      strict: false
    })

    TestUtils.Simulate.change(input, { target: { value: 'thi' } })

    // wait for getSuggestions promise to resolve
    return Bluebird.delay(10).then(() => {
      TestUtils.Simulate.keyDown(input, { keyCode: 40 })
      TestUtils.Simulate.keyDown(input, { keyCode: 13 })

      expect(onChange, 'to have calls satisfying', () =>
        onChange(Immutable.fromJS(['first', 'second', 'third-suggested']))
      )
    })
  })

  it('adds new strict value (strict input)', () => {
    const { onChange, input } = render({
      value: Immutable.fromJS(['first', 'second']),
      getSuggestions: text =>
        Bluebird.resolve(
          ['first-suggested', 'second-suggested', 'third-suggested'].filter(s =>
            s.includes(text)
          )
        ),
      strict: true
    })

    TestUtils.Simulate.change(input, { target: { value: 'thi' } })

    // wait for getSuggestions promise to resolve
    return Bluebird.delay(10).then(() => {
      TestUtils.Simulate.keyDown(input, { keyCode: 13 })

      expect(onChange, 'to have calls satisfying', () =>
        onChange(Immutable.fromJS(['first', 'second', 'third-suggested']))
      )
    })
  })

  it('adds no value if not suitable suggestion (strict input)', () => {
    const { onChange, input } = render({
      value: Immutable.fromJS(['first', 'second']),
      getSuggestions: (text, value) => Bluebird.resolve([]),
      strict: true
    })

    TestUtils.Simulate.change(input, { target: { value: 'thi' } })

    // wait for getSuggestions promise to resolve
    return Bluebird.delay(10).then(() => {
      TestUtils.Simulate.keyDown(input, { keyCode: 13 })

      expect(onChange, 'was not called')
    })
  })

  it('reset the text by default', () => {
    const { getSuggestions, input } = render({
      getSuggestions: sinon.stub().returns(Promise.resolve([]))
    })

    TestUtils.Simulate.change(input, { target: { value: 'test' } })

    // wait for getSuggestions promise to resolve
    return Bluebird.delay(10).then(() => {
      TestUtils.Simulate.keyDown(input, { keyCode: 40 })
      TestUtils.Simulate.keyDown(input, { keyCode: 13 })

      expect(getSuggestions, 'to have calls satisfying', [
        ['test', Immutable.fromJS([])],
        ['', Immutable.fromJS(['test'])]
      ])
      expect(input.value, 'to equal', '')
    })
  })

  it('not reset the text with the related option and select it by default', () => {
    const { getSuggestions, input } = render({
      getSuggestions: sinon.stub().returns(Promise.resolve([])),
      resetText: false
    })
    const select = sinon.spy(input, 'select')

    TestUtils.Simulate.change(input, { target: { value: 'test' } })

    // wait for getSuggestions promise to resolve
    return Bluebird.delay(10).then(() => {
      TestUtils.Simulate.keyDown(input, { keyCode: 40 })
      TestUtils.Simulate.keyDown(input, { keyCode: 13 })

      expect(getSuggestions, 'to have calls satisfying', [
        ['test', Immutable.fromJS([])],
        ['test', Immutable.fromJS(['test'])]
      ])
      expect(input.value, 'to equal', 'test')
      expect(select, 'was called once')
    })
  })

  it('not reset the text and not select it with the related options', () => {
    const { getSuggestions, input } = render({
      getSuggestions: sinon.stub().returns(Promise.resolve([])),
      resetText: false,
      selectText: false
    })
    const select = sinon.spy(input, 'select')

    TestUtils.Simulate.change(input, { target: { value: 'test' } })

    // wait for getSuggestions promise to resolve
    return Bluebird.delay(10).then(() => {
      TestUtils.Simulate.keyDown(input, { keyCode: 40 })
      TestUtils.Simulate.keyDown(input, { keyCode: 13 })

      expect(getSuggestions, 'to have calls satisfying', [
        ['test', Immutable.fromJS([])],
        ['test', Immutable.fromJS(['test'])]
      ])
      expect(input.value, 'to equal', 'test')
      expect(select, 'was not called')
    })
  })

  it('changes suggestion selection by arrow keys', () => {
    const { getSuggestions, dom, input } = render({
      value: Immutable.fromJS(['first', 'second']),
      getSuggestions: sinon.spy((text, value) =>
        Bluebird.resolve([
          'third-suggested',
          'fourth-suggested',
          'fifth-suggested',
          'sixth-suggested'
        ])
      ),
      suggestionDisabled: (suggestion, index) => index % 2 === 0
    })

    TestUtils.Simulate.change(input, { target: { value: '' } })

    // wait for getSuggestions promise to resolve
    return Bluebird.delay(10).then(() => {
      expect(getSuggestions, 'was called once')

      expect(
        dom,
        'to have rendered',
        <div>
          <div>
            <div>first</div>
            <div>second</div>
            <input />
          </div>
          <div>
            <div>third-suggested</div>
            <div>fourth-suggested</div>
            <div>fifth-suggested</div>
            <div>sixth-suggested</div>
          </div>
        </div>
      )

      TestUtils.Simulate.keyDown(input, { keyCode: 40 })
      expect(
        dom,
        'to have rendered',
        <div>
          <div>
            <div>first</div>
            <div>second</div>
            <input />
          </div>
          <div>
            <div>third-suggested</div>
            <div className="smart-input-suggestion-active">
              fourth-suggested
            </div>
            <div>fifth-suggested</div>
            <div>sixth-suggested</div>
          </div>
        </div>
      )

      TestUtils.Simulate.keyDown(input, { keyCode: 40 })
      expect(
        dom,
        'to have rendered',
        <div>
          <div>
            <div>first</div>
            <div>second</div>
            <input />
          </div>
          <div>
            <div>third-suggested</div>
            <div>fourth-suggested</div>
            <div>fifth-suggested</div>
            <div className="smart-input-suggestion-active">sixth-suggested</div>
          </div>
        </div>
      )

      TestUtils.Simulate.keyDown(input, { keyCode: 38 })
      expect(
        dom,
        'to have rendered',
        <div>
          <div>
            <div>first</div>
            <div>second</div>
            <input />
          </div>
          <div>
            <div>third-suggested</div>
            <div className="smart-input-suggestion-active">
              fourth-suggested
            </div>
            <div>fifth-suggested</div>
            <div>sixth-suggested</div>
          </div>
        </div>
      )

      TestUtils.Simulate.keyDown(input, { keyCode: 38 })

      return null
    })
  })

  it('removes previous value on backspace', () => {
    const { onChange, input } = render({
      value: Immutable.fromJS(['first', 'second'])
    })

    TestUtils.Simulate.change(input, { target: { value: '12' } })
    TestUtils.Simulate.keyDown(input, { keyCode: 8 })

    TestUtils.Simulate.change(input, { target: { value: '' } })
    TestUtils.Simulate.keyDown(input, { keyCode: 8 })

    expect(onChange, 'to have calls satisfying', () => {
      onChange(Immutable.fromJS(['first']))
    })
  })

  it('resets input text on escape', () => {
    const { dom, input } = render()

    TestUtils.Simulate.change(input, { target: { value: '12' } })
    expect(
      dom,
      'to have rendered',
      <div>
        <div>
          <input value="12" />
        </div>
      </div>
    )

    TestUtils.Simulate.keyDown(input, { keyCode: 27 })
    expect(
      dom,
      'to have rendered',
      <div>
        <div>
          <input value="" />
        </div>
      </div>
    )
  })
})

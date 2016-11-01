import Bluebird from 'bluebird'
import expect from 'unexpected'
import Immutable from 'immutable'
import React from 'react'
import sinon from 'sinon'
import {SmartInputFieldRaw} from '../../src/form/SmartInputField'
import TestUtils from 'react-testutils-additions'

function render ({value = Immutable.fromJS([]), getSuggestions, suggestionDisabled, strict = false} = {}) {
  const onChange = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <SmartInputFieldRaw
      value={value}
      onChange={onChange}
      getSuggestions={getSuggestions}
      suggestionDisabled={suggestionDisabled}
      strict={strict}
      className="smart-input"/>
  )
  const input = TestUtils.findOne(dom, 'input')

  return {value, getSuggestions, suggestionDisabled, strict, onChange, dom, input}
}

describe('SmartInputField', () => {
  it('renders', () => {
    const {dom} = render({
      value: Immutable.fromJS(['first', 'second'])
    })

    expect(dom, 'to have rendered',
      <div>
        <div>
          <div>first</div>
          <div>second</div>
          <input/>
        </div>
      </div>
    )
  })

  it('focuses and blurs', () => {
    const {input} = render()

    TestUtils.Simulate.focus(input)
    TestUtils.Simulate.blur(input)
  })

  it('adds new non-strict value', () => {
    const {onChange, input} = render({
      value: Immutable.fromJS(['first', 'second'])
    })

    TestUtils.Simulate.change(input, {target: {value: 'third'}})
    expect(onChange, 'was not called')

    TestUtils.Simulate.keyDown(input, {keyCode: 13})
    expect(onChange, 'to have calls satisfying', () => onChange(Immutable.fromJS(['first', 'second', 'third'])))
  })

  it('adds new strict value (non-strict input)', () => {
    const {onChange, input} = render({
      value: Immutable.fromJS(['first', 'second']),
      getSuggestions: (text, value) => Bluebird.resolve(['first-suggested', 'second-suggested', 'third-suggested'].filter((s) => s.includes(text))),
      strict: false
    })

    TestUtils.Simulate.change(input, {target: {value: 'thi'}})

    // wait for getSuggestions promise to resolve
    return Bluebird.delay(10).then(() => {
      TestUtils.Simulate.keyDown(input, {keyCode: 40})
      TestUtils.Simulate.keyDown(input, {keyCode: 13})

      expect(onChange, 'to have calls satisfying', () => onChange(Immutable.fromJS(['first', 'second', 'third-suggested'])))
    })
  })

  it('adds new strict value (strict input)', () => {
    const {onChange, input} = render({
      value: Immutable.fromJS(['first', 'second']),
      getSuggestions: (text) => Bluebird.resolve(['first-suggested', 'second-suggested', 'third-suggested'].filter((s) => s.includes(text))),
      strict: true
    })

    TestUtils.Simulate.change(input, {target: {value: 'thi'}})

    // wait for getSuggestions promise to resolve
    return Bluebird.delay(10).then(() => {
      TestUtils.Simulate.keyDown(input, {keyCode: 13})

      expect(onChange, 'to have calls satisfying', () => onChange(Immutable.fromJS(['first', 'second', 'third-suggested'])))
    })
  })

  it('adds no value if not suitable suggestion (strict input)', () => {
    const {onChange, input} = render({
      value: Immutable.fromJS(['first', 'second']),
      getSuggestions: (text, value) => Bluebird.resolve([]),
      strict: true
    })

    TestUtils.Simulate.change(input, {target: {value: 'thi'}})

    // wait for getSuggestions promise to resolve
    return Bluebird.delay(10).then(() => {
      TestUtils.Simulate.keyDown(input, {keyCode: 13})

      expect(onChange, 'was not called')
    })
  })

  it('changes suggestion selection by arrow keys', () => {
    const {getSuggestions, dom, input} = render({
      value: Immutable.fromJS(['first', 'second']),
      getSuggestions: sinon.spy((text, value) => Bluebird.resolve(['third-suggested', 'fourth-suggested', 'fifth-suggested', 'sixth-suggested'])),
      suggestionDisabled: (suggestion, index) => index % 2 === 0
    })

    TestUtils.Simulate.change(input, {target: {value: ''}})

    // wait for getSuggestions promise to resolve
    return Bluebird.delay(10).then(() => {
      expect(getSuggestions, 'was called once')

      expect(dom, 'to have rendered',
        <div>
          <div>
            <div>first</div>
            <div>second</div>
            <input/>
          </div>
          <div>
            <div>third-suggested</div>
            <div>fourth-suggested</div>
            <div>fifth-suggested</div>
            <div>sixth-suggested</div>
          </div>
        </div>
      )

      TestUtils.Simulate.keyDown(input, {keyCode: 40})
      expect(dom, 'to have rendered',
        <div>
          <div>
            <div>first</div>
            <div>second</div>
            <input/>
          </div>
          <div>
            <div>third-suggested</div>
            <div className="smart-input-suggestion-active">fourth-suggested</div>
            <div>fifth-suggested</div>
            <div>sixth-suggested</div>
          </div>
        </div>
      )

      TestUtils.Simulate.keyDown(input, {keyCode: 40})
      expect(dom, 'to have rendered',
        <div>
          <div>
            <div>first</div>
            <div>second</div>
            <input/>
          </div>
          <div>
            <div>third-suggested</div>
            <div>fourth-suggested</div>
            <div>fifth-suggested</div>
            <div className="smart-input-suggestion-active">sixth-suggested</div>
          </div>
        </div>
      )

      TestUtils.Simulate.keyDown(input, {keyCode: 38})
      expect(dom, 'to have rendered',
        <div>
          <div>
            <div>first</div>
            <div>second</div>
            <input/>
          </div>
          <div>
            <div>third-suggested</div>
            <div className="smart-input-suggestion-active">fourth-suggested</div>
            <div>fifth-suggested</div>
            <div>sixth-suggested</div>
          </div>
        </div>
      )

      TestUtils.Simulate.keyDown(input, {keyCode: 38})

      return null
    })
  })

  it('removes previous value on backspace', () => {
    const {onChange, input} = render({
      value: Immutable.fromJS(['first', 'second'])
    })

    TestUtils.Simulate.change(input, {target: {value: '12'}})
    TestUtils.Simulate.keyDown(input, {keyCode: 8})

    TestUtils.Simulate.change(input, {target: {value: ''}})
    TestUtils.Simulate.keyDown(input, {keyCode: 8})

    expect(onChange, 'to have calls satisfying', () => {
      onChange(Immutable.fromJS(['first']))
    })
  })

  it('resets input text on escape', () => {
    const {dom, input} = render()

    TestUtils.Simulate.change(input, {target: {value: '12'}})
    expect(dom, 'to have rendered',
      <div>
        <div>
          <input value="12"/>
        </div>
      </div>
    )

    TestUtils.Simulate.keyDown(input, {keyCode: 27})
    expect(dom, 'to have rendered',
      <div>
        <div>
          <input value=""/>
        </div>
      </div>
    )
  })
})

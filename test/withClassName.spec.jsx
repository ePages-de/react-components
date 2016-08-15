import expect from 'unexpected'
import React from 'react'
import sinon from 'sinon'
import TestUtils from 'react-testutils-additions'
import withClassName from '../src/withClassName'

function render ({className, hoistedMethods = []} = {}) {
  const focusSpy = sinon.spy()

  class TestComponent extends React.Component {
    render () {
      return <div {...this.props}>TestComponent</div>
    }

    focus = () => {
      focusSpy()
    }
  }
  const TestComponentWithClassName = withClassName(className, hoistedMethods)(TestComponent)

  const dom = TestUtils.renderIntoDocument(
    <TestComponentWithClassName/>
  )

  return {focus: focusSpy, dom}
}

describe('withClassName', function () {
  it('renders', function () {
    const {dom} = render({className: 'foobar'})

    expect(dom, 'to have rendered',
      <div className="foobar">TestComponent</div>
    )
  })

  it('hoists instance methods', function () {
    const {dom: dom1} = render({hoistedMethods: []})
    expect(dom1.focus, 'to be undefined')

    const {dom: dom2, focus} = render({hoistedMethods: ['focus']})
    expect(focus, 'was not called')
    dom2.focus()
    expect(focus, 'was called once')
  })
})

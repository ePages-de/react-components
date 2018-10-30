import Immutable from 'immutable'
import React from 'react'
import TestUtils from 'react-testutils-additions'
import sinon from 'sinon'
import expect from 'unexpected'

import { SortFieldRaw } from '../../src/form/SortField'

const defaultValue = Immutable.fromJS([{ name: 'first' }, { name: 'second' }])

function render({ value = defaultValue } = {}) {
  const onChange = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <SortFieldRaw
      value={value}
      onChange={onChange}
      className="list"
      orientation="vertical"
      itemSize={30}
      crossAxisItemSize={100}
      itemCount={value.count()}>
      {item => (
        <div
          className={[
            'list-item',
            item.get('__isSource') && 'source-yes',
            !item.get('__isSource') && 'source-no',
            item.get('__isTarget') && 'target-yes',
            !item.get('__isTarget') && 'target-no',
            item.get('__isDragging') && 'dragging-yes',
            !item.get('__isDragging') && 'dragging-no'
          ]
            .filter(Boolean)
            .join(' ')}>
          {item.get('name')}
        </div>
      )}
    </SortFieldRaw>
  )
  const items = TestUtils.find(dom, '.list-item')

  return { onChange, dom, items }
}

describe('SortField', function() {
  it('renders', function() {
    const { dom } = render()

    expect(
      dom,
      'to have rendered',
      <div className="list">
        <div>
          <div className="list-item source-no target-no">first</div>
        </div>
        <div>
          <div className="list-item source-no target-no">second</div>
        </div>
      </div>
    )
  })

  it('returns new value', function() {
    const { onChange, items } = render()

    expect(onChange, 'was not called')
    TestUtils.Simulate.dragStart(items[0], {
      dataTransfer: { setData: () => {} }
    })
    TestUtils.Simulate.dragEnter(items[1])
    TestUtils.Simulate.dragOver(items[1])

    expect(onChange, 'was not called')
    TestUtils.Simulate.drop(items[1])

    expect(onChange, 'to have calls satisfying', () => {
      onChange(Immutable.fromJS([{ name: 'second' }, { name: 'first' }]))
    })
  })

  it('adds source/target information', function() {
    const { onChange, dom, items } = render()

    TestUtils.Simulate.dragStart(items[0])

    expect(
      dom,
      'to have rendered',
      <div className="list">
        <div className="list-item source-yes target-no dragging-yes">first</div>
        <div className="list-item source-no target-no dragging-yes">second</div>
      </div>
    )

    TestUtils.Simulate.dragEnter(items[1])
    TestUtils.Simulate.dragOver(items[1])

    expect(
      dom,
      'to have rendered',
      <div className="list">
        <div className="list-item source-yes target-no dragging-yes">first</div>
        <div className="list-item source-no target-yes dragging-yes">
          second
        </div>
      </div>
    )

    TestUtils.Simulate.dragLeave(items[1])
    TestUtils.Simulate.dragEnd(items[0])

    expect(
      dom,
      'to have rendered',
      <div className="list">
        <div className="list-item source-no target-no dragging-no">first</div>
        <div className="list-item source-no target-no dragging-no">second</div>
      </div>
    )

    TestUtils.Simulate.dragStart(items[1])
    TestUtils.Simulate.dragEnter(items[0])
    TestUtils.Simulate.dragOver(items[0])

    expect(
      dom,
      'to have rendered',
      <div className="list">
        <div className="list-item source-no target-yes dragging-yes">first</div>
        <div className="list-item source-yes target-no dragging-yes">
          second
        </div>
      </div>
    )

    TestUtils.Simulate.dragLeave(items[0])
    TestUtils.Simulate.dragEnd(items[1])

    expect(
      dom,
      'to have rendered',
      <div className="list">
        <div className="list-item source-no target-no dragging-no">first</div>
        <div className="list-item source-no target-no dragging-no">second</div>
      </div>
    )

    expect(onChange, 'was not called')
  })
})

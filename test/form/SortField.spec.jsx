import classnames from 'classnames'
import expect from 'unexpected'
import Form from '../../src/form/Form'
import Immutable from 'immutable'
import React from 'react'
import sinon from 'sinon'
import SortField from '../../src/form/SortField'
import TestUtils from 'react-testutils-additions'

function render () {
  const initialValue = Immutable.fromJS({
    persons: [
      {name: 'first'},
      {name: 'second'}
    ]
  })
  const onSubmit = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <Form name="test" value={initialValue} onSubmit={onSubmit}>
      <div>
        <SortField
          name="persons"
          className="list"
          orientation="vertical"
          itemSize={30}
          crossAxisItemSize={100}
          itemCount={initialValue.get('persons').count()}>
          {(item) =>
            <div
              className={classnames('list-item', {
                'source-yes': item.get('__isSource'),
                'source-no': !item.get('__isSource'),
                'target-yes': item.get('__isTarget'),
                'target-no': !item.get('__isTarget'),
                'dragging-yes': item.get('__isDragging'),
                'dragging-no': !item.get('__isDragging')
              })}>
              {item.get('name')}
            </div>
          }
        </SortField>
      </div>
    </Form>
  )
  const form = TestUtils.findOne(dom, 'form')
  const items = TestUtils.find(dom, '.list-item')

  return {initialValue, onSubmit, dom, form, items}
}

describe('SortField', function () {
  it('renders', function () {
    const {dom} = render()

    expect(dom, 'to have rendered',
      <form>
        <div className="list">
          <div><div className="list-item source-no target-no">first</div></div>
          <div><div className="list-item source-no target-no">second</div></div>
        </div>
      </form>
    )
  })

  it('returns new value', function () {
    const {onSubmit, form, items} = render()

    expect(onSubmit, 'was not called')
    TestUtils.Simulate.dragStart(items[0], {dataTransfer: {setData: () => {}}})
    TestUtils.Simulate.dragEnter(items[1])
    TestUtils.Simulate.dragOver(items[1])

    expect(onSubmit, 'was not called')
    TestUtils.Simulate.drop(items[1])
    TestUtils.Simulate.submit(form)

    expect(onSubmit, 'was called once')
    expect(onSubmit, 'to have calls satisfying', function () {
      onSubmit(Immutable.fromJS({
        persons: [
          {name: 'second'},
          {name: 'first'}
        ]
      }))
    })
  })

  it('adds source/target information', function () {
    const {onSubmit, dom, items} = render()

    TestUtils.Simulate.dragStart(items[0])

    expect(dom, 'to have rendered',
      <form>
        <div className="list">
          <div className="list-item source-yes target-no dragging-yes">first</div>
          <div className="list-item source-no target-no dragging-yes">second</div>
        </div>
      </form>
    )

    TestUtils.Simulate.dragEnter(items[1])
    TestUtils.Simulate.dragOver(items[1])

    expect(dom, 'to have rendered',
      <form>
        <div className="list">
          <div className="list-item source-yes target-no dragging-yes">first</div>
          <div className="list-item source-no target-yes dragging-yes">second</div>
        </div>
      </form>
    )

    TestUtils.Simulate.dragLeave(items[1])
    TestUtils.Simulate.dragEnd(items[0])

    expect(dom, 'to have rendered',
      <form>
        <div className="list">
          <div className="list-item source-no target-no dragging-no">first</div>
          <div className="list-item source-no target-no dragging-no">second</div>
        </div>
      </form>
    )

    TestUtils.Simulate.dragStart(items[1])
    TestUtils.Simulate.dragEnter(items[0])
    TestUtils.Simulate.dragOver(items[0])

    expect(dom, 'to have rendered',
      <form>
        <div className="list">
          <div className="list-item source-no target-yes dragging-yes">first</div>
          <div className="list-item source-yes target-no dragging-yes">second</div>
        </div>
      </form>
    )

    TestUtils.Simulate.dragLeave(items[0])
    TestUtils.Simulate.dragEnd(items[1])

    expect(dom, 'to have rendered',
      <form>
        <div className="list">
          <div className="list-item source-no target-no dragging-no">first</div>
          <div className="list-item source-no target-no dragging-no">second</div>
        </div>
      </form>
    )

    expect(onSubmit, 'was not called')
  })
})

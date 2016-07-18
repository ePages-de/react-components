import ErrorMessage from '../../src/form/ErrorMessage'
import expect from 'unexpected'
import Form from '../../src/form/Form'
import Immutable from 'immutable'
import IteratorField from '../../src/form/IteratorField'
import React from 'react'
import sinon from 'sinon'
import TestField from './TestField'
import TestUtils from 'react-testutils-additions'

function render ({validate, skip, take} = {}) {
  const initialValue = Immutable.fromJS({
    tags: [
      {name: 'first'},
      {name: 'second'}
    ]
  })
  const onSubmit = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <Form name="test" value={initialValue} onSubmit={onSubmit} validate={validate}>
      <div>
        <IteratorField name="tags" skip={skip} take={take}>
          <div>
            <TestField name="name" className="tagName"/>
            <ErrorMessage name="name" className="tagName-error"/>
          </div>
        </IteratorField>
      </div>
    </Form>
  )
  const form = TestUtils.findOne(dom, 'form')
  const tagNameFields = TestUtils.find(dom, '.tagName')

  return {initialValue, onSubmit, dom, form, tagNameFields}
}

describe('IteratorField', function () {
  it('renders', function () {
    const {dom} = render()

    expect(dom, 'to have rendered',
      <form>
        <div>
          <div><input name="test.tags.0.name" value="first"/></div>
          <div><input name="test.tags.1.name" value="second"/></div>
        </div>
      </form>
    )
  })

  it('skips items', function () {
    const {dom} = render({skip: 1})

    expect(dom, 'to have rendered',
      <form>
        <div>
          <input name="test.tags.1.name" value="second"/>
        </div>
      </form>
    )
  })

  it('takes items', function () {
    const {dom} = render({take: 1})

    expect(dom, 'to have rendered',
      <form>
        <div>
          <input name="test.tags.0.name" value="first"/>
        </div>
      </form>
    )
  })

  it('returns new value', function () {
    const {onSubmit, form, tagNameFields} = render()

    expect(tagNameFields, 'to have length', 2)
    expect(onSubmit, 'was not called')
    TestUtils.Simulate.change(tagNameFields[0], {target: {value: 'first-new'}})
    TestUtils.Simulate.change(tagNameFields[1], {target: {value: 'second-new'}})
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was called once')
    expect(onSubmit, 'to have calls satisfying', function () {
      onSubmit(Immutable.fromJS({
        tags: [
          {name: 'first-new'},
          {name: 'second-new'}
        ]
      }))
    })
  })

  it('passes through validation', function () {
    const validate = (value) => new Immutable.Map({
      tags: value.get('tags').map((tag) => new Immutable.Map({
        name: !tag.get('name') ? 'required' : null
      }))
    })
    const {dom, form, tagNameFields} = render({validate})

    expect(tagNameFields, 'to have length', 2)
    TestUtils.Simulate.submit(form)
    expect(dom, 'to have rendered',
      <form>
        <div>
          <div>
            <input name="test.tags.0.name" value="first"/>
          </div>
          <div>
            <input name="test.tags.1.name" value="second"/>
          </div>
        </div>
      </form>
    )

    TestUtils.Simulate.change(tagNameFields[1], {target: {value: ''}})
    TestUtils.Simulate.submit(form)
    expect(dom, 'to have rendered',
      <form>
        <div>
          <div>
            <input name="test.tags.0.name" value="first"/>
          </div>
          <div>
            <input name="test.tags.1.name" value=""/>
            <div>required</div>
          </div>
        </div>
      </form>
    )
  })
})

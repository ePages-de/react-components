import ErrorMessage from '../../src/form/ErrorMessage'
import expect from 'unexpected'
import Form from '../../src/form/Form'
import FormValueScope from '../../src/form/FormValueScope'
import Immutable from 'immutable'
import React from 'react'
import sinon from 'sinon'
import TestField from './TestField'
import TestUtils from 'react-testutils-additions'

function render ({validate} = {}) {
  const initialValue = Immutable.fromJS({
    sub: {
      name: 'first'
    }
  })
  const onSubmit = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <Form name="test" value={initialValue} onSubmit={onSubmit} validate={validate}>
      <div>
        <FormValueScope name="sub">
          <div>
            <TestField name="name" className="name"/>
            <ErrorMessage name="name" className="name-error"/>
          </div>
        </FormValueScope>
      </div>
    </Form>
  )
  const form = TestUtils.findOne(dom, 'form')
  const nameField = TestUtils.findOne(dom, '.name')

  return {initialValue, onSubmit, dom, form, nameField}
}

describe.only('FormValueScope', function () {
  it('renders', function () {
    const {dom} = render()

    expect(dom, 'to have rendered',
      <form>
        <div>
          <div>
            <input name="test.sub.name" value="first"/>
          </div>
        </div>
      </form>
    )
  })

  it('passes through validation', function () {
    const validate = (value) => Immutable.fromJS({
      sub: {
        name: !value.getIn(['sub', 'name']) ? 'required' : null
      }
    })
    const {dom, form, nameField} = render({validate})

    TestUtils.Simulate.submit(form)
    expect(dom, 'to have rendered',
      <form>
        <div>
          <div>
            <input name="test.sub.name" value="first"/>
          </div>
        </div>
      </form>
    )

    TestUtils.Simulate.change(nameField, {target: {value: ''}})
    TestUtils.Simulate.submit(form)
    expect(dom, 'to have rendered',
      <form>
        <div>
          <div>
            <input name="test.sub.name" value=""/>
            <div>required</div>
          </div>
        </div>
      </form>
    )
  })
})

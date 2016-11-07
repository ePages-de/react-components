import expect from 'unexpected'
import Form from '../../src/form/Form'
import Immutable from 'immutable'
import React from 'react'
import sinon from 'sinon'
import TestField from './TestField'
import TestUtils from 'react-testutils-additions'

function render ({validate, disabled = false} = {}) {
  const initialValue = Immutable.fromJS({
    firstName: '',
    lastName: '',
    address: {
      street: ''
    }
  })
  const onSubmit = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <Form name="test" value={initialValue} onSubmit={onSubmit} validate={validate} disabled={disabled}>
      <div>
        <TestField name="firstName" className="firstName"/>
        <div>
          <TestField name="lastName" className="lastName"/>
        </div>
        <TestField name="address.street" className="street"/>
      </div>
    </Form>
  )
  const form = TestUtils.findOne(dom, 'form')
  const firstNameField = TestUtils.findOne(dom, '.firstName')
  const lastNameField = TestUtils.findOne(dom, '.lastName')
  const streetField = TestUtils.findOne(dom, '.street')

  return {initialValue, onSubmit, dom, form, firstNameField, lastNameField, streetField}
}

describe('Form', function () {
  it('renders', function () {
    const {dom} = render()

    expect(dom, 'to have rendered',
      <form name="test" autoComplete="off">
        <div>
          <input name="test.firstName" className="firstName"/>
          <div>
            <input name="test.lastName" className="lastName"/>
          </div>
          <input name="test.address.street" className="street"/>
        </div>
      </form>
    )
  })

  it('returns original instance if unchanged', function () {
    const {onSubmit, form} = render()

    expect(onSubmit, 'was not called')
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was called once')
  })

  it('returns new value', function () {
    const {onSubmit, form, firstNameField, lastNameField, streetField} = render()

    TestUtils.Simulate.change(firstNameField, {target: {value: 'foo'}})
    TestUtils.Simulate.change(lastNameField, {target: {value: 'bar'}})
    TestUtils.Simulate.change(streetField, {target: {value: 'apple'}})
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was called once')
    expect(onSubmit, 'to have calls satisfying', function () {
      onSubmit(Immutable.fromJS({
        firstName: 'foo',
        lastName: 'bar',
        address: {
          street: 'apple'
        }
      }))
    })
  })

  it('does not submit if disabled', function () {
    const {onSubmit, form} = render({disabled: true})

    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was not called')
  })

  it('respects validation', function () {
    const validate = (value) => Immutable.fromJS({firstName: !value.get('firstName') ? 'required' : null})
    const {onSubmit, form, firstNameField, lastNameField} = render({validate})

    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was not called')
    TestUtils.Simulate.change(lastNameField, {target: {value: 'bar'}})
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was not called')
    TestUtils.Simulate.change(firstNameField, {target: {value: 'foo'}})
    TestUtils.Simulate.submit(form)
    expect(onSubmit, 'was called once')
  })

  // https://github.com/ePages-de/react-components/issues/8
  it('calls validate while typing', function () {
    const validate = sinon.spy()
    const {onSubmit, firstNameField} = render({validate})

    TestUtils.Simulate.change(firstNameField)
    expect(validate, 'was called')
    expect(onSubmit, 'was not called')
  })

  it('calls validation correctly (with second argument false before first submit and true afterwards)', function () {
    const validate = sinon.spy(() => Immutable.fromJS({firstName: 'required'}))
    const {onSubmit, form, firstNameField} = render({validate})

    TestUtils.Simulate.change(firstNameField, {target: {value: '1'}})
    TestUtils.Simulate.change(firstNameField, {target: {value: '12'}})
    TestUtils.Simulate.submit(form)
    TestUtils.Simulate.change(firstNameField, {target: {value: '123'}})
    TestUtils.Simulate.change(firstNameField, {target: {value: '1234'}})

    expect(onSubmit, 'to have calls satisfying', () => {
      validate(Immutable.fromJS({firstName: '1', lastName: '', address: {street: ''}}), false)
      validate(Immutable.fromJS({firstName: '12', lastName: '', address: {street: ''}}), false)
      validate(Immutable.fromJS({firstName: '12', lastName: '', address: {street: ''}}), true)
      validate(Immutable.fromJS({firstName: '123', lastName: '', address: {street: ''}}), true)
      validate(Immutable.fromJS({firstName: '1234', lastName: '', address: {street: ''}}), true)
    })
  })

  it('sets and gets values', function () {
    const {dom: formComponent} = render()

    expect(formComponent.getValue('firstName'), 'to equal', '')
    formComponent.setValue('firstName', 'a')
    expect(formComponent.getValue('firstName'), 'to equal', 'a')

    expect(formComponent.getValue('address.street'), 'to equal', '')
    formComponent.setValue('address.street', 'c')
    expect(formComponent.getValue('address.street'), 'to equal', 'c')
  })

  it('sets and gets the top-level value', function () {
    const {dom: formComponent} = render()

    expect(formComponent.getValue(), 'to equal', Immutable.fromJS({
      firstName: '',
      lastName: '',
      address: {street: ''}
    }))
    formComponent.setValue(undefined, Immutable.fromJS({
      firstName: 'A',
      lastName: 'B',
      address: {street: 'C'}
    }))
    expect(formComponent.getValue(undefined), 'to equal', Immutable.fromJS({
      firstName: 'A',
      lastName: 'B',
      address: {street: 'C'}
    }))
  })
})

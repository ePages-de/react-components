import Bluebird from 'bluebird'
import Immutable from 'immutable'
import PropTypes from 'prop-types'
import React from 'react'
import TestUtils from 'react-testutils-additions'
import sinon from 'sinon'
import expect from 'unexpected'

import ErrorMessage from '../../src/form/ErrorMessage'
import Form from '../../src/form/Form'
import { PropsSetter } from '../reactHelpers'
import TestField from './TestField'

// to be able to output in dom server errors this component was made
class ServerErrorMessage extends React.Component {
  static contextTypes = {
    formValueScope: PropTypes.object.isRequired
  };

  static defaultProps = {
    Component: 'div'
  };

  static propTypes = {
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    Component: PropTypes.any,
    externalErrors: PropTypes.object
  };

  parseName = (name) => {
    // only split string names by dots, but keep non string names (for example number names
    // like in IteratorField) as they are
    return typeof name === 'string' ? name.split(/\./g) : [name]
  };

  getError = (name) => {
    const {
      updatedExternalErrors,
      props
    } = this.context.formValueScope

    const { externalErrors } = props

    if (externalErrors) {
      const specificError = updatedExternalErrors
        ? updatedExternalErrors.getIn(this.parseName(name))
        : externalErrors.getIn(this.parseName(name))

      return specificError
    }
    return null
  };

  render () {
    const { name, Component, ...other } = this.props
    const extendedErrorMessage = this.getError(name)

    return extendedErrorMessage ? (
      <Component {...other}>{extendedErrorMessage}</Component>
    ) : null
  }
}

function render (props) {
  const initialValue = Immutable.fromJS({
    firstName: '',
    lastName: '',
    address: {
      street: ''
    }
  })
  const onSubmit = sinon.stub()
  const dom = TestUtils.renderIntoDocument(
    <Form name="test" value={initialValue} onSubmit={onSubmit} {...props}>
      {({pristine, submitting}) =>
        <div>
          <TestField name="firstName" className="firstName" />
          <ErrorMessage name="firstName" />
          <ServerErrorMessage name='firstName' />
          <div>
            <TestField name="lastName" className="lastName" />
            <ErrorMessage name="lastName" />
            <ServerErrorMessage name="lastName" />
          </div>
          <TestField name="address.street" className="street" />
          <div>{`pristine ${pristine}`}</div>
          <div>{`submitting ${submitting}`}</div>
        </div>
      }
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
          <input name="test.firstName" className="firstName" />
          <div>
            <input name="test.lastName" className="lastName" />
          </div>
          <input name="test.address.street" className="street" />
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

  it('validates asynchronously', async function () {
    const validate = sinon.spy((value) => Promise.resolve(Immutable.fromJS({firstName: !value.get('firstName') ? 'required' : null})))
    const {onSubmit, form, firstNameField, lastNameField} = render({validate})

    TestUtils.Simulate.submit(form)
    await Bluebird.delay(1)

    expect(onSubmit, 'was not called')
    TestUtils.Simulate.change(lastNameField, {target: {value: 'bar'}})
    expect(validate, 'was called')
    TestUtils.Simulate.change(firstNameField, {target: {value: 'foo'}})
    TestUtils.Simulate.submit(form)
    await Bluebird.delay(1)

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

  it('correctly handles debounced async validation while typing', async function () {
    const responseDelays = [400, 200, 0]
    const validations = []

    const validateWaitMs = 20
    const validate = sinon.spy(value => {
      const validation = Bluebird.delay(responseDelays.shift()).then(() =>
        Immutable.fromJS(!value.get('firstName') ? {firstName: 'first name required'} : null)
      )
      validations.push(validation)
      return validation
    })

    const {dom, firstNameField} = render({validate, validateWaitMs})

    TestUtils.Simulate.change(firstNameField, {target: {value: 'a'}})

    // The validation promise for this resolves last and should be discarded.
    TestUtils.Simulate.change(firstNameField, {target: {value: ''}})
    await Bluebird.delay(validateWaitMs)

    TestUtils.Simulate.change(firstNameField, {target: {value: 'b'}})

    TestUtils.Simulate.change(firstNameField, {target: {value: 'bc'}})
    await Bluebird.delay(validateWaitMs)

    // The validation promise for this resolves first and should be used.
    TestUtils.Simulate.change(firstNameField, {target: {value: 'bcd'}})
    await Bluebird.delay(validateWaitMs)

    expect(validations.length, 'to be', 3)

    await Bluebird.all(validations)
    await Bluebird.delay(1)

    expect(validate, 'was called times', 3)
    expect(validate, 'to have calls satisfying', [
      [{firstName: ''}, false, 'firstName'],
      [{firstName: 'bc'}, false, 'firstName'],
      [{firstName: 'bcd'}, false, 'firstName']
    ])

    // This should fail if the first validation promise was not discarded.
    expect(dom, 'not to contain', <div>first name required</div>)
  })

  it('calls validation correctly (with second argument false before first submit and true afterwards)', function () {
    const validate = sinon.spy(() => Immutable.fromJS({ firstName: 'required' }))
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
    const { dom: formComponent } = render()

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

  it('detects pristine state', function () {
    const {dom: formComponent, firstNameField} = render()

    expect(formComponent, 'to have rendered', <div>pristine true</div>)
    TestUtils.Simulate.change(firstNameField, {target: {value: 'a'}})
    expect(formComponent, 'to have rendered', <div>pristine false</div>)
    TestUtils.Simulate.change(firstNameField, {target: {value: ''}})
    expect(formComponent, 'to have rendered', <div>pristine true</div>)
  })

  it('detects submitting state', function () {
    const {dom: formComponent, form, onSubmit} = render()

    expect(formComponent, 'to have rendered', <div>submitting false</div>)
    TestUtils.Simulate.submit(form)

    expect(formComponent, 'to have rendered', <div>submitting false</div>)

    const submit = Bluebird.delay(10)
    onSubmit.returns(submit)
    expect(formComponent, 'to have rendered', <div>submitting false</div>)
    TestUtils.Simulate.submit(form)

    expect(formComponent, 'to have rendered', <div>submitting true</div>)
    return submit.then(() => {
      expect(formComponent, 'to have rendered', <div>submitting false</div>)
    })
  })

  it('resets', function () {
    const {dom: formComponent, firstNameField} = render()

    TestUtils.Simulate.change(firstNameField, {target: {value: 'a'}})
    expect(firstNameField.value, 'to equal', 'a')
    formComponent.reset()
    expect(firstNameField.value, 'to equal', '')
  })

  it('renders new value if props change', function () {
    const value1 = Immutable.fromJS({name: 'a'})
    const value2 = Immutable.fromJS({name: 'c'})
    const dom = TestUtils.renderIntoDocument(
      <PropsSetter name="test" value={value1} component={Form}>
        <TestField name="name" />
      </PropsSetter>
    )
    const nameField = TestUtils.findOne(dom, 'input')

    expect(nameField.value, 'to equal', 'a')
    TestUtils.Simulate.change(nameField, {target: {value: 'b'}})
    expect(nameField.value, 'to equal', 'b')
    dom.setProps({value: value2})
    expect(nameField.value, 'to equal', 'c')
  })

  it("doesn't setState after it's been unmounted", function () {
    class RenderUntilSubmitted extends React.Component {
      state = {}
      render () {
        return this.state.unmounted ? null : (
          <Form
            name="test"
            value={Immutable.fromJS({})}
            onSubmit={() => this.setState({unmounted: true}) || Promise.resolve()}>
            {() => null}
          </Form>
        )
      }
    }

    // If React spits out a "Can't call setState (or forceUpdate) on an unmounted component.",
    // this will fail with an unhandled promise rejection.
    const dom = TestUtils.renderIntoDocument(<RenderUntilSubmitted />)
    const form = TestUtils.findOne(dom, 'form')
    TestUtils.Simulate.submit(form)
  })

  it('outputs server side error from props', function () {
    const { dom: formComponent, onSubmit } = render({
      externalErrors: Immutable.fromJS({
        firstName: 'first name server error'
      })
    })

    const submit = Bluebird.delay(100)
    onSubmit.returns(submit)

    return submit.then(() => {
      expect(formComponent, 'to contain', <div>first name server error</div>)
    })
  })

  it('removes server side error when field is changed its content', async function () {
    const { dom: formComponent, onSubmit, firstNameField } = render({
      externalErrors: Immutable.fromJS({
        firstName: 'first name server error',
        lastName: 'last name server error'
      })
    })

    const submit = () => Bluebird.delay(500)
    onSubmit.returns(submit)

    await submit()
    expect(formComponent, 'to contain', <div>first name server error</div>)
    expect(formComponent, 'to contain', <div>last name server error</div>)

    TestUtils.Simulate.change(firstNameField, { target: { value: 'a' } })

    await submit()
    expect(formComponent, 'not to contain', <div>first name server error</div>)
    expect(formComponent, 'to contain', <div>last name server error</div>)
  })

  it('outputs server side error with client side', async function () {
    const validate = (value) =>
      Immutable.fromJS({
        firstName: !value.get('firstName') ? 'required' : null
      })

    const { dom: formComponent, onSubmit, firstNameField } = render({
      validate,
      externalErrors: Immutable.fromJS({
        lastName: 'last name server error'
      })
    })

    const submit = () => Bluebird.delay(100)
    onSubmit.returns(submit)

    TestUtils.Simulate.change(firstNameField, { target: { value: 'a' } })

    await submit()
    expect(formComponent, 'not to contain', <div>required</div>)
    expect(formComponent, 'to contain', <div>last name server error</div>)

    TestUtils.Simulate.change(firstNameField, { target: { value: '' } })

    await submit()
    expect(formComponent, 'to contain', <div>required</div>)
    expect(formComponent, 'to contain', <div>last name server error</div>)
  })

  it('runs handleUnmappedErrors in case no correspoding field was found', async function () {
    const handleUnmappedErrors = sinon.stub()

    const otherPros = {
      handleUnmappedErrors,
      externalErrors: Immutable.fromJS({
        firstName: 'first name server error',
        unknownFiled: 'sampletext'
      })
    }

    const value1 = Immutable.fromJS({ firstName: 'firstname' })
    const value2 = Immutable.fromJS({ firstName: 'firstname' })

    const dom = TestUtils.renderIntoDocument(
      <PropsSetter name='test' value={value1} component={Form} {...otherPros}>
        <TestField name='firstName' className='firstName' />
        <ServerErrorMessage name='firstName' />
      </PropsSetter>
    )

    // just to toggle component will receive new props
    dom.setProps({ value: value2 })

    await Bluebird.delay(10)

    expect(dom, 'to contain', <div>first name server error</div>)
    expect(handleUnmappedErrors, 'was called once')
  })
})

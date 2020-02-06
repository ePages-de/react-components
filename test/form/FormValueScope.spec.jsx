import { fireEvent, render } from '@testing-library/react'
import Immutable from 'immutable'
import React from 'react'
import sinon from 'sinon'

import ErrorMessage from '../../src/form/ErrorMessage'
import Form from '../../src/form/Form'
import FormValueScope from '../../src/form/FormValueScope'
import TestField from './TestField'

function renderWithContext ({ validate } = {}) {
  const initialValue = Immutable.fromJS({
    sub: {
      name: 'first'
    }
  })
  const onSubmit = sinon.spy()
  const helpers = render(
    <Form name="test" value={initialValue} onSubmit={onSubmit} validate={validate}>
      <div>
        <FormValueScope name="sub">
          <div>
            <TestField name="name" className="name" />
            <ErrorMessage name="name" className="name-error" />
          </div>
        </FormValueScope>
      </div>
    </Form>
  )

  const form = helpers.container.querySelector('form')
  const nameField = helpers.container.querySelector('input')

  return { initialValue, onSubmit, form, nameField, ...helpers }
}

describe('FormValueScope', function () {
  it('renders', function () {
    const { form, nameField } = renderWithContext()

    expect(form).toBeTruthy()
    expect(nameField.value).toBe('first')
    expect(nameField.name).toBe('test.sub.name')
  })

  it('passes through validation', async function () {
    const validate = (value) => {
      return Immutable.fromJS({
        sub: {
          name: !value.getIn(['sub', 'name']) ? 'required' : null
        }
      })
    }
    const { form, nameField, queryByText } = renderWithContext({ validate })

    fireEvent.change(nameField, { target: { value: 'x' } })
    fireEvent.submit(form)

    expect(nameField.value).toBe('x')
    expect(queryByText('required')).toBeFalsy()

    fireEvent.change(nameField, { target: { value: '' } })
    fireEvent.submit(form)

    expect(nameField.value).toBe('')
    expect(queryByText('required')).toBeTruthy()
  })
})

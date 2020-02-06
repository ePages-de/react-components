import { fireEvent, render } from '@testing-library/react'
import Immutable from 'immutable'
import React from 'react'

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
  const onSubmit = jest.fn()
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
    const { form, nameField, queryByText, onSubmit } = renderWithContext({ validate })

    fireEvent.change(nameField, { target: { value: 'testing' } })
    fireEvent.submit(form)

    expect(nameField.value).toBe('testing')
    expect(queryByText('required')).toBeFalsy()
    expect(onSubmit).toHaveBeenCalledWith(Immutable.fromJS({
      sub: { name: 'testing' }
    }))

    jest.clearAllMocks()

    fireEvent.change(nameField, { target: { value: '' } })
    fireEvent.submit(form)

    expect(nameField.value).toBe('')
    expect(queryByText('required')).toBeTruthy()
    expect(onSubmit).not.toHaveBeenCalled()
  })
})

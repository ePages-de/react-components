import React from 'react'
import { render } from 'react-testing-library'

import withClassName from '../src/withClassName'

const TestComponent = React.forwardRef((_props, ref) => (
  <input data-testid="test" ref={ref} />
))

it('renders and passes ref', function() {
  const className = 'foobar'
  const TestComponentWithClassName = withClassName(className)(TestComponent)
  const ref = React.createRef()
  const { getByTestId } = render(<TestComponentWithClassName ref={ref} />)

  const input = getByTestId('test')

  expect(input).toBeInTheDocument()
  expect(ref.current).toBe(input)
})

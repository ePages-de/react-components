import React from 'react'
import TestUtils from 'react-testutils-additions'
import sinon from 'sinon'
import expect from 'unexpected'

import { ChoiceFieldRaw } from '../../src/form/ChoiceField'

function render({ value } = {}) {
  const choices = [{ value: true, label: 'Yes' }, { value: false, label: 'No' }]
  const onChange = sinon.spy()
  const dom = TestUtils.renderIntoDocument(
    <ChoiceFieldRaw value={value} onChange={onChange} choices={choices} />
  )
  const choiceDivs = TestUtils.find(dom, 'div').slice(1)

  return { onChange, dom, choiceDivs }
}
describe('components', () =>
  describe('form', () =>
    describe('ChoiceField', () => {
      it('renders', () => {
        const { dom } = render({ value: true })
        expect(
          dom,
          'to have rendered',
          <div>
            <div>Yes</div>
            <div>No</div>
          </div>
        )
      })

      it('returns new value', () => {
        const { onChange, choiceDivs } = render({ value: false })

        expect(onChange, 'was not called')
        TestUtils.Simulate.click(choiceDivs[0])
        expect(onChange, 'to have calls satisfying', () => onChange(true))
      })
    })))

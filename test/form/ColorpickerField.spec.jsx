import React from 'react'
import TestUtils from 'react-testutils-additions'
import sinon from 'sinon'

import { ColorpickerFieldRaw } from '../../src/form/ColorpickerField'
import expect from '../unexpected'

const DEFAULT_COLOR_HSL_STRING = 'hsl(125, 93%, 49%)'

function render ({ color = DEFAULT_COLOR_HSL_STRING, onChange = () => null }) {
  const dom = TestUtils.renderIntoDocument(
    <ColorpickerFieldRaw
      className="test-colorpicker"
      value={color}
      onChange={onChange}
    />
  )

  const svCanvas = TestUtils.findOne(dom, '.test-colorpicker-value')
  const hueSlider = TestUtils.findOne(dom, '.test-colorpicker-hue')
  const hexInput = TestUtils.findOne(dom, '.test-colorpicker-hex-input')

  return { dom, svCanvas, hueSlider, hexInput }
}

describe('Colorpicker', function () {
  it('renders provided marker positions correctly and sets hex input', function () {
    const { dom } = render({})
    const defaultColorHex = '#09F11C'
    const defaultBaseColorHex = '#00FF15'

    expect(
      dom, 'to have rendered',
      <div>
        {/* saturation-value canvas */}
        <div>
          {/* saturation */}
          <div style={{ background: `linear-gradient(to right, transparent 0%, ${defaultBaseColorHex} 100%)` }} />
          {/* value */}
          <div style={{ background: 'linear-gradient(to bottom, transparent 0%, #000 100%)' }} />
          {/* marker */}
          <div style={{ left: 265, top: 16 }} />
        </div>
        {/* hue slider */}
        <div>
          {/* marker */}
          <div style={{ top: 104 }} />
        </div>
        <input value={defaultColorHex} />
      </div>
    )
  })

  it('triggers change when hex input receives valid color', function () {
    const onChange = sinon.spy().named('onChange')
    const { dom, hexInput } = render({ onChange })
    const pinkColor = 'deeppink'
    const pinkHslColor = 'hsl(328, 100%, 54%)'

    TestUtils.Simulate.change(hexInput, { target: { value: 'not a color' } })
    expect(onChange, 'was not called')

    TestUtils.Simulate.change(hexInput, { target: { value: pinkColor } })
    expect(dom, 'to have rendered',
      <div>
        <div />
        <div />
        <input value={pinkColor} />
      </div>
    )
    expect(onChange, 'to have a call satisfying', [pinkHslColor])
  })

  it('Moves marker, sets color and changes hex input on canvas clicks', function () {
    const onChange = sinon.spy().named('onChange')
    const { hueSlider, svCanvas } = render({ onChange })
    const [h, s, v] = ['125', '93%', '49%']

    TestUtils.Simulate.mouseDown(svCanvas, { clientX: 55, clientY: 75 })
    TestUtils.Simulate.mouseDown(hueSlider, { clientX: 0, clientY: 122 })

    expect(onChange, 'was called twice')
    expect(onChange, 'to have calls satisfying', [
      [`hsl(${h}, 23.1%, 67.5%)`],
      [`hsl(146, ${s}, ${v})`]
    ])
  })

  it('does ignore invalid colors', function () {
    const onChange = sinon.spy().named('onChange')
    const { hueSlider, svCanvas } = render({ onChange })

    TestUtils.Simulate.mouseDown(svCanvas, { clientX: '55px', clientY: 75 })
    TestUtils.Simulate.mouseDown(hueSlider, { clientX: '0px', clientY: '122px' })

    expect(onChange, 'was not called')
  })
})

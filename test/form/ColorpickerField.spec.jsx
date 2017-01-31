import {ColorpickerFieldRaw} from '../../src/form/ColorpickerField'
import expect from 'unexpected'
import React from 'react'
import sinon from 'sinon'
import TestUtils from 'react-testutils-additions'

const DEFAULT_COLOR_HSV = {h: 43, s: 0.70, v: 1}

function render ({color = DEFAULT_COLOR_HSV, onChange = () => null}) {
  const dom = TestUtils.renderIntoDocument(
    <ColorpickerFieldRaw
      className="test-colorpicker"
      value={color}
      onChange={onChange}/>
  )

  const svCanvas = TestUtils.findOne(dom, '.test-colorpicker-value')
  const hueSlider = TestUtils.findOne(dom, '.test-colorpicker-hue')
  const hexInput = TestUtils.findOne(dom, '.test-colorpicker-hex-input')

  return {dom, svCanvas, hueSlider, hexInput}
}

describe('Colorpicker', function () {
  it('renders provided marker positions correctly and sets hex input', function () {
    const {dom} = render({})
    const colorHexString = '#ffcc4d'
    const baseColorHexString = '#ffb700'

    expect(
      dom, 'to have rendered',
      <div>
        {/* saturation-value canvas */}
        <div>
          {/* saturation */}
          <div style={{background: `linear-gradient(to right, transparent 0%, ${baseColorHexString} 100%)`}}/>
          {/* value */}
          <div style={{background: 'linear-gradient(to bottom, transparent 0%, #000 100%)'}}/>
          {/* marker */}
          <div style={{left: 193, top: 0}}/>
        </div>
        {/* hue slider */}
        <div>
          {/* marker */}
          <div style={{top: 36}}/>
        </div>
        <input value={colorHexString}/>
      </div>
    )
  })

  it('triggers change when hex input receives valid color', function () {
    const onChange = sinon.spy().named('onChange')
    const {dom, hexInput} = render({onChange})
    const blueishHexColor = '0099ff'
    const blueishHsvColor = {h: 204, s: 1, v: 1}

    TestUtils.Simulate.change(hexInput, {target: {value: 'not a color'}})
    expect(onChange, 'was not called')

    TestUtils.Simulate.change(hexInput, {target: {value: blueishHexColor}})
    expect(dom, 'to have rendered',
      <div>
        <div/>
        <div/>
        <input value={blueishHexColor}/>
      </div>
    )
    expect(onChange, 'was called with', blueishHsvColor)
  })

  it('Moves marker, sets color and changes hex input on canvas clicks', function () {
    const onChange = sinon.spy().named('onChange')
    const {hueSlider, svCanvas} = render({onChange})
    const {h, s, v} = DEFAULT_COLOR_HSV

    TestUtils.Simulate.mouseDown(svCanvas, {clientX: 55, clientY: 75})
    TestUtils.Simulate.mouseDown(hueSlider, {clientX: 0, clientY: 150})

    expect(onChange, 'was called twice')
    expect(onChange, 'to have calls satisfying', [
        [{h: h, s: 0.2, v: 0.75}],
        [{h: 180, s, v}]
    ])
  })
})

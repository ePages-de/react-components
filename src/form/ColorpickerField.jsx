import color from 'color'
import PropTypes from 'prop-types'
import React, { Component, PureComponent } from 'react'

import formField from './formField'

/**
 * check if a string is a valid color value
 *
 * @param {string} value color value string
 * @returns {boolean} whether the string is a valid color or not
 */
function isValidColor (value) {
  try {
    // `color` throws an error when the value is not a valid color
    color(value)
    return true
  } catch (e) {
    return false
  }
}

class Coordinator extends PureComponent {
  static propTypes = {
    coords: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    style: PropTypes.object,
    className: PropTypes.string
  }

  componentWillUnmount () {
    this.unbindEventListeners()
  }

  handleCoordChange = ({ clientX, clientY }) => {
    const { onChange, width, height } = this.props
    const { top, left } = this.node.getBoundingClientRect()

    // cap [0, 1]
    const rx = Math.max(0, Math.min((clientX - left) / width, 1))
    const ry = Math.max(0, Math.min((clientY - top) / height, 1))

    // `x` and `y` values relative to the node's `width` and `height` {[0,1] [0,1]}
    onChange([rx, ry])
  }

  handleMouseDown = (e) => {
    this.handleCoordChange(e)

    window.addEventListener('mousemove', this.handleCoordChange)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = () => {
    this.unbindEventListeners()
  }

  unbindEventListeners () {
    window.removeEventListener('mousemove', this.handleCoordChange)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  render () {
    const { coords, children, width, height, style, className } = this.props
    const [rx, ry] = coords

    const x = rx * width
    const y = ry * height

    return (
      <div
        className={className}
        style={{ ...(style || {}), width, height }}
        ref={node => { this.node = node }}
        onMouseDown={this.handleMouseDown}
        onTouchMove={this.handleCoordChange}
        onTouchStart={this.handleCoordChange}
      >
        {children({ x, y, rx, ry, width, height })}
      </div>
    )
  }
}

export class ColorpickerFieldRaw extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        base: PropTypes.string.isRequired,
        baseSaturationValue: PropTypes.string.isRequired,
        baseHue: PropTypes.string.isRequired,
        saturation: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        marker: PropTypes.string.isRequired,
        baseHexInput: PropTypes.string.isRequired
      })
    ]).isRequired,
    dimensions: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
      hueWidth: PropTypes.number,
      spacing: PropTypes.number
    })
  }

  static defaultProps = {
    dimensions: {
      width: 300,
      height: 300,
      hueWidth: 20,
      spacing: 5
    }
  }

  state = {
    intermediateHexInput: null
  }

  get color () {
    return color(this.props.value).hsv()
  }

  changeColor = (color) => {
    if (isValidColor(color.string())) {
      this.setState({ intermediateHexInput: color.hex() })

      const preciseColor = color
        .hue(Math.round(color.hue()))
        .hsl()
        .string()

      this.props.onChange(preciseColor)
    }
  }

  handleSvChange = ([x, y]) => {
    this.changeColor(this.color
      .saturationv(x * 100)
      .value(100 - y * 100)
    )
  }

  handleHueChange = ([_x, y]) => {
    this.changeColor(this.color.hue(y * 360))
  }

  render () {
    const { className, dimensions: { width, height, hueWidth, spacing } } = this.props
    const { intermediateHexInput } = this.state

    const { h, s, v } = this.color.object()

    const styles = typeof className === 'string' ? {
      base: className,
      baseSaturationValue: `${className}-saturation-value-canvas`,
      baseHue: `${className}-hue`,
      baseHexInput: `${className}-hex-input`,
      saturation: `${className}-saturation`,
      value: `${className}-value`,
      marker: 'marker'
    } : this.props.className

    const hueColor = this.color.saturationv(100).value(100).hex()
    const gradient = (direction, color) => `linear-gradient(${direction}, transparent 0%, ${color} 100%)`

    const hexColorString = this.hexInputValueChange ? intermediateHexInput : this.color.hex()

    return (
      <div
        className={styles.base}
      >
        <Coordinator
          onChange={this.handleSvChange}
          className={styles.baseSaturationValue}
          width={width - (hueWidth + spacing)}
          height={height}
          coords={[s / 100, v / 100]}
        >
          {({ x, y, height }) => ([
            <div
              key="s"
              className={styles.saturation}
              style={{ background: gradient('to right', hueColor) }}
            />,
            <div
              key="v"
              className={styles.value}
              style={{ background: gradient('to bottom', '#000') }}
            />,
            <div
              key="marker"
              className={styles.marker}
              style={{ left: Math.round(x), top: Math.round(height - y) }}
            />
          ])}
        </Coordinator>
        <Coordinator
          onChange={this.handleHueChange}
          className={styles.baseHue}
          coords={[0, h / 360]}
          width={hueWidth}
          height={height}
          style={{
            background: `linear-gradient(to bottom,
              #ff0000 0%,
              #ffff00 20%,
              #00ff00 35%,
              #00ffff 50%,
              #0000ff 65%,
              #ff00ff 80%,
              #ff0000 100%)`
          }}
        >
          {({ y }) => (
            <div className={styles.marker} style={{ top: Math.round(y) }} />
          )}
        </Coordinator>
        <input
          className={styles.baseHexInput}
          type="text"
          value={hexColorString}
          onChange={e => {
            const { value } = e.target

            this.hexInputValueChange = true

            this.setState({ intermediateHexInput: value }, () => {
              this.hexInputValueChange = false
            })

            if (isValidColor(value)) {
              this.props.onChange(color(value).hsl().round().string())
            }
          }}
        />
      </div>
    )
  }
}

export default formField()(ColorpickerFieldRaw)

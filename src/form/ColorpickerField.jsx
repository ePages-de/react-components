import formField from './formField'
import tinycolor from 'tinycolor2'
import React, {PureComponent, Component, PropTypes} from 'react'

class Coordinator extends PureComponent {
  static propTypes = {
    coords: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
    style: PropTypes.object
  }

  componentWillUnmount () {
    this.unbindEventListeners()
  }

  handleCoordChange = ({clientX, clientY}) => {
    const {onChange, width, height} = this.props
    const {top, left} = this.node.getBoundingClientRect()

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
    const {coords, children, width, height, style, ...other} = this.props
    const [rx, ry] = coords

    const x = rx * width
    const y = ry * height

    return (
      <div
        {...other}
        style={{...(style || {}), width, height}}
        ref={node => { this.node = node }}
        onMouseDown={this.handleMouseDown}
        onTouchMove={this.handleCoordChange}
        onTouchStart={this.handleCoordChange}
        children={children({x, y, rx, ry, width, height})}
      />
    )
  }
}

export class ColorpickerFieldRaw extends Component {
  static propTypes = {
    value: PropTypes.shape({
      h: PropTypes.number,
      s: PropTypes.number,
      v: PropTypes.number
    }),
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
    }),
    name: PropTypes.string,
    scopedName: PropTypes.string
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

  changeColor = (color) => {
    this.setState({intermediateHexInput: tinycolor(color).toHexString()})
    this.props.onChange(color)
  }

  handleSvChange = ([s, darkness]) => {
    const {h} = this.props.value
    // for anyone wondering:
    // `v` stands for `value` and is actually the same as `brightness`
    const v = 1 - darkness

    this.changeColor({h, s, v})
  }

  // eslint-disable-next-line no-unused-vars
  handleHueChange = ([_, hue]) => {
    const {s, v} = this.props.value
    const h = hue * 360

    this.changeColor({h, s, v})
  }

  render () {
    const {className, dimensions: {width, height, hueWidth, spacing}} = this.props
    const {intermediateHexInput} = this.state
    const {h, s, v} = this.props.value

    const styles = typeof className === 'string' ? {
      base: className,
      baseSaturationValue: `${className}-saturation-value-canvas`,
      baseHue: `${className}-hue`,
      baseHexInput: `${className}-hex-input`,
      saturation: `${className}-saturation`,
      value: `${className}-value`,
      marker: 'marker'
    } : this.props.className

    const hueColor = tinycolor({h, s: 1, v: 1}).toHexString()
    const gradient = (direction, color) => `linear-gradient(${direction}, transparent 0%, ${color} 100%)`

    const hexColorString = intermediateHexInput === null
      ? tinycolor(this.props.value).toHexString()
      : intermediateHexInput

    return (
      <div
        className={styles.base}
        style={{width, height}}>
        <Coordinator
          onChange={this.handleSvChange}
          className={styles.baseSaturationValue}
          width={width - (hueWidth + spacing)}
          height={height}
          coords={[s, v]}>
          {({x, y, height}) => ([
            <div
              key="s"
              className={styles.saturation}
              style={{background: gradient('to right', hueColor)}}/>,
            <div
              key="v"
              className={styles.value}
              style={{background: gradient('to bottom', '#000')}}/>,
            <div
              key="marker"
              className={styles.marker}
              style={{left: Math.round(x), top: Math.round(height - y)}}/>
          ])}
        </Coordinator>
        <Coordinator
          onChange={this.handleHueChange}
          className={styles.baseHue}
          coords={[0, h / 360]}
          width={hueWidth}
          height={height}
          style={{background: `linear-gradient(to bottom,
              #ff0000 0%,
              #ffff00 20%,
              #00ff00 35%,
              #00ffff 50%,
              #0000ff 65%,
              #ff00ff 80%,
              #ff0000 100%)`
          }}>
          {({y}) => (
            <div className={styles.marker} style={{top: Math.round(y)}}/>
          )}
        </Coordinator>
        <input
          className={styles.baseHexInput}
          type="text"
          value={hexColorString}
          onChange={e => {
            const {value} = e.target
            const currentColor = tinycolor(value)

            this.setState({intermediateHexInput: value})
            currentColor.isValid() && this.props.onChange(currentColor.toHsv())
          }}/>
      </div>
    )
  }
}

export default formField()(ColorpickerFieldRaw)

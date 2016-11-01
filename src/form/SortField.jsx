import formField from './formField'
import React, {PropTypes} from 'react'

function swap (items, oldIndex, newIndex) {
  return items
    .set(oldIndex, items.get(newIndex))
    .set(newIndex, items.get(oldIndex))
}

export class SortFieldRaw extends React.Component {
  static propTypes = {
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    fullName: PropTypes.string,
    children: PropTypes.func.isRequired,
    onReorder: PropTypes.func,
    validate: PropTypes.func,
    disabled: PropTypes.func,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']).isRequired,
    itemSize: PropTypes.number.isRequired,
    crossAxisItemSize: PropTypes.number.isRequired,
    itemSpacing: PropTypes.number,
    itemCount: PropTypes.number.isRequired
  }

  static defaultProps = {
    onReorder: () => null,
    validate: () => true,
    disabled: () => false,
    itemSpacing: 0
  }

  state = {
    dragIndex: null,
    dropIndex: null
  }

  render () {
    const self = this
    const {value, onChange, name, fullName, children, onReorder, validate, disabled, orientation, itemSize, crossAxisItemSize, itemCount, itemSpacing, ...other} = this.props // eslint-disable-line no-unused-vars
    const dimension = orientation === 'horizontal'
      ? {width: itemSize * itemCount + (itemSpacing * (itemCount - 1)), height: crossAxisItemSize}
      : {height: itemSize * itemCount + (itemSpacing * (itemCount - 1)), width: crossAxisItemSize}

    return (
      <div {...other} style={{position: 'relative', ...dimension}}>
        {value.map((item, index) => {
          const itemWithDndInfo = item
            .set('__isSource', this.state.dragIndex === index)
            .set('__isTarget', this.state.dropIndex === index)
            .set('__isDragging', this.state.dragIndex !== null)
            .set('__isDisabled', disabled(item, index, value))
          const itemPosition = orientation === 'horizontal'
            ? {left: index * (itemSize + itemSpacing), top: 0}
            : {top: index * (itemSize + itemSpacing), left: 0}
          const itemDimension = orientation === 'horizontal'
            ? {width: itemSize, height: crossAxisItemSize}
            : {height: itemSize, width: crossAxisItemSize}

          return (
            <div
              key={index}
              draggable
              style={{position: 'absolute', ...itemPosition, ...itemDimension}}
              onDragStart={function (event) {
                if (!itemWithDndInfo.get('__isDisabled')) {
                  if (event.dataTransfer) event.dataTransfer.setData('Url', '#')
                  self.setState({dragIndex: index})
                } else {
                  event.preventDefault()
                }
              }}
              onDragEnd={function () {
                self.setState({dragIndex: null})
              }}
              onDragEnter={function () {
                if (self.state.dragIndex !== null && self.state.dragIndex !== index && validate(swap(value, self.state.dragIndex, index))) {
                  self.setState({dropIndex: index})
                }
              }}
              onDragOver={function (event) {
                if (!itemWithDndInfo.get('__isDisabled') && self.state.dragIndex !== null && self.state.dragIndex !== index && validate(swap(value, self.state.dragIndex, index))) {
                  event.preventDefault()
                }
              }}
              onDragLeave={function () {
                if (self.state.dropIndex === index) {
                  self.setState({dropIndex: null})
                }
              }}
              onDrop={function (event) {
                event.preventDefault()
                self.setState({dragIndex: null, dropIndex: null})
                self.props.onReorder(self.state.dragIndex, index)
                onChange(swap(value, self.state.dragIndex, index))
              }}>
              {this.props.children(itemWithDndInfo, index, value)}
            </div>
          )
        })}
      </div>
    )
  }
}

export default formField()(SortFieldRaw)

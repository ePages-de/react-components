import formField from './formField'
import PropTypes from 'prop-types'
import React from 'react'

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
    scopedName: PropTypes.string,
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
    const {value, onChange, name, scopedName, children, onReorder, validate, disabled, orientation, itemSize, crossAxisItemSize, itemCount, itemSpacing, ...other} = this.props // eslint-disable-line no-unused-vars
    const {dragIndex, dropIndex} = this.state
    const dimension = orientation === 'horizontal'
      ? {width: itemSize * itemCount + (itemSpacing * (itemCount - 1)), height: crossAxisItemSize}
      : {height: itemSize * itemCount + (itemSpacing * (itemCount - 1)), width: crossAxisItemSize}

    return (
      <div {...other} style={{position: 'relative', ...dimension}}>
        {value.map((item, index) => {
          const itemWithDndInfo = item
            .set('__isSource', dragIndex === index)
            .set('__isTarget', dropIndex === index)
            .set('__isDragging', dragIndex !== null)
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
              onDragStart={(event) => {
                if (!itemWithDndInfo.get('__isDisabled')) {
                  if (event.dataTransfer) event.dataTransfer.setData('Url', '#')
                  this.setState({dragIndex: index})
                } else {
                  event.preventDefault()
                }
              }}
              onDragEnd={() => {
                this.setState({dragIndex: null})
              }}
              onDragEnter={() => {
                if (dragIndex !== null && dragIndex !== index && validate(swap(value, dragIndex, index))) {
                  this.setState({dropIndex: index})
                }
              }}
              onDragOver={(event) => {
                if (!itemWithDndInfo.get('__isDisabled') && dragIndex !== null && dragIndex !== index && validate(swap(value, dragIndex, index))) {
                  event.preventDefault()
                }
              }}
              onDragLeave={() => {
                if (dropIndex === index) {
                  this.setState({dropIndex: null})
                }
              }}
              onDrop={(event) => {
                event.preventDefault()
                this.setState({dragIndex: null, dropIndex: null})
                this.props.onReorder(dragIndex, index)
                onChange(swap(value, dragIndex, index))
              }}>
              {children(itemWithDndInfo, index, value)}
            </div>
          )
        })}
      </div>
    )
  }
}

export default formField()(SortFieldRaw)

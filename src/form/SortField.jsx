import BaseField from './BaseField'
import React, {PropTypes} from 'react'

function swap (items, oldIndex, newIndex) {
  return items
    .set(oldIndex, items.get(newIndex))
    .set(newIndex, items.get(oldIndex))
}

export default class SortField extends React.Component {
  static contextTypes = {
    ...BaseField.contextTypes
  }

  static propTypes = {
    ...BaseField.propTypes,
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
    ...BaseField.defaultProps,
    onReorder: () => null,
    validate: () => true,
    disabled: () => false,
    itemSpacing: 0
  }

  state = {
    dragIndex: null,
    dropIndex: null
  }

  get value () {
    return this.context.formValueScope.getValue(this.props.name)
  }

  set value (val) {
    this.context.formValueScope.setValue(this.props.name, val)
  }

  render () {
    const self = this
    const {name, children, onReorder, validate, disabled, orientation, itemSize, crossAxisItemSize, itemCount, itemSpacing, ...other} = this.props // eslint-disable-line no-unused-vars
    const dimension = orientation === 'horizontal'
      ? {width: itemSize * itemCount + (itemSpacing * (itemCount - 1)), height: crossAxisItemSize}
      : {height: itemSize * itemCount + (itemSpacing * (itemCount - 1)), width: crossAxisItemSize}

    return (
      <div {...other} style={{position: 'relative', ...dimension}}>
        {this.value.map((item, index) => {
          const itemWithDndInfo = item
            .set('__isSource', this.state.dragIndex === index)
            .set('__isTarget', this.state.dropIndex === index)
            .set('__isDragging', this.state.dragIndex !== null)
            .set('__isDisabled', disabled(item, index, this.value))
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
                if (self.state.dragIndex !== null && self.state.dragIndex !== index && validate(swap(self.value, self.state.dragIndex, index))) {
                  self.setState({dropIndex: index})
                }
              }}
              onDragOver={function (event) {
                if (!itemWithDndInfo.get('__isDisabled') && self.state.dragIndex !== null && self.state.dragIndex !== index && validate(swap(self.value, self.state.dragIndex, index))) {
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
                self.value = swap(self.value, self.state.dragIndex, index)
                self.props.onReorder(self.state.dragIndex, index)
              }}>
              {this.props.children(itemWithDndInfo, index, this.value)}
            </div>
          )
        })}
      </div>
    )
  }
}

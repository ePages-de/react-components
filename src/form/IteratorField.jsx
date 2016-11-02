import formField from './formField'
import FormValueScope from './FormValueScope'
import React, {PropTypes} from 'react'

class IteratorFieldRaw extends React.Component {
  static propTypes = {
    // TODO: ImmutablePropTypes.list
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    scopedName: PropTypes.string,
    skip: PropTypes.number,
    take: PropTypes.number,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired
  }

  static defaultProps = {
    skip: 0
  }

  render () {
    const {value, onChange, name, scopedName, skip, take, children, ...other} = this.props // eslint-disable-line no-unused-vars
    const items = value.skip(skip).take(take || value.count())

    return (
      <FormValueScope name={name}>
        <div {...other}>
          {items.map((item, index) =>
            <FormValueScope key={index + skip} name={index + skip}>
              {typeof children === 'function' ? children(item, index + skip) : children}
            </FormValueScope>
          )}
        </div>
      </FormValueScope>
    )
  }
}

export default formField()(IteratorFieldRaw)

import classnames from 'classnames'
import formField from './formField'
import React, {PropTypes} from 'react'

function stopPropagation (event) {
  event.stopPropagation()
}

/**
 * Renders a smart input that allows to choose zero or more values (for example a tag list).
 * Values can be deduced from the entered text. Additionally this input allows autocompletion by
 * a user defined suggestion function.
 */
export class SmartInputFieldRaw extends React.Component {
  static propTypes = {
    // current value
    value: PropTypes.any.isRequired,
    // value change handler
    onChange: PropTypes.func.isRequired,
    // function to generate suggestion list (must return a promise)
    getSuggestions: PropTypes.func,
    // decision function, whether a given suggestion can be choosen
    suggestionDisabled: PropTypes.func,
    // if non-strict, this function deduces the actual value to add from the entered text
    convertTextToValue: PropTypes.func,
    // this function converts the suggestion to the actual value to add
    convertSuggestionToValue: PropTypes.func,
    // whether one can enter anything or just stuff from the suggestion list
    strict: PropTypes.bool,
    // autoFocus of the underlying HTML input
    autoFocus: PropTypes.bool,
    // how to render a value
    renderValue: PropTypes.func,
    // how to render a suggestion
    renderSuggestion: PropTypes.func,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        base: PropTypes.string.isRequired,
        baseFocused: PropTypes.string.isRequired,
        baseWithSuggestions: PropTypes.string.isRequired,
        input: PropTypes.string.isRequired,
        inputValue: PropTypes.string.isRequired,
        inputText: PropTypes.string.isRequired,
        suggestions: PropTypes.string.isRequired,
        suggestion: PropTypes.string.isRequired,
        suggestionActive: PropTypes.string.isRequired,
        suggestionDisabled: PropTypes.string.isRequired
      })
    ]).isRequired
  }

  static defaultProps = {
    suggestionDisabled: (suggestion, index) => false,
    convertTextToValue: (text) => text,
    convertSuggestionToValue: (suggestion) => suggestion,
    renderValue: (value, handleRemove) => (
      <div>
        <div onClick={handleRemove}>X</div>
        {value.toString()}
      </div>
    ),
    renderSuggestion: (suggestion) => suggestion.toString(),
    strict: false,
    autoFocus: false
  }

  state = {
    text: '',
    focused: false,
    loading: false,
    suggestions: null,
    activeSuggestionIndex: null
  }

  focus = () => {
    if (this.input) {
      this.input.focus()
    }
  }

  render () {
    const {value, suggestionDisabled, autoFocus, renderValue, renderSuggestion, className} = this.props
    const {text, focused, suggestions, activeSuggestionIndex} = this.state
    const suggestionsVisible = suggestions && suggestions.length > 0

    const styles = typeof className === 'string'
      ? {
        base: className,
        baseFocused: className + '-focused',
        baseWithSuggestions: className + '-with-suggestions',
        input: className + '-input',
        inputValue: className + '-input-value',
        inputText: className + '-input-tet',
        suggestions: className + '-suggestions',
        suggestion: className + '-suggestion',
        suggestionActive: className + '-suggestion-active',
        suggestionDisabled: className + '-suggestion-disabled'
      }
      : this.props.className

    return (
      <div className={classnames(styles.base, {[styles.baseFocused]: focused, [styles.baseWithSuggestions]: suggestionsVisible})} onMouseDown={this.handleMouseDownContainer}>
        <div className={styles.input}>
          {value.map((value, index) =>
            <div key={index} onMouseDown={stopPropagation} className={styles.inputValue}>
              {renderValue(value, this.handleClickValueRemove(index))}
            </div>
          )}
          <input
            type="text"
            value={text}
            autoFocus={autoFocus}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onMouseDown={stopPropagation}
            autoComplete={false}
            autoCorrect={false}
            autoCapitalize={false}
            spellCheck={false}
            className={styles.inputText}
            ref={(node) => { this.input = node }}/>
        </div>
        {suggestionsVisible && (
          <div className={styles.suggestions} ref="suggestions">
            {suggestions.map((suggestion, index) =>
              <div
                key={index}
                onClick={this.handleClickSuggestion(suggestion, index)}
                className={classnames(styles.suggestion, {[styles.suggestionActive]: activeSuggestionIndex === index, [styles.suggestionDisabled]: suggestionDisabled(suggestion, index)})}
                ref={`suggestion-${index}`}>
                {renderSuggestion(suggestion)}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  handleChange = (event) => {
    const text = event.target.value

    // update current entered text in state and update suggestion list
    this.setState({text})
    this.getSuggestions(text, this.props.value)
  }

  handleKeyDown = (event) => {
    const {value, onChange, convertTextToValue, convertSuggestionToValue, strict} = this.props
    const {text, suggestions, activeSuggestionIndex} = this.state

    switch (event.keyCode) {
      // enter
      case 13: {
        // a suggestion must be selected or some text must have been entered
        if (typeof activeSuggestionIndex === 'number' || event.target.value) {
          event.preventDefault()

          const nextValue = typeof activeSuggestionIndex === 'number'
            // use value from suggestion
            ? convertSuggestionToValue(suggestions[activeSuggestionIndex])
            // use value from entered text (if non-strict)
            : (!strict ? convertTextToValue(event.target.value.trim()) : null)

          if (nextValue) {
            // update value and reset entered text and suggestion list
            const newValue = value.concat([nextValue])
            onChange(newValue)
            this.resetText()
            this.getSuggestions('', newValue)
          }
        }
        break
      }

      // escape
      case 27: {
        event.preventDefault()
        this.resetText()
        break
      }

      // backspace
      case 8: {
        // if text is empty, then drop the last value from the list
        if (text.length === 0 && value.count() > 0) {
          const newValue = value.slice(0, value.count() - 1)
          onChange(newValue)
          this.resetText()
          this.getSuggestions('', newValue)
        }
        break
      }

      // up
      case 38: {
        if (suggestions) {
          event.preventDefault()
          this.selectPreviousSuggestion()
        }
        break
      }

      // down
      case 40: {
        if (suggestions) {
          event.preventDefault()
          this.selectNextSuggestion()
        }
        break
      }
    }
  }

  handleFocus = () => {
    const {value} = this.props
    const {text} = this.state

    this.setState({focused: true})
    this.getSuggestions(text, value)
  }

  handleBlur = () => {
    this.setState({focused: false})
    this.resetText()
  }

  handleMouseDownContainer = (event) => {
    event.preventDefault()

    // input is visually the whole container, even though the actual HTML input is not spanning the whole container,
    // so we trigger focusing the input here
    this.input && this.input.focus()
  }

  handleClickValueRemove = (index) => {
    const {value, onChange} = this.props

    return function (event) {
      event.preventDefault()
      const newValue = value.slice(0, index).concat(value.slice(index + 1))
      onChange(newValue)
    }
  }

  handleClickSuggestion = (suggestion, index) => {
    const self = this
    const {value, onChange, suggestionDisabled, convertSuggestionToValue} = this.props

    return function () {
      if (!suggestionDisabled(suggestion, index)) {
        const newValue = value.concat([convertSuggestionToValue(suggestion)])
        onChange(newValue)
        self.resetText()
        self.getSuggestions('', newValue)
      }
    }
  }

  resetText = () => {
    this.setState({
      text: '',
      suggestions: null,
      activeSuggestionIndex: null
    })
  }

  getSuggestions = (text, value) => {
    const {getSuggestions, suggestionDisabled, strict} = this.props

    if (getSuggestions) {
      this.setState({loading: true})
      getSuggestions(text, value).then((suggestions) => {
        this.setState({suggestions})

        // if non-strict, then of all non-disabled suggestions pick the first and select it
        const selection = strict && suggestions && suggestions.map((suggestion, index) => [suggestion, index]).filter(([s, i]) => !suggestionDisabled(s, i))[0]

        this.selectSuggestion(selection ? selection[1] : null)
      }).catch(() => {
        this.setState({loading: false})
      })
    }
  }

  selectPreviousSuggestion = () => {
    const {suggestionDisabled, strict} = this.props
    const {suggestions, activeSuggestionIndex} = this.state

    if (typeof activeSuggestionIndex === 'number') {
      // of all non-disabled suggestion pick the next after the current
      const selection = suggestions && suggestions.map((suggestion, index) => [suggestion, index]).filter(([s, i]) => i < activeSuggestionIndex && !suggestionDisabled(s, i)).reverse()[0]

      if (selection) {
        this.selectSuggestion(selection[1])
      } else {
        if (!strict) {
          this.selectSuggestion(null)
        }
      }
    }
  }

  selectNextSuggestion = () => {
    const {suggestionDisabled} = this.props
    const {suggestions, activeSuggestionIndex} = this.state

    if (typeof activeSuggestionIndex === 'number') {
      // of all non-disabled suggestion pick the next before the current
      const selection = suggestions && suggestions.map((suggestion, index) => [suggestion, index]).filter(([s, i]) => i > activeSuggestionIndex && !suggestionDisabled(s, i))[0]

      if (selection) {
        this.selectSuggestion(selection[1])
      }
    } else {
      const selection = suggestions && suggestions.map((suggestion, index) => [suggestion, index]).filter(([s, i]) => !suggestionDisabled(s, i))[0]

      if (selection) {
        this.selectSuggestion(selection[1])
      }
    }
  }

  selectSuggestion = (index) => {
    this.setState({activeSuggestionIndex: index})

    const suggestionsNode = this.refs.suggestions
    const suggestionNode = this.refs[`suggestion-${index}`]

    if (suggestionsNode && suggestionNode) {
      const r1 = suggestionsNode.getBoundingClientRect()
      const r2 = suggestionNode.getBoundingClientRect()

      // check if there is the need for scrolling down
      if (r1.bottom - 1 < r2.bottom) suggestionsNode.scrollTop += r2.bottom - r1.bottom + 1

      // check if there is the need for scrolling up
      if (r1.top + 1 > r2.top) suggestionsNode.scrollTop += r2.top - r1.top - 1
    }
  }
}

export default formField()(SmartInputFieldRaw)

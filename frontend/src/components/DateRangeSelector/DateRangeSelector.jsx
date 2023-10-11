import { useState } from 'react'
import './DateRangeSelector.css'

const DateRangeSelector = ({ options, value, onChange }) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false)

  const toggleOptionsVisibility = () => {
    setOptionsVisible(!isOptionsVisible)
  }

  return (
    <div className={`date-range-selector ${isOptionsVisible ? 'options-visible' : ''}`}>
      <button className='toggle-button' onClick={toggleOptionsVisibility}>
        Rango
      </button>
      <div className='options-container'>
        {options.map((opt) => (
          <div
            key={opt}
            className={`date-range-option ${value === opt ? 'selected' : ''}`}
            onClick={() => {
              onChange(opt)
              setOptionsVisible(false)
            }}>
            {opt}
          </div>
        ))}
      </div>
    </div>
  )
}

export default DateRangeSelector

import {useState} from 'react'

import './index.css'

const dateFieldsList = [
  {id: 'startDate', label: 'Start Date'},
  {id: 'endDate', label: 'End Date'},
]

const DateSelection = props => {
  const {dates, onChangeDates, onPrevious, onNext} = props
  const [errors, setErrors] = useState({})

  const onClickNext = () => {
    const {startDate, endDate} = dates
    const newErrors = {}

    if (startDate === '') {
      newErrors.startDate = 'Select start date'
    }
    if (endDate === '') {
      newErrors.endDate = 'Select end date'
    } else if (startDate !== '' && endDate < startDate) {
      newErrors.endDate = 'The end date cannot be less than the start date'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      onNext()
    }
  }

  return (
    <>
      <h1 className="step-heading">Date Selection</h1>
      <p className="step-description">Select your Start and End Date</p>
      <div className="step-card">
        {dateFieldsList.map(eachField => (
          <div className="input-container" key={eachField.id}>
            <label htmlFor={eachField.id} className="input-label">
              {eachField.label}
            </label>
            <input
              type="date"
              id={eachField.id}
              name={eachField.id}
              className="input-element"
              value={dates[eachField.id]}
              onChange={onChangeDates}
            />
            {errors[eachField.id] && (
              <p className="error-message">{errors[eachField.id]}</p>
            )}
          </div>
        ))}
        <div className="date-buttons-container">
          <button
            type="button"
            className="previous-button"
            onClick={onPrevious}
          >
            Previous
          </button>
          <button type="button" className="next-button" onClick={onClickNext}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default DateSelection

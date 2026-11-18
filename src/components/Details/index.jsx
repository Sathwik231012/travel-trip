import {useState} from 'react'

import './index.css'

const inputFieldsList = [
  {
    id: 'name',
    label: 'Name',
    placeholder: 'Enter Name',
    errorMessage: 'Enter your name',
  },
  {
    id: 'startLocation',
    label: 'Start Location',
    placeholder: 'Enter Start Location',
    errorMessage: 'Enter your start location',
  },
  {
    id: 'endLocation',
    label: 'End Location',
    placeholder: 'Enter End Location',
    errorMessage: 'Enter your end location',
  },
]

const Details = props => {
  const {yourDetails, onChangeYourDetails, onNext} = props
  const [errors, setErrors] = useState({})

  const onClickNext = () => {
    const newErrors = {}

    inputFieldsList.forEach(eachField => {
      if (yourDetails[eachField.id].trim() === '') {
        newErrors[eachField.id] = eachField.errorMessage
      }
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
    } else {
      onNext()
    }
  }

  return (
    <>
      <h1 className="step-heading">Your Details</h1>
      <p className="step-description">Enter your name and location details</p>
      <div className="step-card">
        {inputFieldsList.map(eachField => (
          <div className="input-container" key={eachField.id}>
            <label htmlFor={eachField.id} className="input-label">
              {eachField.label}
            </label>
            <input
              type="text"
              id={eachField.id}
              name={eachField.id}
              className="input-element"
              placeholder={eachField.placeholder}
              value={yourDetails[eachField.id]}
              onChange={onChangeYourDetails}
            />
            {errors[eachField.id] && (
              <p className="error-message">{errors[eachField.id]}</p>
            )}
          </div>
        ))}
        <div className="details-button-container">
          <button type="button" className="next-button" onClick={onClickNext}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default Details

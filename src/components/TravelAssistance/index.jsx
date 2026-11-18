import './index.css'

const TravelAssistance = props => {
  const {
    travelAssistanceList,
    isTravelAssistanceNeeded,
    travelAssistance,
    onChangeTravelAssistanceNeeded,
    onChangeTravelAssistance,
    onPrevious,
    onNext,
  } = props

  return (
    <>
      <h1 className="step-heading">Travel Assistance</h1>
      <p className="step-description">Select your travel assistance</p>
      <div className="step-card">
        <div className="checkbox-container">
          <input
            type="checkbox"
            id="travelAssistanceNeeded"
            checked={isTravelAssistanceNeeded}
            onChange={onChangeTravelAssistanceNeeded}
          />
          <label htmlFor="travelAssistanceNeeded" className="checkbox-label">
            Travel Assistance Needed
          </label>
        </div>
        {isTravelAssistanceNeeded && (
          <div className="input-container">
            <label htmlFor="travelAssistance" className="input-label">
              Travel Assistance
            </label>
            <select
              id="travelAssistance"
              className="input-element"
              value={travelAssistance}
              onChange={onChangeTravelAssistance}
            >
              {travelAssistanceList.map(eachOption => (
                <option key={eachOption.value} value={eachOption.value}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="travel-assistance-buttons-container">
          <button
            type="button"
            className="previous-button"
            onClick={onPrevious}
          >
            Previous
          </button>
          <button type="button" className="next-button" onClick={onNext}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default TravelAssistance

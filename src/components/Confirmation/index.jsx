import './index.css'

const successImageUrl =
  'https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png'

const Confirmation = props => {
  const {
    yourDetails,
    dates,
    guests,
    travelAssistanceText,
    isBookingConfirmed,
    onCancel,
    onConfirm,
    onBookNewTrip,
  } = props

  const renderConfirmedMessage = () => (
    <div className="confirmed-card">
      <img src={successImageUrl} alt="success" className="success-image" />
      <h1 className="confirmed-heading">Awesome!</h1>
      <p className="confirmed-description">Your booking has been confirmed</p>
      <button type="button" className="next-button" onClick={onBookNewTrip}>
        Book New Trip
      </button>
    </div>
  )

  const renderConfirmationDetails = () => {
    const {name, startLocation, endLocation} = yourDetails
    const {startDate, endDate} = dates
    const {adults, children, infants} = guests

    const confirmationDetailsList = [
      {label: 'Name:', value: name},
      {label: 'Start Location:', value: startLocation},
      {label: 'End Location:', value: endLocation},
      {label: 'Start Date:', value: startDate},
      {label: 'End Date:', value: endDate},
      {label: 'Guests:', value: adults + children + infants},
      {label: 'Travel Assistance:', value: travelAssistanceText},
    ]

    return (
      <>
        <h1 className="step-heading">Confirmation</h1>
        <p className="step-description">Confirm your details</p>
        <div className="confirmation-card">
          {confirmationDetailsList.map(eachDetail => (
            <div className="confirmation-detail" key={eachDetail.label}>
              <p className="confirmation-label">{eachDetail.label}</p>
              <p className="confirmation-value">{eachDetail.value}</p>
            </div>
          ))}
          <div className="confirmation-buttons-container">
            <button
              type="button"
              className="previous-button"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button type="button" className="next-button" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </>
    )
  }

  return isBookingConfirmed
    ? renderConfirmedMessage()
    : renderConfirmationDetails()
}

export default Confirmation

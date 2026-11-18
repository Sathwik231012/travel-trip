import {useState} from 'react'

import Details from '../Details'
import DateSelection from '../Date'
import Guests from '../Guests'
import TravelAssistance from '../TravelAssistance'
import Confirmation from '../Confirmation'

import './index.css'

const stepsList = [
  {stepId: 'YOUR_DETAILS', displayText: 'Your Details'},
  {stepId: 'DATE_SELECTION', displayText: 'Date Selection'},
  {stepId: 'GUESTS', displayText: 'Guests'},
  {stepId: 'TRAVEL_ASSISTANCE', displayText: 'Travel Assistance'},
  {stepId: 'CONFIRMATION', displayText: 'Confirmation'},
]

const travelAssistanceList = [
  {value: 'car', displayText: 'Car'},
  {value: 'flight', displayText: 'Flight'},
  {value: 'bus', displayText: 'Bus'},
  {value: 'train', displayText: 'Train'},
]

const successImageUrl =
  'https://assets.ccbp.in/frontend/react-js/travel-trip-steps-successfully-completed-img.png'

const initialYourDetails = {name: '', startLocation: '', endLocation: ''}

const initialDates = {startDate: '', endDate: ''}

const initialGuests = {adults: 1, children: 0, infants: 0}

const TravelTrip = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0)
  const [yourDetails, setYourDetails] = useState(initialYourDetails)
  const [dates, setDates] = useState(initialDates)
  const [guests, setGuests] = useState(initialGuests)
  const [isTravelAssistanceNeeded, setIsTravelAssistanceNeeded] =
    useState(false)
  const [travelAssistance, setTravelAssistance] = useState(
    travelAssistanceList[0].value,
  )
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)

  const goToNextStep = () => {
    setActiveStepIndex(prevStepIndex => prevStepIndex + 1)
  }

  const goToPreviousStep = () => {
    setActiveStepIndex(prevStepIndex => prevStepIndex - 1)
  }

  const resetTrip = () => {
    setActiveStepIndex(0)
    setYourDetails(initialYourDetails)
    setDates(initialDates)
    setGuests(initialGuests)
    setIsTravelAssistanceNeeded(false)
    setTravelAssistance(travelAssistanceList[0].value)
    setIsBookingConfirmed(false)
  }

  const onChangeYourDetails = event => {
    const {name, value} = event.target
    setYourDetails(prevDetails => ({...prevDetails, [name]: value}))
  }

  const onChangeDates = event => {
    const {name, value} = event.target
    setDates(prevDates => ({...prevDates, [name]: value}))
  }

  const onChangeGuestCount = (guestType, count) => {
    setGuests(prevGuests => ({...prevGuests, [guestType]: count}))
  }

  const onChangeTravelAssistanceNeeded = event => {
    setIsTravelAssistanceNeeded(event.target.checked)
  }

  const onChangeTravelAssistance = event => {
    setTravelAssistance(event.target.value)
  }

  const onConfirmBooking = () => {
    setIsBookingConfirmed(true)
  }

  const onSubmitTravelTripForm = event => {
    event.preventDefault()
  }

  const getTravelAssistanceText = () => {
    if (!isTravelAssistanceNeeded) {
      return ''
    }
    const selectedOption = travelAssistanceList.find(
      eachOption => eachOption.value === travelAssistance,
    )
    return selectedOption.displayText
  }

  const renderStepsList = () => (
    <ul className="steps-list">
      {stepsList.map((eachStep, index) => {
        const isStepCompleted = isBookingConfirmed || index < activeStepIndex
        const isStepActive = !isBookingConfirmed && index === activeStepIndex

        return (
          <li className="step-item" key={eachStep.stepId}>
            {isStepCompleted ? (
              <img
                src={successImageUrl}
                alt={eachStep.displayText}
                className="completed-step-image"
              />
            ) : (
              <p
                className={
                  isStepActive
                    ? 'step-number active-step-number'
                    : 'step-number'
                }
              >
                {index + 1}
              </p>
            )}
            <p
              className={
                isStepActive ? 'step-name active-step-name' : 'step-name'
              }
            >
              {eachStep.displayText}
            </p>
          </li>
        )
      })}
    </ul>
  )

  const renderActiveSection = () => {
    switch (stepsList[activeStepIndex].stepId) {
      case 'YOUR_DETAILS':
        return (
          <Details
            yourDetails={yourDetails}
            onChangeYourDetails={onChangeYourDetails}
            onNext={goToNextStep}
          />
        )
      case 'DATE_SELECTION':
        return (
          <DateSelection
            dates={dates}
            onChangeDates={onChangeDates}
            onPrevious={goToPreviousStep}
            onNext={goToNextStep}
          />
        )
      case 'GUESTS':
        return (
          <Guests
            guests={guests}
            onChangeGuestCount={onChangeGuestCount}
            onPrevious={goToPreviousStep}
            onNext={goToNextStep}
          />
        )
      case 'TRAVEL_ASSISTANCE':
        return (
          <TravelAssistance
            travelAssistanceList={travelAssistanceList}
            isTravelAssistanceNeeded={isTravelAssistanceNeeded}
            travelAssistance={travelAssistance}
            onChangeTravelAssistanceNeeded={onChangeTravelAssistanceNeeded}
            onChangeTravelAssistance={onChangeTravelAssistance}
            onPrevious={goToPreviousStep}
            onNext={goToNextStep}
          />
        )
      case 'CONFIRMATION':
        return (
          <Confirmation
            yourDetails={yourDetails}
            dates={dates}
            guests={guests}
            travelAssistanceText={getTravelAssistanceText()}
            isBookingConfirmed={isBookingConfirmed}
            onCancel={resetTrip}
            onConfirm={onConfirmBooking}
            onBookNewTrip={resetTrip}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="travel-trip-app-container">
      <div className="travel-trip-container">
        <div className="steps-container">
          <h1 className="app-heading">Travel Trip</h1>
          {renderStepsList()}
        </div>
        <form
          className={
            isBookingConfirmed
              ? 'step-details-container confirmed-container'
              : 'step-details-container'
          }
          onSubmit={onSubmitTravelTripForm}
        >
          {renderActiveSection()}
        </form>
      </div>
    </div>
  )
}

export default TravelTrip

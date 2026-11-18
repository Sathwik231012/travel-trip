import './index.css'

const guestTypesList = [
  {
    guestType: 'adults',
    title: 'Adults',
    description: 'Age 13 or above',
    minimumCount: 1,
  },
  {
    guestType: 'children',
    title: 'Children',
    description: 'Age 2-12',
    minimumCount: 0,
  },
  {
    guestType: 'infants',
    title: 'Infants',
    description: 'under 2',
    minimumCount: 0,
  },
]

const Guests = props => {
  const {guests, onChangeGuestCount, onPrevious, onNext} = props

  const onDecreaseCount = (guestType, minimumCount) => {
    if (guests[guestType] > minimumCount) {
      onChangeGuestCount(guestType, guests[guestType] - 1)
    }
  }

  const onIncreaseCount = guestType => {
    onChangeGuestCount(guestType, guests[guestType] + 1)
  }

  return (
    <>
      <h1 className="step-heading">Guests</h1>
      <p className="step-description">Select your guests</p>
      <div className="step-card">
        <ul className="guests-list">
          {guestTypesList.map(eachGuestType => {
            const {guestType, title, description, minimumCount} = eachGuestType

            return (
              <li className="guest-item" key={guestType}>
                <div>
                  <p className="guest-title">{title}</p>
                  <p className="guest-description">{description}</p>
                </div>
                <div className="guest-count-container">
                  <button
                    type="button"
                    className="count-button"
                    onClick={() => onDecreaseCount(guestType, minimumCount)}
                  >
                    -
                  </button>
                  <p className="guest-count">{guests[guestType]}</p>
                  <button
                    type="button"
                    className="count-button"
                    onClick={() => onIncreaseCount(guestType)}
                  >
                    +
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="guests-buttons-container">
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

export default Guests

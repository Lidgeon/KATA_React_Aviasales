const initialState = {
  ticketsList: [],
  showingTickets: 5,
}

export const ticketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'addTickets': {
      const tickets = action.tickets.map((res) => {
        return {
          price: res.price,
          carrier: res.carrier,
          thereOrigin: res.segments[0]?.origin,
          thereDestination: res.segments[0]?.destination,
          thereDate: res.segments[0]?.date,
          thereStops: res.segments[0]?.stops,
          thereDuration: res.segments[0]?.duration,
          backDate: res.segments[1]?.date,
          backStops: res.segments[1]?.stops,
          backDuration: res.segments[1]?.duration,
        }
      })
      return {
        ...state,
        ticketsList: tickets,
      }
    }
    case 'showMoreTickets':
      return {
        ...state,
        showingTickets: state.showingTickets + 5,
      }
    case 'Самый дешевый': {
      const sortLowPrice = (arr) => {
        return arr.sort((a, b) => a.price - b.price)
      }
      const result = sortLowPrice(state.ticketsList)
      return {
        ...state,
        ticketsList: result,
      }
    }
    case 'Самый быстрый': {
      const sortMostFast = (arr) => {
        return arr.sort((a, b) => (a.thereDuration + a.backDuration) / 2 - (b.thereDuration + b.backDuration) / 2)
      }
      const result = sortMostFast(state.ticketsList)
      return {
        ...state,
        ticketsList: result,
      }
    }
    case 'Оптимальный': {
      const sortOptimal = (arr) => {
        return arr.sort((a, b) => {
          const totalDurationA = a.thereDuration + a.backDuration
          const totalDurationB = b.thereDuration + b.backDuration

          const costPerUnitTimeA = a.price / totalDurationA
          const costPerUnitTimeB = b.price / totalDurationB

          return costPerUnitTimeA - costPerUnitTimeB
        })
      }
      const result = sortOptimal(state.ticketsList)
      return {
        ...state,
        ticketsList: result,
      }
    }
    default:
      return state
  }
}

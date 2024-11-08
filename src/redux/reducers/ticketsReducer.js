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
      const result = []
      result.push(...tickets)
      return {
        ...state,
        ticketsList: [...state.ticketsList, ...result],
      }
    }
    case 'showMoreTickets':
      return {
        ...state,
        showingTickets: state.showingTickets + 5,
      }

    default:
      return state
  }
}

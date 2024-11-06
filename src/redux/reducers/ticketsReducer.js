const initialState = {
  ticketsList: [],
  filterTicketsList: [],
  sortTicketList: [],
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
    case 'filteredTickets': {
      const filteredTickets = (arr) => {
        return [...arr].filter((res) => {
          if (
            action.payload.includes('Без пересадок') &&
            !action.payload.includes('1 пересадка') &&
            !action.payload.includes('2 пересадки') &&
            !action.payload.includes('3 пересадки')
          ) {
            return res.thereStops.length === 0 && res.backStops.length === 0
          } else if (
            action.payload.includes('1 пересадка') &&
            !action.payload.includes('2 пересадки') &&
            !action.payload.includes('3 пересадки')
          ) {
            return res.thereStops.length <= 1 && res.backStops.length <= 1
          } else if (action.payload.includes('2 пересадки') && !action.payload.includes('3 пересадки')) {
            return res.thereStops.length <= 2 && res.backStops.length <= 2
          } else if (action.payload.includes('3 пересадки')) {
            return res.thereStops.length <= 3 && res.backStops.length <= 3
          } else {
            return res
          }
        })
      }
      const result = filteredTickets(state.ticketsList)
      return {
        ...state,
        filterTicketsList: result,
      }
    }
    case 'sortedTickets': {
      const sortedTickets = (arr) => {
        switch (action.payload) {
          case 'Самый дешевый': {
            const sortLowPrice = (arr) => {
              return [...arr].sort((a, b) => a.price - b.price)
            }
            const result = sortLowPrice(state.filterTicketsList)
            return result
          }
          case 'Самый быстрый': {
            const sortMostFast = (arr) => {
              return [...arr].sort(
                (a, b) => (a.thereDuration + a.backDuration) / 2 - (b.thereDuration + b.backDuration) / 2
              )
            }
            const result = sortMostFast(state.filterTicketsList)
            return result
          }
          case 'Оптимальный': {
            const sortOptimal = (arr) => {
              return [...arr].sort((a, b) => {
                const totalDurationA = a.thereDuration + a.backDuration
                const totalDurationB = b.thereDuration + b.backDuration

                const costPerUnitTimeA = a.price / totalDurationA
                const costPerUnitTimeB = b.price / totalDurationB

                return costPerUnitTimeA - costPerUnitTimeB
              })
            }
            const result = sortOptimal(state.filterTicketsList)
            return result
          }
          default:
            return arr
        }
      }
      const result = sortedTickets(state.filterTicketsList)
      return {
        ...state,
        filterTicketsList: result,
      }
    }

    default:
      return state
  }
}

import TicketapiService from './services/ticketsapi-services'

export const lowPrice = () => ({ type: 'Самый дешевый' })
export const mostFast = () => ({ type: 'Самый быстрый' })
export const optimal = () => ({ type: 'Оптимальный' })

export const inputCheckbox = (lists) => ({ type: 'check', payload: lists })

export const addTickets = (filter) => {
  const ticketapi = new TicketapiService()
  return async (dispatch) => {
    ticketapi.getTickets(filter).then((res) => {
      dispatch({ type: 'addTickets', tickets: res })
      if (res.length === 0) {
        dispatch(ticketsNotSearch())
      }
      dispatch(findStatusOff())
    })
  }
}
export const addTicketsStatus = (filter) => (dispatch) => {
  return Promise.all([dispatch(ticketsSearch()), dispatch(findStatusOn()), dispatch(addTickets(filter))])
}

export const showMoreTickets = () => ({ type: 'showMoreTickets' })

export const isLoadingStatusOn = () => ({ type: 'isLoadingStatusOn' })
export const isLoadingStatusOff = () => ({ type: 'isLoadingStatusOff' })

export const findStatusOn = () => ({ type: 'findStatusOn' })
export const findStatusOff = () => ({ type: 'findStatusOff' })
export const ticketsNotSearch = () => ({ type: 'ticketsNotSearch' })
export const ticketsSearch = () => ({ type: 'ticketsSearch' })

import TicketapiService from './services/ticketsapi-services'

export const lowPrice = () => ({ type: 'Самый дешевый' })
export const mostFast = () => ({ type: 'Самый быстрый' })
export const optimal = () => ({ type: 'Оптимальный' })

export const inputCheckbox = (lists) => ({ type: 'check', payload: lists })

export const addTickets = () => {
  const ticketapi = new TicketapiService()

  let searchStatus = true
  return async (dispatch) => {
    let searchId
    await ticketapi.getSearchId().then((res) => {
      searchId = res
    })
    //console.log(searchId)
    if (searchId) {
      do {
        await ticketapi.getTicketsPack(searchId).then((res) => {
          //console.log(res)
          if (res.stop === false) {
            dispatch({ type: 'addTickets', tickets: res.tickets })
            if (res.length === 0) {
              dispatch(ticketsNotSearch())
              dispatch(findStatusOff())
            }
          } else {
            searchStatus = false
            dispatch(findStatusOff())
          }
        })
      } while (searchStatus)
    }
  }
}

export const filteredTickets = (filters) => ({ type: 'filteredTickets', payload: filters })

export const showMoreTickets = () => ({ type: 'showMoreTickets' })

export const isLoadingStatusOn = () => ({ type: 'isLoadingStatusOn' })
export const isLoadingStatusOff = () => ({ type: 'isLoadingStatusOff' })

export const findStatusOn = () => ({ type: 'findStatusOn' })
export const findStatusOff = () => ({ type: 'findStatusOff' })
export const ticketsNotSearch = () => ({ type: 'ticketsNotSearch' })
export const ticketsSearch = () => ({ type: 'ticketsSearch' })

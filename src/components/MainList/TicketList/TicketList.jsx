import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import Ticket from './Ticket/Ticket'
import classes from './TicketList.module.scss'

const TicketList = () => {
  const showingTickets = useSelector((state) => state.ticketsReducer.showingTickets)
  const ticketsList = useSelector((state) => state.ticketsReducer.ticketsList)
  //const filterTicketsList = useSelector((state) => state.ticketsReducer.filterTicketsList)
  const selectedFilters = useSelector((state) => state.transferFilterReducer.checkedList)
  const sortedFilters = useSelector((state) => state.priceFilterReducer.value)
  const key = () => Date.now() + Math.random() * 10

  const filterTickets = (arr, selectedFilters) => {
    return [...arr].filter((res) => {
      if (
        selectedFilters.includes('Без пересадок') &&
        !selectedFilters.includes('1 пересадка') &&
        !selectedFilters.includes('2 пересадки') &&
        !selectedFilters.includes('3 пересадки')
      ) {
        return res.thereStops.length === 0 && res.backStops.length === 0
      } else if (
        selectedFilters.includes('1 пересадка') &&
        !selectedFilters.includes('2 пересадки') &&
        !selectedFilters.includes('3 пересадки')
      ) {
        return res.thereStops.length <= 1 && res.backStops.length <= 1
      } else if (selectedFilters.includes('2 пересадки') && !selectedFilters.includes('3 пересадки')) {
        return res.thereStops.length <= 2 && res.backStops.length <= 2
      } else if (selectedFilters.includes('3 пересадки')) {
        return res.thereStops.length <= 3 && res.backStops.length <= 3
      } else {
        return res
      }
    })
  }

  const sortTickets = (arr) => {
    switch (sortedFilters) {
      case 'Самый дешевый': {
        return [...arr].sort((a, b) => a.price - b.price)
      }
      case 'Самый быстрый': {
        return [...arr].sort((a, b) => (a.thereDuration + a.backDuration) / 2 - (b.thereDuration + b.backDuration) / 2)
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
        return sortOptimal(arr)
      }
      default:
        return arr
    }
  }

  const ticketsWithFilter = useMemo(() => filterTickets(ticketsList, selectedFilters), [ticketsList, selectedFilters])

  const showContent = selectedFilters.length ? sortTickets(ticketsWithFilter) : sortTickets(ticketsWithFilter)

  return (
    <div className={classes.tickets}>
      {showContent.slice(0, showingTickets).map((ticket) => (
        <Ticket key={key()} ticket={ticket} />
      ))}
    </div>
  )
}

export default TicketList

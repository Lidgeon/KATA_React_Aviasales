import { useSelector } from 'react-redux'
import { useEffect } from 'react'

import Ticket from './Ticket/Ticket'
import classes from './TicketList.module.scss'

const TicketList = () => {
  const ticketslist = useSelector((state) => state.ticketsReducer.ticketsList)
  const showingTickets = useSelector((state) => state.ticketsReducer.showingTickets)
  const priceFilter = useSelector((state) => state.priceFilterReducer.value)
  let key = 0

  useEffect(() => {
    key++
  }, [priceFilter])

  return (
    <div className={classes.tickets}>
      {ticketslist.slice(0, showingTickets).map((ticket) => (
        <Ticket key={key++} ticket={ticket} />
      ))}
    </div>
  )
}

export default TicketList

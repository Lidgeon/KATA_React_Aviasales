import { useSelector } from 'react-redux'

import Ticket from './Ticket/Ticket'
import classes from './TicketList.module.scss'

const TicketList = () => {
  const showingTickets = useSelector((state) => state.ticketsReducer.showingTickets)
  const ticketsList = useSelector((state) => state.ticketsReducer.ticketsList)
  const filterTicketsList = useSelector((state) => state.ticketsReducer.filterTicketsList)
  let key = 0
  const showContent = filterTicketsList.length ? filterTicketsList : ticketsList
  return (
    <div className={classes.tickets}>
      {showContent.slice(0, showingTickets).map((ticket) => (
        <Ticket key={key++} ticket={ticket} />
      ))}
    </div>
  )
}

export default TicketList

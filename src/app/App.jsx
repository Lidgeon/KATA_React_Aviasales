import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from '../components/Header/Header'
import MainList from '../components/MainList/MainList'
import TransferFilter from '../components/TransferFilter/TransferFilter'

import classes from './App.module.scss'
import { addTickets, findStatusOff } from './../actions'

const App = () => {
  const dispatch = useDispatch()
  const ticketsList = useSelector((state) => state.ticketsReducer.ticketsList)
  const ticketsNotSearch = useSelector((state) => state.statusReducer.notSearch)
  const findStatus = useSelector((state) => state.statusReducer.findStatus)

  useEffect(() => {
    if (ticketsList.length < 10000 && findStatus) {
      dispatch(addTickets())
    }
  }, [ticketsList, findStatus])

  useEffect(() => {
    if (ticketsList.length >= 10000 || ticketsNotSearch === true) {
      dispatch(findStatusOff())
    }
  }, [ticketsList, ticketsNotSearch])

  return (
    <section className={classes.app}>
      <Header />
      <main className={classes['ticket-app']}>
        <TransferFilter />
        <MainList />
      </main>
    </section>
  )
}

export default App

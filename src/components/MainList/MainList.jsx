import { Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Spin, Alert } from 'antd'

import { isLoadingStatusOn, isLoadingStatusOff } from './../../actions'
import PriceFilter from './PriceFilter/PriceFilter'
import TicketList from './TicketList/TicketList'
import MoreTicketButton from './MoreTicketButton/MoreTicketButton'
import classes from './MainList.module.scss'

const MainList = () => {
  const dispatch = useDispatch()
  //const findStatus = useSelector((state) => state.statusReducer.notFindStatus)
  const isLoadingStatus = useSelector((state) => state.statusReducer.isLoadingStatus)
  //const selectedFilters = useSelector((state) => state.transferFilterReducer.checkedList)
  const ticketsList = useSelector((state) => state.ticketsReducer.ticketsList)
  const findStatus = useSelector((state) => state.statusReducer.findStatus)
  const notSearchStatus = useSelector((state) => state.statusReducer.notSearch)

  useEffect(() => {
    if (findStatus) {
      dispatch(isLoadingStatusOn())
    } else {
      dispatch(isLoadingStatusOff())
    }
  }, [findStatus])

  const loading = isLoadingStatus && !notSearchStatus && ticketsList.length === 0 ? <Spin size="large" /> : null
  const loadingSpin = isLoadingStatus ? <Spin size="large" /> : null

  const notfound = notSearchStatus ? <Alert message="По вашему запросу ничего не найдено" type="warning" /> : null

  const startScreen =
    !notSearchStatus && !isLoadingStatus && ticketsList.length === 0 ? (
      <Alert message="Выберите количество пересадок" type="info" />
    ) : null

  const contentBlock =
    !startScreen && !notfound && !loading ? (
      <Fragment>
        <PriceFilter />
        {loadingSpin}
        <TicketList />
        <MoreTicketButton />
      </Fragment>
    ) : null

  return (
    <div className={classes['main-list']}>
      {loading}
      {startScreen}
      {contentBlock}
      {notfound}
    </div>
  )
}

export default MainList

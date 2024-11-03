import { Checkbox } from 'antd'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { inputCheckbox, addTicketsStatus } from './../../actions'
import classes from './TransferFilter.module.scss'

const TransferFilter = () => {
  const selectedFilters = useSelector((state) => {
    const { transferFilterReducer } = state
    return transferFilterReducer.checkedList
  })
  const dispatch = useDispatch()
  //console.log('Сейчас в хранилище фильтров следующие фильтры:', selectedFilters)

  useEffect(() => {
    if (selectedFilters.length != 0) {
      dispatch(addTicketsStatus(selectedFilters))
    }
  }, [selectedFilters])

  const CheckboxGroup = Checkbox.Group
  const plainOptions = ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки']

  const [checkedList, setCheckedList] = useState(selectedFilters)

  const checkAll = plainOptions.length === checkedList.length
  const indeterminate = checkedList.length > 0 && checkedList.length < plainOptions.length
  const onChangeTransferFilter = (list) => {
    dispatch(inputCheckbox(list))
    setCheckedList(list)
  }

  const onAllChangeTransferFilter = (e) => {
    dispatch(inputCheckbox(e.target.checked ? plainOptions : []))
    setCheckedList(e.target.checked ? plainOptions : [])
  }

  return (
    <div className={classes['transfer-filter']}>
      <span className={classes['transfer-filter__title']}>Количество пересадок</span>
      <Checkbox indeterminate={indeterminate} onChange={onAllChangeTransferFilter} checked={checkAll}>
        Все
      </Checkbox>
      <CheckboxGroup
        className={classes['transfer-filter__checkbox']}
        options={plainOptions}
        value={checkedList}
        onChange={onChangeTransferFilter}
      />
    </div>
  )
}

export default TransferFilter

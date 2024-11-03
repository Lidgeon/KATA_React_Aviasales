const initialState = {
  value: '',
}

export const priceFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'Самый дешевый':
      return {
        ...state,
        value: 'Самый дешевый',
      }
    case 'Самый быстрый':
      return {
        ...state,
        value: 'Самый быстрый',
      }
    case 'Оптимальный':
      return {
        ...state,
        value: 'Оптимальный',
      }
    default:
      return state
  }
}

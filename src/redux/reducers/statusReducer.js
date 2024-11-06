const initialState = {
  findStatus: true,
  isLoadingStatus: false,
  notSearch: false,
}

export const statusReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'findStatusOn':
      return {
        ...state,
        findStatus: true,
      }
    case 'findStatusOff':
      return {
        ...state,
        findStatus: false,
      }
    case 'isLoadingStatusOn':
      return {
        ...state,
        isLoadingStatus: true,
      }
    case 'isLoadingStatusOff':
      return {
        ...state,
        isLoadingStatus: false,
      }
    case 'ticketsNotSearch':
      return {
        ...state,
        notSearch: true,
      }
    case 'ticketsSearch':
      return {
        ...state,
        notSearch: false,
      }
    default:
      return state
  }
}

const initialState = {
  checkedList: [],
}

export const transferFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'check':
      return {
        ...state,
        checkedList: action.payload,
      }
    default:
      return state
  }
}

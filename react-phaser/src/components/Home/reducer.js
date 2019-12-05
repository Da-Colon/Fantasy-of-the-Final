const initialState = {
  user: 'none'
}

const userReducer = (state=initialState, action) => {
  switch(action.type) {
    case 'user logged in':
      return {
        ...action.payload
      }
    default:
      return state
  }
}

export default userReducer
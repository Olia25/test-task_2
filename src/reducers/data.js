export const SET_DATA = 'SET_DATA'

export default (state = [], action) => {
    if(action.type === SET_DATA){
       return [...action.payload]
    }
    return state
}
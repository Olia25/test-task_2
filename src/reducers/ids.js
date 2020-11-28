export const SELECTED_ID = 'SELECTED_ID'

export default (state = [], action) => {
    if(action.type === SELECTED_ID){
        const {checked, id} = action.payload;
        return  checked ? [...state, id] : state.filter((elem) => elem !== id)
    }
    return state
}
const initialState = {
    loggedIn: false,
    fresh: true,
    wallet: null
}
const userReducer = (state = initialState, action) => {
    switch(action.type){
        case "CONNECT_WALLET":
            return {
                ...state,
                wallet:action.payload,
                loggedIn: true,
            }
        case "DISCONNECT_WALLET":
            localStorage.clear()
            return {
                ...state,
                wallet:null,
                loggedIn: false,
            }
        default: return state
    }
}

export default userReducer
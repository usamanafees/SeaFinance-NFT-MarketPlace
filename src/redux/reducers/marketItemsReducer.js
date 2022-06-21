const initialState = {
    allMarketItems: [],
    myMarketItems:[]
}
const marketItems = (state = initialState, action) => {
    switch(action.type){
        case "FETCHALL_MARKET_ITEMS":
            return {
                ...state,
                allMarketItems:action.payload,
            }
        case "FETCHMY_MARKET_ITEMS":
            return {
                ...state,
                myMarketItems:action.payload,
            }
            
        default: return state
    }
}

export default marketItems
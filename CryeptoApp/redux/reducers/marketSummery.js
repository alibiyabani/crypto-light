export const markerSummeryReducer = (state={} , action) => {
    switch (action.type)    
    {
        case "SUMMERY":
            return [...action.payload];
        default :
            return state;
    }
};
const Reducer = (state, action) => {
    switch (action.type) {
        case 'SelectBig': return {...state, SelectedData: state.BigData}
        case 'SelectSmall': return {...state, SelectedData: state.SmallData}
        case 'Loading': return {...state, Loader: true}
        case 'LoadData':
            if (state.AddedArray.length === 0)
            return {
                ...state, MainArray: state.SortBy(state.Order.order, action.payload, state.Order.direction)
            }
            else return {
                ...state, MainArray: state.SortBy(state.Order.order, [...state.AddedArray, ...action.payload], state.Order.direction)
            }
        case 'SetPages': return {...state, Pages: action.payload}
        case 'Loaded': return {...state, Loader: false}
        case 'SelectPage': return {...state, Page: action.payload}
        case 'SelectRow': return {...state, Selected: action.payload}
        case 'UnselectRow': return {...state, Selected: action.payload}
        case 'SetOrder': return {...state, Order: action.payload}
        case 'Sort': return {...state, MainArray: action.payload}
        case 'Search': return {...state, Search: action.payload.Search, Pages: action.payload.Pages}
        case 'AddPerson': {
            return {
                ...state,
                MainArray: state.SortBy(state.Order.order, [action.payload.person, ...state.MainArray], state.Order.direction),
                AddedArray: [action.payload.person, ...state.AddedArray],
                Pages: action.payload.pages
            }
        }
        case 'SetAlert': {return {...state, Alert: action.payload}}
        default: return state
    }
}
export default Reducer
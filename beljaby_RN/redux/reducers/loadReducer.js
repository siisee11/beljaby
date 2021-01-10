const initialState = {
    loading: false,
}

const loadReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            let newLoading = !state.loading
            return {
                ...state, 
                loading: newLoading
            }

        case 'SETFALSE':
            return {
                ...state,
                loading: false,
            }

        case 'SETTRUE':
            return {
                ...state,
                loading: true,
            }

        default:
            return state
    }
}
export default loadReducer
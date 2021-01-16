const SET_DARK= 'dark/SET_DARK' as const;

export const setDark= (dark : boolean)=> ({ type: SET_DARK, payload: dark });

type DarkAction =
  | ReturnType<typeof setDark>

type DarkState = {
    dark: boolean
}

const initialState = {
    dark: true,
};


export default function dark(state :DarkState = initialState, action: DarkAction) {
    switch (action.type) {
        case SET_DARK:
            return {
                ...state,
                dark: action.payload
            };
        default:
            return state;
    }
}
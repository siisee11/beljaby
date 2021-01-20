/* 액션 타입 만들기 */
// Ducks 패턴을 따를땐 액션의 이름에 접두사를 넣어주세요.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있습니다.
const SET_USER = 'user/SET_USER' as const;
const SET_TOKEN = 'user/SET_TOKEN' as const;

/* 액션 생성함수 만들기 */
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내주세요.
export const setUser = (user : Object | null) => ({ type: SET_USER, payload: user });
export const setAccessToken = (token : String | null) => ({ type: SET_TOKEN, payload: token });

type UserAction = 
  | ReturnType<typeof setUser>
  | ReturnType<typeof setAccessToken>;

type UserState = {
  user: Object | null;
  token: String | null;
}

/* 초기 상태 선언 */
const initialState = {
    user: null,
    token: null,
};

/* 리듀서 선언 */
// 리듀서는 export default 로 내보내주세요.
export default function user(state : UserState = initialState, action : UserAction) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}
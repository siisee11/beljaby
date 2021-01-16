// Initial State
const initialState = {
  fittable: {
    accessToken: undefined,
    refreshToken: undefined,
    accessTokenExpiresAt: undefined,
    refreshTokenExpiresAt: undefined,
  },
  kakao: {
    accessToken: undefined,
    refreshToken: undefined
  },
  naver: {
    accessToken: undefined,
    refreshToken: undefined
  },
  apple: {
    accessToken: undefined,
    refreshToken: undefined
  },
  loginType: undefined,
  error: null,
  loading: false,
  deviceToken: undefined,
  value: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FITTABLE_TOKEN': {
      return {
        ...state,
        fittable: action.fittable,
        loginType: action.loginType,
        error: action.error,
        loading: action.loading,
      }
    }

    case 'SET_KAKAO_TOKEN': {
      return {
        ...state,
        kakao: action.kakao,
        loginType: action.loginType,
        error: action.error,
        loading: action.loading,
      }
    }

    case 'SET_NAVER_TOKEN': {
      return {
        ...state,
        naver: action.naver,
        loginType: action.loginType,
        error: action.error,
        loading: action.loading,
      }
    }

    case 'SET_APPLE_TOKEN': {
      return {
        ...state,
        apple: action.apple,
        loginType: action.loginType,
        error: action.error,
        loading: action.loading,
      }
    }

    case 'LOGOUT': {
      switch (state.loginType) {
        case 'fittable': {
          return {
            ...state,
            fittable: action.fittableEmpty,
            loginType: action.loginType,
            loading: action.loading,
          }
        }
        case 'kakao': {
          return {
            ...state,
            kakao: action.empty,
            loginType: action.loginType,
            loading: action.loading,
          }
        }
        case 'naver': {
          return {
            ...state,
            naver: action.empty,
            loginType: action.loginType,
            loading: action.loading,
          }
        }
        case 'apple': {
          return {
            ...state,
            apple: action.empty,
            loginType: action.loginType,
            loading: action.loading,
          }
        }
      }
    }

    case 'SET_DEVICE_TOKEN': {
      return {
        ...state,
        deviceToken: action.deviceToken,
      }
    }

    case 'OAUTH_START': {
      return {
        ...state,
        error: action.error,
        loading: action.loading,
      }
    }

    case 'OAUTH_ERROR': {
      return {
        ...state,
        error: action.error,
        loading: action.loading,
      }
    }

    default: {
      return state
    }
  }
}

export default authReducer